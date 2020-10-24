const bcrypt = require("bcryptjs");
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const Instructor = sequelize.define("Instructor", {
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
    }
  })
  Instructor.associate = function(models) {
      Instructor.hasMany(models.Timeslot)
      Instructor.hasMany(models.Lesson)
  }

  return Instructor;
}
