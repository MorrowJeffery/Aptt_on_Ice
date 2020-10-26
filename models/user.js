const bcrypt = require("bcryptjs");
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allownull: false
    },
    city: {
      type: DataTypes.STRING,
      allownull: false
    },
    state: {
      type: DataTypes.STRING,
      allownull: false
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Lesson)
}

  return User;
}