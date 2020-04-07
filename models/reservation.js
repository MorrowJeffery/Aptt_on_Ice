

module.exports = function(sequelize, DataTypes) {
    var Reservation = sequelize.define("reservation", {
       start_Time : {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
        validate: {
            isDate: true,   
        }
      },
      end_Time : {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
        validate: {
            isDate: true,   
        }
      },
      instructor_ID: {
        type: DataTypes.INTEGER,
        allowNull:false,
     },
      customer_ID: {
        type: DataTypes.INTEGER,
        allowNull:true,
      },
        status: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      session_ID: {
          type: DataTypes.STRING,
          allowNull: true
      },
      
    });

    return Reservation;
  };
  