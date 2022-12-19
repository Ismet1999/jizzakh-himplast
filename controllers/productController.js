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
      if (main_image) {
        item.main_image = main_image;
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
      if (main_image) {
        item.main_image = main_image;
      }
      const oldProduct = await Product.findById(req.params._id);
      await Category.findByIdAndUpdate(
        oldProduct.category,
        { $pull: { products: req.params.id } },
        { new: true }
      );
      const data = await Product.findByIdAndUpdate(req.params.id, item, {
        new: true,
      });
      let newData = await Category.findByIdAndUpdate(
        req.body.category,
        { $push: { products: data._id } },
        { new: true }
      );
      let result = await newData.populate("category");
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  addPhoto(req, res) {
    try {
      let _id = req.body._id;
      let images = req.files.images?.map((item) => item.path);
      if (images && images.length) {
        item.images = images;
      }
      let data = Product.findByIdAndUpdate(
        _id,
        {
          $push: { images: images },
        },
        { new: true }
      );
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  deletePhoto(req, res) {
    try {
      let path = req.body.path;
      // delete file
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      res.status(204).send();
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
