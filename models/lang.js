const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const LangSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [true , 'Поле name должно быть уникальным'],
  },
  code: {
    type: String,
    required: true,
    unique: [true , 'Поле code должно быть уникальным'],
  },
});

LangSchema.plugin(AutoIncrement, { id: "lang_id", inc_field: "id" });

module.exports = Lang = mongoose.model("lang", LangSchema);
