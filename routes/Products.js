const router = require("express").Router();
const Product = require("../models/Products");

// GET Landing Page and Product
router.get("/", async (req, res) => {
  const result = await Product.findAll({ order: [["update", "DESC"]] });
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
    res.render("components/confirm", {
      layout: "./layout/main",
      title: "Gagal input data",
      desc: "Gagal input data",
      link: "products/add",
    });
  } else {
    res.render("components/confirm", {
      layout: "./layout/main",
      title: "Berhasil input data",
      desc: "Berhasil input data",
      link: "products",
    });
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
    res.render("components/confirm", {
      layout: "./layout/main",
      title: "Berhasil Di Update",
      desc: "Data berhasil diupdate",
      link: "products",
    });
  }
});

// DELETE Handling For Product Table
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.destroy({ where: { id: id } });
  if (!result) {
    res.json({ msg: "Data tidak ditemukan" });
  } else {
    res.render("components/confirm", {
      layout: "./layout/main",
      title: "Data Berhasil Dihapus",
      desc: "Sukses Menghapus Data",
      link: "products",
    });
    // res.json({ msg: "Data berhasil dihapus" });
  }
});

// // GET Product by Search
// router.get("/products/:id", async (req, res) => {
//   const id = req.params.id;
//   const result = await Product.findAll({ where: { [Op.or]: [{ id: id }, { judul_buku: id }, { penulis: id }, { kategori: id }, { penerbit: id }] } });
//   if (!result) return res.json({ msg: "Terjadi kesalahan" });
//   res.json(result);
// });

module.exports = router;
