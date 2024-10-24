const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Brand = require("./brandModel");

const Perfume = sequelize.define(
  "Perfume",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Brand,
        key: "id",
      },
    },
    originalPerfumeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Perfumes", // Circular reference; handled in associations
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("OG", "Local"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    smellDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    comparisonDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    similarityScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    oilConcentration: {
      type: DataTypes.ENUM(
        "Extrait De Parfum",
        "Eau De Parfum",
        "Eau De Toilette",
        "Eau De Cologne"
      ),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Perfume;
