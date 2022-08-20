const router = require("express").Router();
const argon2 = require("argon2");
const Admin = require("../models/Admin");

// GET Landing Login Page
router.get("/", async (req, res) => {
  res.render("sistem-login/login", {
    layout: "./layout/main",
    title: "Halaman Login",
    desc: "",
    color: "",
  });
});

// Login admin
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await Admin.findOne({ where: { email: email } });
    if (!result) {
      res.render("sistem-login/login", {
        layout: "./layout/main",
        title: "Kesalahan login",
        desc: "Email tidak ditemukan, Harap cek kembali",
        color: "danger",
      });
    } else {
      const hash = await argon2.verify(result.password, password);
      if (!hash) {
        res.render("sistem-login/login", {
          layout: "./layout/main",
          title: "Kesalahan login",
          desc: "Password salah harap cek kembali",
          color: "danger",
        });
      } else {
        res.render("sistem-login/login", {
          layout: "./layout/main",
          title: "Berhasil Login",
          desc: "Berhasil Login",
          color: "success",
        });
      }
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
    res.json({ msg: "Berhasil daftar admin" });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
