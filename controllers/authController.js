const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function generateAccessToken(username) {
  let accessToken = jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
  let refreshToken = jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: "3600s",
  });
  return {
    accessToken,
    refreshToken,
  };
}

class AuthController {
  async login(req, res, next) {
    try {
      let data = await user.findOne({ username: req.body.username });
      if (!data) return res.status(401).send({ message: "User not found" });
      let result = await bcrypt.compare(req.body.password, data.password);
      if (!result) return res.status(401).send({ message: "Wrong password" });

      let tokens = generateAccessToken({
        username: data.username,
        admin: data.admin,
      });
      let response = {
        ...tokens,
        user: {
          username: data.username,
          admin: data.admin,
        },
      };
      res.json(response);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async refresh(req, res, next) {
    try {
      if (req.user.exp - req.user.iat < 3600) return res.sendStatus(401);
      let tokens = generateAccessToken({
        username: req.user.username,
        role: req.user.role,
      });
      res.json(tokens);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
