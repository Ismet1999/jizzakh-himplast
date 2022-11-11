class Api {
  model = null;
  constructor(model) {
    this.model = model;
    console.log("model", this.model);
  }

  async getAll(req, res) {
    try {
      const data = await this.model.find();
      res.send(data);
    } catch (error) {
      console.log(error, this.model);
      res.status(500).send(error);
    }
  }
  create(req, res) {
    try {
      const data = new this.model(req.body);
      data.save();
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  getOne(req, res) {
    try {
      const data = this.model.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  edit(req, res) {
    try {
      const data = this.model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  delete(req, res) {
    try {
      const data = this.model.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = Api;
