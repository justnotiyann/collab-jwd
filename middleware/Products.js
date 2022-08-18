const Product = require("../models/Products");

const getAllProduct = async (req, res) => {
  const result = await Product.findAll({});
  if (!result) return res.json({ msg: "Terjadi Kesalahan" });
};

module.exports = { getAllProduct };
