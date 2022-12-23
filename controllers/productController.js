const Category = require("../models/category");
const Product = require("../models/product");
const fs = require("fs");

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
      let id = req.body.id;
      let images = req.files.images?.map((item) => item.path);
      if (images && images.length) {
        item.images = images;
      }
      let data = Product.findByIdAndUpdate(
        id,
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
      let id = req.body.id;
      let path = req.body.path;

      // check if file exists in the product
      let data = Product.findById(id);
      if (!data.images.includes(path)) {
        res.status(400).send("File does not exist");
      } else {
        // remove file from product
        let data = Product.findByIdAndUpdate(
          id,
          {
            $pull: { images: path },
          },
          { new: true }
        );
        // delete file
        fs.promises
          .unlink(path)
          .then(() => {
            res.status(204).send();
          })
          .catch((err) => {
            res
              .status(500)
              .send("Error deleting file. Please try again later.");
          });
      }
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
