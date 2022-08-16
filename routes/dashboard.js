const router = require("express").Router();
const Product = require("../models/Products");
const Users = require("../models/Users");
const { Op } = require("sequelize");
const argon2 = require("argon2");

// Product Handling

// Get Landing Page Dashboard
router.get("/", async (req, res) => {
  res.json({ msg: "Hello vro" });
});

// GET Product
router.get("/products", async (req, res) => {
  const result = await Product.findAll({});
  if (!result) return res.json({ msg: "Terjadi kesalahan" });
  res.json(result);
});

// GET Product by judul_buku
router.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.findAll({ where: { [Op.or]: [{ id: id }, { judul_buku: id }, { penulis: id }, { kategori: id }, { penerbit: id }] } });
  if (!result) return res.json({ msg: "Terjadi kesalahan" });
  res.json(result);
});

// EDIT Handling For Product Table
router.post("/products/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { judul_buku, penulis, kategori, penerbit, harga } = req.body;
  const result = Product.update(
    {
      judul_buku: judul_buku,
      penulis: penulis,
      kategori: kategori,
      penerbit: penerbit,
      harga: harga,
    },
    {
      where: { id: id },
    }
  );
  if (!result) return res.json({ msg: "Data tidak ditemukan" });
  res.json("Oke berhasil di update");
});

// DELETE Handling For Product Table
router.get("/products/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.destroy({ where: { id: id } });
  if (!result) return res.json({ msg: "Data tidak ditemukan" });
  res.json({ msg: "Data berhasil dihapus" });
});

// Users Handling

// GET * Data From USERS Table
router.get("/users", async (req, res) => {
  const result = await Users.findAll({});
  if (result.length < 0) return res.json({ msg: "Data tidak ditemukan" });
  res.json({ result });
});

// Get USERS by ID / name / email
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Users.findAll({ where: { [Op.or]: [{ id: id }, { nama: id }, { email: id }, { jenis_kelamin: id }] } });
  if (result.length < 0) return res.json({ msg: "Data tidak ditemukan" });
  res.json({ result });
});

// EDIT handling for USERS Table
router.post("/users/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { nama, email, password } = req.body;
  const hash = await argon2.hash(password);
  const result = await Users.update(
    {
      nama: nama,
      email: email,
      password: hash,
    },
    {
      where: { id: id },
    }
  );
  if (result.length < 0) return res.json("Data tidak ditemukan");
  res.json({ msg: "Data berhasil diupdate" });
});

// DELETE Handling for USERS table
router.get("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Users.destroy({ where: { id: id } });
  if (result.length < 0) return res.json({ msg: "Data tidak ditemukan" });
  res.json({ msg: "Data berhasil dihapus" });
});

module.exports = router;
