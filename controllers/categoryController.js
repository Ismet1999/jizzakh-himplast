const category = require("../models/category");

class CategoryController {
  async getAll(req, res) {
    try {
      const data = await category.find();
      res.send(data);
    } catch (error) {
      console.log(error, category);
      res.status(500).send(error);
    }
  }
  create(req, res) {
    try {
      const data = new category(req.body);
      data.save();
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  getOne(req, res) {
    try {
      const data = category.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  edit(req, res) {
    try {
      const data = category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  delete(req, res) {
    try {
      const data = category.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new CategoryController();
