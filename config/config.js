  

module.exports = {
    "development": {
      "username": process.env.DBUSERNAME,
      "password": process.env.DBPASSWORD,
      "database": "apt_on_ice_db",
      "host": process.env.DBENDPOINT,
      "dialect": "mysql"
    },
    "test": {
      "username": process.env.DBUSERNAME,
      "password": process.env.DBPASSWORD,
      "database": "apt_on_ice_db",
      "host": process.env.DBENDPOINT,
      "dialect": "mysql"
    },
    "production": {
      "username": process.env.DBUSERNAME,
      "password": process.env.DBPASSWORD,
      "database": "apt_on_ice_db",
      "host": process.env.DBENDPOINT,
      "dialect": "mysql"
    }
  }