const db = require("../config/db");
const DataTypes = require("sequelize");

const users = db.define(
  "users",
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    freezeTableName: true,
  }
);

try {
  users.sync({});
  console.log("table database baru saja dibuat");
} catch (error) {
  console.log(error);
}

module.exports = users;
