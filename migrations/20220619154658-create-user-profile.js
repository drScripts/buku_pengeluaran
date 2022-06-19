"use strict";
const { QueryInterface, DataTypes } = require("sequelize");
module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserProfiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: "Users",
          },
        },
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      profession: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserProfiles");
  },
};
