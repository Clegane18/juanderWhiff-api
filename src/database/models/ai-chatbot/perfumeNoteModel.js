const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Perfume = require("./perfumeModel");
const Note = require("./noteModel");

const PerfumeNote = sequelize.define(
  "PerfumeNote",
  {
    perfumeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfume,
        key: "id",
      },
      primaryKey: true,
    },
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Note,
        key: "id",
      },
      primaryKey: true,
    },
    noteType: {
      type: DataTypes.ENUM("Top", "Middle", "Base"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = PerfumeNote;
