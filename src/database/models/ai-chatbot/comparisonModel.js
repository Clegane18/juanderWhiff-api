const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Perfume = require("./perfumeModel");

const Comparison = sequelize.define(
  "Comparison",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    perfumeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfume,
        key: "id",
      },
    },
    originalPerfumeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfume,
        key: "id",
      },
    },
    comparisonDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    similarityScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Comparison;
