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
      let item = {
        ...req.body,
        name: JSON.parse(req.body.name),
        description: JSON.parse(req.body.description),
        main_image: req.files.main_image[0].path,
        images: req.files.images.map((item) => item.path),
      };
      const data = new product(item);
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
