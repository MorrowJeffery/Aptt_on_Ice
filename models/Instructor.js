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
    },
    instructorType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
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
