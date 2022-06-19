"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Busines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Busines.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }
  Busines.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Busines",
    }
  );
  return Busines;
};
