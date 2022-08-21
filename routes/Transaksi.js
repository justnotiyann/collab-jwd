const router = require("express").Router();
const Transaksi = require("../models/Transaksi");
const { Op } = require("sequelize");
const { confirmUI } = require("./component");

// Render all data from database / READ
router.get("/", async (req, res) => {
  const result = await Transaksi.findAll({ order: [["updatedAt", "DESC"]] });
  res.render("dashboard/dashboard-transaksi", {
    layout: "./layout/main",
    title: "Halaman Transaksi Users",
    result,
  });
});

// Render ADD FORM Transaksi
router.get("/add", async (req, res) => {
  res.render("tambah-components/Transaksi", {
    layout: "./layout/main",
    title: "Halaman tambah data",
  });
});

// Handling ADD
router.post("/add", async (req, res) => {
  const { nama, email, nomor_telepon, alamat, judul_buku, harga, sistem_pembayaran } = req.body;
  const result = await Transaksi.create({
    nama: nama,
    email: email,
    nomor_telepon: nomor_telepon,
    alamat: alamat,
    judul_buku: judul_buku,
    harga: harga,
    sistem_pembayaran: sistem_pembayaran,
  });
  if (!result) {
    confirmUI("Gagal input data", "Gagal input data", "transaksi/add", res);
  } else {
    confirmUI("Berhasil input data", "Berhasil input data", "transaksi", res);
  }
});

// Render EDIT form
router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Transaksi.findOne({ where: { id: id } });
  if (!result) {
    confirmUI("Gagal mendapatkan data", "Gagal mendapatkan data", "transaksi", res);
  } else {
    res.render("edit-components/Transaksi", {
      layout: "./layout/main",
      title: "Halaman Edit",
      result,
    });
  }
});

router.post("/edit", async (req, res) => {
  const { id, nama, email, nomor_telepon, alamat, judul_buku, harga, sistem_pembayaran } = req.body;
  const result = await Transaksi.update(
    {
      nama: nama,
      email: email,
      nomor_telepon: nomor_telepon,
      alamat: alamat,
      judul_buku: judul_buku,
      harga: harga,
      sistem_pembayaran: sistem_pembayaran,
    },
    {
      where: { id: id },
    }
  );
  if (!result) {
    confirmUI("Gagal edit data", "Gagal edit data", "transaksi", res);
  } else {
    confirmUI("Gagal edit data", "Gagal edit data", "transaksi", res);
  }
});

// Handling DELETE data
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Transaksi.destroy({ where: { nama: id } });
  if (!result) {
    confirmUI("Gagal hapus data", "Gagal hapus data", "transaksi", res);
  } else {
    confirmUI("Berhasil hapus data", "Berhasil hapus data", "transaksi", res);
  }
});

// Handling Fitur SEARCH
router.post("/search", async (req, res) => {
  const { search } = req.body;
  const result = await Transaksi.findAll({
    where: {
      [Op.or]: [
        { nama: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { nomor_telepon: { [Op.like]: `%${search}%` } },
        { alamat: { [Op.like]: `%${search}%` } },
        { judul_buku: { [Op.like]: `%${search}%` } },
        { harga: { [Op.like]: `%${search}%` } },
        { sistem_pembayaran: { [Op.like]: `%${search}%` } },
      ],
    },
  });
  if (result.length <= 0) {
    confirm("Gagal mendapatkan data", "Gagal mendapatkan data", "transaksi", res);
  } else {
    res.render("dashboard/dashboard-transaksi", {
      layout: "./layout/main",
      title: "Halaman Data Product",
      result,
    });
  }
});

module.exports = router;
