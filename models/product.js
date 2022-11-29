const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new Schema({
  name: {
    type: Object,
    required: true,
  },
  main_image: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
  },
  current_price: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  in_stock: {
    type: Boolean,
    default: true,
  },
  is_promotion: {
    type: Boolean,
    default: false,
  },
  is_new: {
    type: Boolean,
    default: false,
  },
  is_active:{
    type: Boolean,
    default: true,
  } , 
  description: {
    type: Object,
    required: true,
  },
  specifications: [
    {
      name: {
        type: Object,
      },
      value: {
        type: String,
      },
    },
  ],
});

ProductSchema.plugin(AutoIncrement, { id: "product_id", inc_field: "id" });
module.exports = Product = mongoose.model("product", ProductSchema);
