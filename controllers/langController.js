const lang = require("../models/lang");

class LangController {
  async getAll(req, res) {
    try {
      const data = await lang.find(req.query);
      res.send(data);
    } catch (error) {
      console.log(error, lang);
      res.status(500).send(error);
    }
  }
  create(req, res) {
    try {
      const data = new lang(req.body);
      data.save();
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  getOne(req, res) {
    try {
      const data = lang.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  edit(req, res) {
    try {
      const data = lang.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  delete(req, res) {
    try {
      const data = lang.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new LangController();
