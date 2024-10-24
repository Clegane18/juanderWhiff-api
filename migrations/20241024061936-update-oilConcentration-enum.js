"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Perfumes", "oilConcentration", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_Perfumes_oilConcentration";`
    );

    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_Perfumes_oilConcentration" AS ENUM(
        'Extrait De Parfum',
        'Eau De Parfum',
        'Eau De Toilette',
        'Eau De Cologne'
      );`
    );

    await queryInterface.changeColumn("Perfumes", "oilConcentration", {
      type: Sequelize.ENUM(
        "Extrait De Parfum",
        "Eau De Parfum",
        "Eau De Toilette",
        "Eau De Cologne"
      ),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Perfumes", "oilConcentration", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_Perfumes_oilConcentration";`
    );

    await queryInterface.sequelize.query(
      `CREATE TYPE "enum_Perfumes_oilConcentration" AS ENUM(
        'Extrait',
        'Eau De Parfum',
        'Eau De Toilette',
        'Eau De Cologne'
      );`
    );

    await queryInterface.changeColumn("Perfumes", "oilConcentration", {
      type: Sequelize.ENUM(
        "Extrait",
        "Eau De Parfum",
        "Eau De Toilette",
        "Eau De Cologne"
      ),
      allowNull: false,
    });
  },
};
