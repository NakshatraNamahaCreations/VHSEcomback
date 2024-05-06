const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductController = require("../Controller/Product");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addproduct",
  upload.single("productimage"),
  ProductController.addproduct
);
router.get("/getuserappdata", ProductController.getuserappdata);
router.get("/getvendorapp", ProductController.getvendorapp);
router.get("/gerproductById/:id", ProductController.gerproductById);
router.put(
  "/updateproductById/:id",
  upload.single("productimage"),
  ProductController.updateproductById
);
router.get("/getallproduct", ProductController.getallproductdata);
router.delete("/deleteproductById/:id", ProductController.deleteproductById);

module.exports = router;
