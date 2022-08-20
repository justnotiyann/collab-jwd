const router = require("express").Router();
const Users = require("../models/Users");
const argon2 = require("argon2");
const { confirmUI } = require("./component");

router.get("/", async (req, res) => {
  res.render("sistem-login/daftar", {
    layout: "./layout/main",
    title: "Daftar User",
  });
});

router.post("/add", async (req, res) => {
  const { nama, email, password, confirm, nomor_telepon, jenis_kelamin, alamat } = req.body;
  if (password != confirm) return confirmUI("Gagal mendaftar", "Password tidak cocok,Silahkan cek kembali", "daftar", res);
  const getEmail = await Users.findOne({ where: { email: email } });
  if (getEmail) return confirmUI("Gagal mendaftar", "Email sudah digunakan", "daftar", res);
  const hash = await argon2.hash(password);
  if (!hash) res.json({ msg: "Terjadi kesalahan" });
  const result = await Users.create({
    nama: nama,
    email: email,
    nomor_telepon: nomor_telepon,
    password: hash,
    jenis_kelamin: jenis_kelamin,
    alamat: alamat,
  });
  if (!result) res.json({ msg: "Gagal input terjadi kesalahan" });
  confirmUI("Sukses mendaftar", "Berhasil mendaftar, Selamat datang", "daftar", res);
});

module.exports = router;
