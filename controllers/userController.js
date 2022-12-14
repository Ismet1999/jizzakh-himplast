const user = require("../models/user");
const bcrypt = require("bcryptjs");

class UserController {
  async getAll(req, res) {
    try {
      const data = await user.find(req.query);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async create(req, res) {
    try {
      const item = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        admin: req.body.admin,
      };
      const data = new user(item);
      const result = await data.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async getOne(req, res) {
    try {
      const data = await user.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async edit(req, res) {
    try {
      const data = await user.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async delete(req, res) {
    try {
      const data = await user.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new UserController();
