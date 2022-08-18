const router = require("express").Router();
const argon2 = require("argon2");
const Admin = require("../models/Admin");

// GET Landing Login Page
router.get("/", async (req, res) => {
  res.render("index", {
    layout: "./layout/main",
    title: "Halaman Login",
  });
});

// Login admin
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await Admin.findOne({ where: { email: email } });
    if (!result) {
      res.json({ msg: "data tidak ditemukan" });
    } else {
      const hash = await argon2.verify(result.password, password);
      if (!hash) return res.json({ msg: "Password anda salah" });
      res.render("dashboard", {
        layout: "./layout/main",
        title: "Halaman Dashboard",
      });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
});

// daftar admin
router.post("/add", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await argon2.hash(password);
    const result = await Admin.create({ email: email, password: hash });
    if (!result) return res.sendStatus(403).json({ msg: "Gagal Membuat Data" });
    res.sendStatus(200).json({ msg: "Berhasil Membuat Data" });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
