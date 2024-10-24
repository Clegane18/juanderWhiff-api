const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Owner = sequelize.define(
  "Owner",
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
      validate: {
        notEmpty: true,
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["name", "bio"],
      },
    ],
  }
);

module.exports = Owner;
