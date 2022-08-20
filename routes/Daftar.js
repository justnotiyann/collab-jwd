const router = require("express").Router();
const Users = require("../models/Users");
const argon2 = require("argon2");

router.get("/", async (req, res) => {
  res.render("sistem-login/daftar", {
    layout: "./layout/main",
    title: "Daftar User",
  });
});

router.post("/", async (req, res) => {
  const { nama, email, password, jenis_kelamin, alamat } = req.body;
  const hash = await argon2.hash(password);
  const result = await Users.create({
    nama: nama,
    email: email,
    password: hash,
    jenis_kelamin: jenis_kelamin,
    alamat: alamat,
  });
  if (!result) return res.json({ msg: "Data Gagal ditambahkan" });
  res.json({ msg: "Data berhasil ditambahkan" });
});

module.exports = router;
