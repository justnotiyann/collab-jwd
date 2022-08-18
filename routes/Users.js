const router = require("express").Router();
const Users = require("../models/Users");

// GET * Data From USERS Table
router.get("/", async (req, res) => {
  const result = await Users.findAll({});
  if (result.length < 0) {
    res.json({ msg: "Data tidak ditemukan" });
  } else {
    res.render("dashboard/dashboard-users", {
      layout: "./layout/main",
      title: "Halaman Data Users",
      result,
    });
  }
});

// Get USERS by ID / name / email
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Users.findAll({ where: { [Op.or]: [{ id: id }, { nama: id }, { email: id }, { jenis_kelamin: id }] } });
  if (result.length < 0) return res.json({ msg: "Data tidak ditemukan" });
  res.json({ result });
});

// EDIT handling for USERS Table
router.post("/users/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { nama, email, password } = req.body;
  const hash = await argon2.hash(password);
  const result = await Users.update(
    {
      nama: nama,
      email: email,
      password: hash,
    },
    {
      where: { id: id },
    }
  );
  if (result.length < 0) return res.json("Data tidak ditemukan");
  res.json({ msg: "Data berhasil diupdate" });
});

// DELETE Handling for USERS table
router.get("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Users.destroy({ where: { id: id } });
  if (result.length < 0) return res.json({ msg: "Data tidak ditemukan" });
  res.json({ msg: "Data berhasil dihapus" });
});

module.exports = router;
