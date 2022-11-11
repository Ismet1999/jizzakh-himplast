const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const LangSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

LangSchema.plugin(AutoIncrement, { id: "lang_id", inc_field: "id" });

module.exports = Lang = mongoose.model("lang", LangSchema);
