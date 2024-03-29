const category = require("../models/category");

class CategoryController {
  async getAll(req, res) {
    try {
      const data = await category.find(req.query);
      res.send(data);
    } catch (error) {
      console.log(error, category);
      res.status(500).send(error);
    }
  }
  async create(req, res) {
    try {
      const data = new category(req.body);
      let result = await data.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async getOne(req, res) {
    try {
      const data = await category.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async edit(req, res) {
    try {
      const data = await category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async delete(req, res) {
    try {
      const data = await category.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new CategoryController();
