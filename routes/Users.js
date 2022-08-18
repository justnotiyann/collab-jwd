const router = require("express").Router();
const Users = require("../models/Users");

// GET ALL DATAS and Lading Page
router.get("/", async (req, res) => {
  const result = await Users.findAll({
    order: [
      ["createdAt", "DESC"],
      ["updatedAt", "DESC"],
    ],
  });
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

// DELETE Handling for USERS table
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Users.destroy({ where: { nama: id } });
  if (result.length < 0) {
    res.json({ msg: "Data tidak ditemukan" });
  } else {
    res.render("components/confirm", {
      layout: "./layout/main",
      title: "Data berhasil dihapus",
      desc: `Data Users ${id} Berhasil dihapus`,
    });
  }
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Users.findOne({ where: { id: id } });
  if (!result) {
    res.json("Terjadi Kesalahan");
  } else {
    res.render("edit-components/Users", {
      layout: "./layout/main",
      title: "Halaman Edit Users",
      result,
    });
  }
});

// EDIT handling for USERS Table
router.post("/users/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { nama, email, password, confirm } = req.body;
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

// Get USERS by ID / name / email
// router.get("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   const result = await Users.findAll({ where: { [Op.or]: [{ id: id }, { nama: id }, { email: id }, { jenis_kelamin: id }] } });
//   if (result.length < 0) return res.json({ msg: "Data tidak ditemukan" });
//   res.json({ result });
// });

module.exports = router;
