const router = require("express").Router();
const Product = require("../models/Products");

// GET Landing Login Page
router.get("/", async (req, res) => {
  const result = await Product.findAll({});
  if (!result) {
    res.json({ msg: "Terjadi kesalahan" });
  } else {
    res.render("index", {
      layout: "./layout/main",
      title: "Halaman Utama",
      result,
    });
  }
});

module.exports = router;
