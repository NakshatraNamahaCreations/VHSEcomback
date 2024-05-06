const express = require("express");
const router = express.Router();
const multer = require("multer");
const OrderlistController = require("../Controller/Orderlist");

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
  "/addorderlist",
  upload.single("productimage"),
  OrderlistController.addorderlist
);

router.get("/getallorderlistdata", OrderlistController.getallorderlistdata);
router.get("/getorderlistById/:id", OrderlistController.getorderlistById);

module.exports = router;
