const product = require("../models/product");

class ProductController {
  async getAll(req, res) {
    try {
      const data = await product.find(req.query);
      res.send(data);
    } catch (error) {
      console.log(error, product);
      res.status(500).send(error);
    }
  }
  create(req, res) {
    try {
      const data = new product(req.body);
      data.save();
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  getOne(req, res) {
    try {
      const data = product.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  edit(req, res) {
    try {
      const data = product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  delete(req, res) {
    try {
      const data = product.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new ProductController();
