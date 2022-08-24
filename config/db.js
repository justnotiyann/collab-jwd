const Sequelize = require("sequelize");

const db = new Sequelize("freedb_collab_jwd", "freedb_iyanxdev", "2!hcu5%8&GbqKj#", {
  host: "sql.freedb.tech",
  port: 3306,
  dialect: "mysql",
});

try {
  db.authenticate();
  console.log("Koneksi database berhasil");
} catch (error) {
  console.log(error.message);
}

module.exports = db;
