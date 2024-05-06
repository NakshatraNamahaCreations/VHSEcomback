const SubcategoryModal = require("../Modal/subcategory/Subcategory");

exports.AddSubCategory = async (req, res) => {
  // let file = req.file.filename;
  let { Subcat, category, SubcatImage } = req.body;
  try {
    const SubcategoryData = new SubcategoryModal({
      Subcat,
      category,
      SubcatImage,
    });

    const savedSubcategory = await SubcategoryData.save();

    if (savedSubcategory) {
      return res
        .status(200)
        .json({ message: "Subcategory Added Successfully", savedSubcategory });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getAllSubcategory = async (req, res) => {
  try {
    const SubcategoryData = await SubcategoryModal.find({});
    return res.status(200).json({ data: SubcategoryData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getSearchedSubCategory = async (req, res) => {
  try {
    const { searchValue } = req.query;

    const query = searchValue
      ? { Subcat: { $regex: new RegExp(escapeRegex(searchValue), "i") } }
      : {};

    const categoryData = await SubcategoryModal.find(query);

    return res.status(200).json({ data: categoryData || [] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
exports.getByid = async (req, res) => {
  let id = req.params.id;
  try {
    const SubcategoryData = await SubcategoryModal.findOne({ _id: id });

    if (SubcategoryData) {
      return res.status(200).json({ data: SubcategoryData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.update = async (req, res) => {
  let { Subcat, category } = req.body;
  try {
    let idd = req.params.id;
    const file = req.file?.filename;
    const findSubcategory = await SubcategoryModal.findOne({
      _id: idd,
    });
    if (!findSubcategory) {
      return res.json({ error: "No such record found" });
    }
    findSubcategory.Subcat = Subcat || findSubcategory.Subcat;
    findSubcategory.category = category || findSubcategory.category;

    if (file) {
      findSubcategory.SubcatImage = file;
    }

    const updateSubCategory = await SubcategoryModal.findOneAndUpdate(
      { _id: idd },
      findSubcategory,
      { new: true }
    );
    return res.status(200).json({
      message: "Updated successfully",
      date: updateSubCategory,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update the Subcategory" });
  }
};

exports.trash = async (req, res) => {
  let id = req.params.id;
  try {
    const SubcategoryData = await SubcategoryModal.findOneAndDelete({
      _id: id,
    });

    if (SubcategoryData) {
      return res.status(200).json({ data: SubcategoryData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
