const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("dashboard/dashboard-transaksi", {
    layout: "./layout/main",
    title: "Halaman Transaksi Users",
  });
});

module.exports = router;
