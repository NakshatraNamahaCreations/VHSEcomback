const SubcategoryController = require("../Controller/Subcategory");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Subcategory");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addSubcategory",
  upload.single("SubcatImage"),
  SubcategoryController.AddSubCategory
);
router.get("/getallsubcategory", SubcategoryController.getAllSubcategory);
router.get("/getsubcategory", SubcategoryController.getSearchedSubCategory);
router.get("/getbySubcategoryid/:id", SubcategoryController.getByid);
router.put(
  "/editSubcategory/:id",
  upload.single("SubcatImage"),
  SubcategoryController.update
);
router.post("/trash/:id", SubcategoryController.trash);

module.exports = router;
