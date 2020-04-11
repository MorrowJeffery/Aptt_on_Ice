module.exports = function(sequelize, DataTypes) {
  var reservations = sequelize.define("reservations", {
    start_Time: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
      validate: {
        isDate: true
      }
    },
    end_Time: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
      validate: {
        isDate: true
      }
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Open"
    },
    session_ID: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  reservations.associate = function(models) {
    reservations.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
    reservations.belongsTo(models.users, {
      as: "instructor",
      foreignKey: "id"
    });
  };

  return reservations;
};
