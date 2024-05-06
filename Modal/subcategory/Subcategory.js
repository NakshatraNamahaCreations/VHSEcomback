const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  { category: String, Subcat: String, SubcatImage: String },
  { timestamps: true }
);
module.exports = mongoose.model("Subcategory", SubCategorySchema);
