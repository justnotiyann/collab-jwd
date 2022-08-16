const router = require("express").Router();
const Product = require("../models/Products");
const { Op } = require("sequelize");

// GET Product
router.get("/", async (req, res) => {
  const result = await Product.findAll({});
  if (!result) return res.json({ msg: "Terjadi kesalahan" });
  res.json(result);
});

// GET Product by judul_buku
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.findAll({ where: { [Op.or]: [{ id: id }, { judul_buku: id }, { penulis: id }, { kategori: id }, { penerbit: id }] } });
  if (!result) return res.json({ msg: "Terjadi kesalahan" });
  res.json(result);
});

module.exports = router;
