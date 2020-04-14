var db = require("../models");
var passport = require("../config/passport");
var Jeeves = require("./reservation");

module.exports = function(app) {
  // route for logging in a user
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
      first_name:req.body.first_name,
      last_name: req.body.last_name
    });
  });

  // Route for signing up a user.
  app.post("/api/signup", function(req, res) {
    db.users
      .create({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      })
      .then(function() {
        res.redirect(307, "/api/login");
        res.render("login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      console.log("this");
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json(
        {
        email: req.user.email,
        id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name
      });
      //  data = viewAllReservations();

      const values = viewAllUserReservations(db, req);
      values.then(data => {
        console.table(data);
        res.json(data);
      });

      //   {
      //   email: req.user.email,
      //   id: req.user.id
      // }
    }
  });
};
