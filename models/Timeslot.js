const bcrypt = require("bcryptjs");
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Timeslot = sequelize.define("Timeslot", {
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

    Timeslot.associate = function (models) {
        Timeslot.belongsTo(models.Instructor), {
            foreignKey: {
                name: "instructorID",
                allowNull: false
            }
        }
    }

    return Timeslot;
}