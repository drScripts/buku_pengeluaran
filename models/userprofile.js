'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserProfile.init({
    userId: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    profile: DataTypes.TEXT,
    profession: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};