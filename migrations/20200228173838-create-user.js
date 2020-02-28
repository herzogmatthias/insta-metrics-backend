"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      followers: {
        type: Sequelize.INTEGER
      },
      posts: {
        type: Sequelize.INTEGER
      },
      following: {
        type: Sequelize.INTEGER
      },
      avgLikes: {
        type: Sequelize.INTEGER
      },
      avgComments: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      avgEngagementRate: {
        type: Sequelize.DECIMAL
      },
      avgPriceMin: {
        type: Sequelize.DECIMAL
      },
      avgPriceMax: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
