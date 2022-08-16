const db = require("../config/db");
const DataTypes = require("sequelize");

const users = db.define(
  "users",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamp: false,
  }
);

try {
  users.sync({});
  // console.log("table database baru saja dibuat");
} catch (error) {
  // console.log(error);
}

module.exports = users;
