const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: { type: String },
    subcategory: { type: String },
    category: { type: String },
    subcategory: { type: String },
    productname: { type: String },
    hsncode: { type: String },
    offerprice: { type: String },
    price: { type: String },
    offer: { type: String },
    selectapp: { type: String },
    description: { type: String },
    productimage: { type: String },
    deliverycharge: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
