const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Note = sequelize.define(
  "Note",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Note;
