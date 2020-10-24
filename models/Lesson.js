const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const Lesson = sequelize.define("Lesson", {
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
  })

  Lesson.associate = function(models) {
    Lesson.belongsTo(models.User), {
      foreignKey: {
        name: "userID",
        allowNull: false
      }
    }
    Lesson.belongsTo(models.Instructor), {
      foreignKey: {
        name: "instructorID",
        allowNull: false
      }
    }
  }

  return Lesson;
}