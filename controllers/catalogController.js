const catalog = require("../models/catalog");

class CatalogController {
  async getAll(req, res) {
    try {
      const data = await catalog.find();
      res.send(data);
    } catch (error) {
      console.log(error, catalog);
      res.status(500).send(error);
    }
  }
  create(req, res) {
    try {
      const data = new catalog(req.body);
      data.save();
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  getOne(req, res) {
    try {
      const data = catalog.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  edit(req, res) {
    try {
      const data = catalog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  delete(req, res) {
    try {
      const data = catalog.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new CatalogController();
