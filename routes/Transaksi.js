const router = require("express").Router();
const Transaksi = require("../models/Transaksi");

// Render all data from database / READ
router.get("/", async (req, res) => {
  const result = await Transaksi.findAll({});
  res.render("dashboard/dashboard-transaksi", {
    layout: "./layout/main",
    title: "Halaman Transaksi Users",
    result,
  });
});

// Handling DELETE data
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Transaksi.destroy({ where: { id: id } });
  if (!result) {
    res.render("components/confirm", {
      layout: "./layout/main",
      title: "Gagal Hapus Data",
      desc: `Gagal menghapus data ${id}`,
      link: "transaksi",
    });
  } else {
    res.render("components/confirm", {
      layout: "./layout/main",
      title: "Berhasil Hapus Data",
      desc: `Berhasil menghapus data ${id}`,
      link: "transaksi",
    });
  }
});

module.exports = router;
