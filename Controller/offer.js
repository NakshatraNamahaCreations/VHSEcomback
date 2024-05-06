const OfferModal = require("../Modal/offer/offer");

exports.AddOffer = async (req, res) => {
  let { Offer, category } = req.body;
  try {
    const OfferData = new OfferModal({
      Offer,
      category,
    });

    const savedOffer = await OfferData.save();

    if (savedOffer) {
      return res.status(200).json({ data: savedOffer });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getAllOffer = async (req, res) => {
  try {
    const OfferData = await OfferModal.find({});
    return res.status(200).json({ data: OfferData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getSearchedOffer = async (req, res) => {
  try {
    const { searchValue } = req.query;

    const query = searchValue
      ? { Offer: { $regex: new RegExp(escapeRegex(searchValue), "i") } }
      : {};

    const categoryData = await OfferModal.find(query);

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
    const OfferData = await OfferModal.findOne({ _id: id });

    if (OfferData) {
      return res.status(200).json({ data: OfferData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.update = async (req, res) => {
  let { Offer, category } = req.body;
  try {
    let idd = req.params.id;

    const findOffer = await OfferModal.findOne({
      _id: idd,
    });
    if (!findOffer) {
      return res.json({ error: "No such record found" });
    }
    findOffer.Offer = Offer || findOffer.Offer;
    findOffer.category = category || findOffer.category;

    const updateOffer = await OfferModal.findOneAndUpdate(
      { _id: idd },
      findOffer,
      { new: true }
    );
    return res.status(200).json({
      message: "Updated successfully",
      date: updateOffer,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update the Offer" });
  }
};

exports.trash = async (req, res) => {
  let id = req.params.id;
  try {
    const OfferData = await OfferModal.findOneAndDelete({
      _id: id,
    });

    if (OfferData) {
      return res.status(200).json({ data: OfferData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
