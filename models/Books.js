const db = require("../config/db");
const DataTypes = require("sequelize");

const books = db.define(
  "books",
  {
    // Model attributes are defined here
    book_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    freezeTableName: true,
  }
);

try {
  books.sync({});
  console.log("table database baru saja dibuat");
} catch (error) {
  console.log(error);
}

module.exports = books;
