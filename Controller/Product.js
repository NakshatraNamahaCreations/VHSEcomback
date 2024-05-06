const ProductSchema = require("../Modal/product/Product");

class product {
  async addproduct(req, res) {
    try {
      const {
        category,
        subcategory,
        productname,
        hsncode,
        offerprice,
        price,
        offer,
        selectapp,
        description,
        deliverycharge,
      } = req.body;
      let file = req.file.filename;
      const banner = new ProductSchema({
        category,
        productimage: file,
        subcategory,
        productname,
        hsncode,
        offerprice,
        price,
        offer,
        selectapp,
        description,
        deliverycharge,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select product image",
        });
      }
      await banner.save();
      res.status(200).json({
        status: true,
        success: "product created successfully",
        data: banner,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("error", error);
    }
  }

  async getuserappdata(req, res) {
    try {
      let data = await ProductSchema.find({ selectapp: "USER APP" });

      res.status(200).json({ message: "success", data: data });
    } catch (err) {
      console.log("error", err);
      res.status(400).json({ message: "fail" });
    }
  }

  async getvendorapp(req, res) {
    try {
      let data = await ProductSchema.find({ selectapp: "VENDOR APP" });
      //   .sort(["_id", -1]);
      res.status(200).json({ message: "success", data: data });
    } catch (err) {
      console.log("error", err);
      res.status(400).json({ message: "fail" });
    }
  }

  async gerproductById(req, res) {
    try {
      const banner = await ProductSchema.findById(req.params.id);
      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }
      res.status(200).json(banner);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getallproductdata(req, res) {
    try {
      const data = await ProductSchema.find({});
      return res.status(200).json({ data: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async updateproductById(req, res) {
    try {
      const id = req.params.id;
      const {
        category,
        subcategory,
        productname,
        hsncode,
        offerprice,
        price,
        offer,
        selectapp,
        description,
        deliverycharge,
      } = req.body;
      let file = req.file ? req.file.filename : null;
      const findBanner = await ProductSchema.findOne({ _id: id });
      if (!findBanner) {
        return res.status(401).json({ error: "No banner Found" });
      }
      findBanner.category = category || findBanner.category;
      findBanner.subcategory = subcategory || findBanner.subcategory;
      findBanner.productname = productname || findBanner.productname;
      findBanner.hsncode = hsncode || findBanner.hsncode;
      findBanner.offerprice = offerprice || findBanner.offerprice;
      findBanner.price = price || findBanner.price;
      findBanner.offer = offer || findBanner.offer;
      findBanner.selectapp = selectapp || findBanner.selectapp;
      findBanner.description = description || findBanner.description;
      findBanner.deliverycharge = deliverycharge || findBanner.deliverycharge;

      findBanner.productimage = file;
      const updateBanner = await ProductSchema.findOneAndUpdate(
        { _id: id },
        { $set: findBanner },
        { new: true }
      );
      if (!updateBanner) {
        return res
          .status(404)
          .json({ status: false, message: "product not found" });
      }
      return res.status(200).json({
        status: true,
        success: "product updated successfully",
        Data: updateBanner,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteproductById(req, res) {
    try {
      const id = req.params.id;
      const banner = await ProductSchema.findByIdAndDelete(id);
      if (!banner) {
        return res
          .status(404)
          .json({ status: false, message: "product not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const ProductController = new product();
module.exports = ProductController;
