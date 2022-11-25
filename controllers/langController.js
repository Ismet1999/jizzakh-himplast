const lang = require("../models/lang");

class LangController {
  async getAll(req, res) {
    try {
      const data = await lang.find(req.query);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async create(req, res) {
    try {
      const data = new lang(req.body);
      let result = await data.save();
      res.status(201).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  async getOne(req, res) {
    try {
      const data = await lang.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async edit(req, res) {
    try {
      const data = await lang.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async delete(req, res) {
    try {
      const data = await lang.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new LangController();
