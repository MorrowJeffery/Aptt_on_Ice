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
      allowNull: false
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

  // reservations.prototype.viewAllreservations = async function(db) {
  //   let results;
  //   try {
  //     results = await reservations.findAll({
  //       include: [
  //         {
  //           model: db.users
  //         },
  //         {
  //           model: db.users,
  //           as: "instructor"
  //         }
  //       ]
  //     });
  //   } catch (err) {
  //     console.log("Something went sideways", err);
  //   }

  //   let values = [];
  //   results.forEach(res => {
  //     values.push({
  //       id: res.id,
  //       start: res.start_Time,
  //       end: res.end_Time,
  //       instructor: res.instructor.first_name + " " + res.instructor.last_name,
  //       customer: res.user.first_name + " " + res.user.last_name,
  //       email: res.user.email,
  //       status: res.status,
  //       reservation_number: res.session_ID
  //     });
  //   });

  //   return values;
  // };

  return reservations;
};
