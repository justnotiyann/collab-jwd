const router = require("express").Router();
const Users = require("../models/Users");
const argon2 = require("argon2");
const { Op } = require("sequelize");
const { confirmUI } = require("./component");
const verifyUser = require("../middleware/Auth");

// Render all data from database
router.get("/", async (req, res) => {
  const result = await Users.findAll({
    order: [["updatedAt", "DESC"]],
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

// Render form ADD / TAMBAH
router.get("/add", async (req, res) => {
  res.render("tambah-components/Users", {
    layout: "./layout/main",
    title: "Halaman Tambah User",
  });
});

// Handling ADD / TAMBAH user
router.post("/add", verifyUser, async (req, res) => {
  const { nama, email, nomor_telepon, password, confirm, jenis_kelamin, alamat } = req.body;
  const getEmailName = await Users.findOne({ where: { [Op.or]: [{ email: email }, { nama: nama }] } });
  if (getEmailName) {
    confirmUI("Gagal tambah data", "Email / Nama sudah digunakan silahkan inputkan kembali", "users/add", res);
  } else {
    if (password != confirm) {
      confirmUI("Gagal tambah data", "Password tidak sama", "users/add", res);
    } else {
      const hash = await argon2.hash(password);
      const result = await Users.create({
        nama: nama,
        email: email,
        nomor_telepon: nomor_telepon,
        password: hash,
        jenis_kelamin: jenis_kelamin,
        alamat: alamat,
      });
      if (!result) {
        confirmUI("Terjadi Kesalahan", `${result}`, "users", res);
      } else {
        confirmUI("Berhasil tambah data", `Berhasil menambahkan data ${nama}`, "users", res);
      }
    }
  }
});

// DELETE Handling for USERS table
router.get("/delete/:id", verifyUser, async (req, res) => {
  const id = req.params.id;
  const result = await Users.destroy({ where: { nama: id } });
  if (result.length < 0) {
    res.json({ msg: "Data tidak ditemukan" });
  } else {
    confirmUI("Berhasil menghapus data", `Data user ${id} berhasil dihapus`, "users", res);
  }
});

// Render form EDIT Users
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

// Handling form EDIT Users
router.post("/edit", verifyUser, async (req, res) => {
  const { id, nama, email, nomor_telepon, password, jenis_kelamin, confirm, alamat } = req.body;
  const getEmailName = await Users.findOne({ where: { [Op.or]: [{ nama: nama }, { email: email }] } });
  if (getEmailName) {
    confirmUI("Gagal edit data", "Nama / Email sudah digunakan harap inputkan kembali.", "users", res);
  } else {
    if (password != confirm) {
      confirmUI("Gagal edit data", "Password tidak sama harap inputkan kembali.", "users", res);
    } else {
      const hash = await argon2.hash(password);
      const result = await Users.update(
        {
          nama: nama,
          email: email,
          nomor_telepon: nomor_telepon,
          password: hash,
          jenis_kelamin: jenis_kelamin,
          alamat: alamat,
        },
        {
          where: { id: id },
        }
      );
      if (!result) {
        res.json({ msg: "Terjadi kesalahan" });
      } else {
        confirmUI("Berhasil edit user", "Berhasil edit user", "users", res);
      }
    }
  }
});

// Handling fitur SEARCH
router.post("/search", async (req, res) => {
  const { search } = req.body;
  const result = await Users.findAll({
    where: {
      [Op.or]: [{ nama: { [Op.like]: `%${search}%` } }, { email: { [Op.like]: `%${search}%` } }, { nomor_telepon: { [Op.like]: `%${search}%` } }, { jenis_kelamin: { [Op.like]: `%${search}%` } }, { alamat: { [Op.like]: `%${search}%` } }],
    },
  });
  if (!result) {
    confirmUI("Halaman Data User", "Gagal menemukan data", "users", res);
  } else {
    res.render("dashboard/dashboard-users", {
      layout: "./layout/main",
      title: "Halaman Data Product",
      result,
    });
  }
});

module.exports = router;
