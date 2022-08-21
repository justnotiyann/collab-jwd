const router = require("express").Router();
const { Op } = require("sequelize");
const Product = require("../models/Products");
const { confirmUI } = require("./component");

// GET Landing Page and Product
router.get("/", async (req, res) => {
  const result = await Product.findAll({ order: [["updatedAt", "DESC"]] });
  if (!result) {
    res.json({ msg: "Terjadi kesalahan" });
  } else {
    res.render("dashboard/dashboard-products", {
      layout: "./layout/main",
      title: "Halaman Data Product",
      result,
    });
  }
});

// GET form add products
router.get("/add", (req, res) => {
  res.render("tambah-components/Products", {
    layout: "./layout/main",
    title: "Form Tambah Products",
  });
});

router.post("/add", async (req, res) => {
  const { judul_buku, penulis, kategori, penerbit, harga } = req.body;
  const result = await Product.create({
    judul_buku: judul_buku,
    penulis: penulis,
    kategori: kategori,
    penerbit: penerbit,
    harga: harga,
  });
  if (!result) {
    confirmUI("Gagal input data", "Gagal input data", "products/add", res);
  } else {
    confirmUI("Berhasil input data", "Berhasil input data", "products", res);
  }
});

// GET EDIT Form Handling For Product Table
router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.findOne({ where: { id: id } });
  if (!result) {
    res.json("data tidak ditemukan");
  } else {
    res.render("edit-components/Products", {
      layout: "./layout/main",
      title: "Halaman Edit Products",
      result,
    });
  }
});

// EDIT Handling For Product Table
router.post("/edit", async (req, res) => {
  const { id, judul_buku, penulis, kategori, penerbit, harga } = req.body;
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
  if (!result) {
    res.json({ msg: "Data tidak ditemukan" });
  } else {
    confirmUI("Berhasil input data", "Berhasil edit data", "products", res);
  }
});

// DELETE Handling For Product Table
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.destroy({ where: { id: id } });
  if (!result) {
    res.json({ msg: "Data tidak ditemukan" });
  } else {
    confirmUI("Berhasil hapus data", "Berhasil hapus data", "products", res);
  }
});

// Handling SEARCH
router.post("/search", async (req, res) => {
  const { search } = req.body;
  const result = await Product.findAll({
    where: {
      [Op.or]: [{ judul_buku: { [Op.like]: `%${search}%` } }, { penulis: { [Op.like]: `%${search}%` } }, { kategori: { [Op.like]: `%${search}%` } }, { penerbit: { [Op.like]: `%${search}%` } }, { harga: { [Op.like]: `%${search}%` } }],
    },
  });
  if (!result) {
    res.json({ msg: "Data tidak ditemukan" });
  } else {
    res.render("dashboard/dashboard-products", {
      layout: "./layout/main",
      title: "Halaman Data Product",
      result,
    });
  }
});

module.exports = router;
