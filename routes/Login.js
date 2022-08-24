const router = require("express").Router();
const argon2 = require("argon2");
const Admin = require("../models/Admin");
const { confirmUI, loginUI } = require("./component");

// GET Landing Login Page
router.get("/", async (req, res) => {
  loginUI("Halaman Login Admin", "", "", res);
});

// Login admin
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await Admin.findOne({ where: { email: email } });
    if (!result) {
      loginUI("Kesalahan Login", "Email tidak ditemukan, Harap cek kembali", "danger", res);
    } else {
      const hash = await argon2.verify(result.password, password);
      if (!hash) {
        loginUI("Kesalahan Login", "Password salah, Harap cek kembali", "danger", res);
      } else {
        let session = (req.session.userid = result.id);
        loginUI("Berhasil Login", "Selamat Datang", "success", res);
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

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      confirmUI("Berhasil Log Out", "Berhasil LogOut", "login", res);
    } else {
      confirmUI("Gagal Log Out", "Gagal LogOut", "login", res);
    }
  });
});

module.exports = router;
