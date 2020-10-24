const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const passport = require("passport");
require('dotenv').config();

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require('./models');

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

db.sequelize.sync( ).then(() => {
  app.listen(port, () => console.log(`Server up and running on port ${port} !`));
})