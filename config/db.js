const Sequelize = require("sequelize");

let database = "sql6514820";
let user = "sql6514820";
let password = "S81LSiHxqX";
let host = "sql6.freemysqlhosting.net";

const db = new Sequelize(database, user, password, {
  host: host,
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
