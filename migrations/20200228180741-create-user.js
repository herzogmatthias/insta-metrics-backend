"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userName: {
        type: Sequelize.STRING,
      },
      followers: {
        type: Sequelize.INTEGER,
      },
      posts: {
        type: Sequelize.INTEGER,
      },
      following: {
        type: Sequelize.INTEGER,
      },
      avgLikes: {
        type: Sequelize.INTEGER,
      },
      avgComments: {
        type: Sequelize.INTEGER,
      },
      igId: {
        type: Sequelize.STRING,
      },
      isBot: {
        type: Sequelize.BOOLEAN,
      },
      cursor: {
        type: Sequelize.STRING,
      },
      avgEngagementRate: {
        type: Sequelize.DECIMAL(10, 2),
      },
      avgPriceMin: {
        type: Sequelize.DECIMAL(10, 2),
      },
      avgPriceMax: {
        type: Sequelize.DECIMAL(10, 2),
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  },
};
