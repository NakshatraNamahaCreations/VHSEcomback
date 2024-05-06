const OfferController = require("../Controller/offer");
const express = require("express");
const router = express.Router();

router.post("/addOffer", OfferController.AddOffer);
router.get("/getallOffer", OfferController.getAllOffer);
router.get("/getOffer", OfferController.getSearchedOffer);
router.get("/getbyOfferid/:id", OfferController.getByid);
router.put("/editOffer/:id", OfferController.update);
router.post("/trash/:id", OfferController.trash);

module.exports = router;
