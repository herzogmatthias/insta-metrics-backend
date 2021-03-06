"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: DataTypes.STRING,
      followers: DataTypes.NUMBER,
      igId: DataTypes.STRING,
      cursor: DataTypes.STRING,
      posts: DataTypes.NUMBER,
      following: DataTypes.NUMBER,
      avgLikes: DataTypes.NUMBER,
      avgComments: DataTypes.NUMBER,
      avgEngagementRate: DataTypes.DECIMAL,
      avgPriceMin: DataTypes.DECIMAL,
      avgPriceMax: DataTypes.DECIMAL,
      isBot: DataTypes.BOOLEAN,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
