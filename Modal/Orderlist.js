const mongoose = require("mongoose");

const orderlistSchema = new mongoose.Schema(
  {
    productname: { type: String },
    address: { type: String },
    quantity: { type: String },
    price: { type: String },
    totalamount: { type: String },
    paymentMethod: { type: String },
    discount: { type: String },
    productimage: { type: String },
    productStatus: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("orderlist", orderlistSchema);
