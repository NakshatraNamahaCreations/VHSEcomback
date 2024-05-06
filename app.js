const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err}`);
  });

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const Auth = require("./Controller/auth");
const Banner = require("./Controller/Banner");
const category = require("./Route/Category");
const Subcategory = require("./Route/Subcategory");
// const customer = require("./Route/Customer");
const OFfer = require("./Route/offer");
const Product = require("./Route/Product");
const Orderlist = require("./Route/Orderlist");

app.use("/api", Auth);
app.use("/api/banner", Banner);
app.use("/api/category", category);
app.use("/api/subcat", Subcategory);
// app.use("/api/customer", customer);
app.use("/api", OFfer);
app.use("/api/product", Product);
app.use("/api/orderlist", Orderlist);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
