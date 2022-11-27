const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CategorySchema = new Schema({
  name: {
    type: Object,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  is_active: {
    type: Boolean,
    default: true,
  },
});

CategorySchema.plugin(AutoIncrement, { id: "category_id", inc_field: "id" });

module.exports = Category = mongoose.model("category", CategorySchema);
