"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserProfile, {
        as: "profile",
        foreignKey: "userId",
      });

      User.hasMany(models.Busines, {
        as: "busines",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      isActive: DataTypes.BOOLEAN,
      role: DataTypes.ENUM("user", "admin"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
