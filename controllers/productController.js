const Category = require("../models/category");
const Product = require("../models/product");

class ProductController {
  async getAll(req, res) {
    try {
      const data = await Product.find(req.query);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async create(req, res) {
    try {
      let item = {
        ...req.body,
        name: JSON.parse(req.body.name),
        description: JSON.parse(req.body.description),
        main_image: req.files.main_image[0].path,
        images: req.files.images.map((item) => item.path),
      };
      const data = new Product(item);
      await data.save();
      await Category.findByIdAndUpdate(
        req.body.category,
        { $push: { products: result._id } },
        { new: true }
      );
      result = await result.populate("category").execPopulate();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async getOne(req, res) {
    try {
      const data = await Product.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async edit(req, res) {
    try {
      const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async delete(req, res) {
    try {
      const data = await Product.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new ProductController();
