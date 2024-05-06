const orderlistSchema = require("../Modal/Orderlist");

class orderlist {
  async addorderlist(req, res) {
    try {
      const {
        productname,
        address,
        quantity,
        price,
        totalamount,
        paymentMethod,
        discount,
        productStatus,
        date,
      } = req.body;
      //   let file = req.file.filename;
      const banner = new orderlistSchema({
        // productimage: file,
        productname,
        address,
        quantity,
        price,
        totalamount,
        paymentMethod,
        discount,
        productStatus,
        date,
      });
      //   if (!file) {
      //     return res.status(500).json({
      //       status: 500,
      //       error: "Please select product image",
      //     });
      //   }
      await banner.save();
      res.status(200).json({
        status: true,
        success: "Order successfully",
        data: banner,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("error", error);
    }
  }

  async getorderlistById(req, res) {
    try {
      const banner = await orderlistSchema.findById(req.params.id);
      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }
      res.status(200).json(banner);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getallorderlistdata(req, res) {
    try {
      const data = await orderlistSchema.find({});
      return res.status(200).json({ data: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }
}

const OrderlistController = new orderlist();
module.exports = OrderlistController;
