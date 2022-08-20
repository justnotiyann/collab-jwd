const db = require("../config/db");
const DataTypes = require("sequelize");

const products = db.define(
  "products",
  {
    judul_buku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    penulis: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING,
    },
    penerbit: {
      type: DataTypes.STRING,
    },
    harga: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

products.sync({});

module.exports = products;
