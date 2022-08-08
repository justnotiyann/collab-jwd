const Sequelize = require("sequelize");

const db = new Sequelize("toko_buku", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  db.authenticate();
  console.log("Koneksi database berhasil");
} catch (error) {
  console.log(error);
}

module.exports = db;
