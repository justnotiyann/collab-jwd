const router = require("express").Router();
const Product = require("../models/Products");
const Users = require("../models/Users");
const { Op } = require("sequelize");

// Get Landing Page
router.get("/", async (req, res) => {
  res.json({ msg: "Hello vro" });
});

// GET Product
router.get("/product", async (req, res) => {
  const result = await Product.findAll({});
  if (!result) return res.json({ msg: "Terjadi kesalahan" });
  res.json(result);
});

// GET Product by judul_buku
router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.findAll({ where: { [Op.or]: [{ id: id }, { judul_buku: id }, { penulis: id }, { kategori: id }, { penerbit: id }] } });
  if (!result) return res.json({ msg: "Terjadi kesalahan" });
  res.json(result);
});

// DELETE Handling For Product Table
router.get("/product/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.destroy({ where: { id: id } });
  if (!result) return res.json({ msg: "Data tidak ditemukan" });
  res.json({ msg: "Data berhasil dihapus" });
});

// GET Data From USERS Table
router.get("/users", async (req, res) => {
  const result = await Users.findAll({});
  if (!result) return res.json({ msg: "Data tidak ditemukan" });
  res.json({ result });
});

module.exports = router;
