"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: DataTypes.STRING,
      followers: DataTypes.NUMBER,
      posts: DataTypes.NUMBER,
      following: DataTypes.NUMBER,
      avgLikes: DataTypes.NUMBER,
      avgComments: DataTypes.NUMBER,
      password: DataTypes.STRING,
      avgEngagementRate: DataTypes.DECIMAL,
      avgPriceMin: DataTypes.DECIMAL,
      avgPriceMax: DataTypes.DECIMAL
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
