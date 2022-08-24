const db = require("../config/db");
const DataTypes = require("sequelize");

const transaksi = db.define(
  "transaksi",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_telepon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judul_buku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sistem_pembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: "false",
  }
);

transaksi.sync({});

module.exports = transaksi;
