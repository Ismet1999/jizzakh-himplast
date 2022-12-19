const Category = require("../models/category");
const Product = require("../models/product");

class ProductController {
  async getAll(req, res) {
    try {
      const data = await Product.find(req.query).populate("category");
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
        specifications: JSON.parse(req.body.specifications),
      };
      let main_image = req.files.main_image && req.files.main_image[0].path;
      console.log(req.files.images);
      let images = req.files.images?.map((item) => item.path);
      if (main_image) {
        item.main_image = main_image;
      }
      if (images && images.length) {
        item.images = images;
      }
      const data = new Product(item);
      await data.save();
      await Category.findByIdAndUpdate(
        req.body.category,
        { $push: { products: data._id } },
        { new: true }
      );
      let result = await data.populate("category");
      res.send(result);
    } catch (error) {
      console.log(error);
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
      let item = {
        ...req.body,
        name: JSON.parse(req.body.name),
        description: JSON.parse(req.body.description),
        specifications: JSON.parse(req.body.specifications),
      };
      let main_image = req.files.main_image && req.files.main_image[0].path;
      let images = req.files.images?.map((item) => item.path);
      if (main_image) {
        item.main_image = main_image;
      }
      // if (images && images.length) {
      //   item.images = images;
      // }
      const data = await Product.findByIdAndUpdate(req.params._id, item, {
        new: true,
      });
      await Category.findByIdAndUpdate(
        req.body.category,
        { $pull: { products: data._id } },
        { new: true }
      );
      await Category.findByIdAndUpdate(
        req.body.category,
        { $push: { products: data._id } },
        { new: true }
      );
      let result = await data.populate("category");
      res.send(result);
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
