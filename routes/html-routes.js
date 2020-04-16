// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var Jeeves = require("../routes/Jeeves");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("login");
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("signup");
  });
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("login");
  });
  app.get("/members", isAuthenticated, function(req, res) {
    let Reservations = Jeeves.viewAllUserReservations(db, req);
    Reservations.then((data) => {
      res.render("members", { data });
      // console.log(Reservations);
    });
    app.get("/make-reservation", isAuthenticated, function(req, res) {
      let Reservations = Jeeves.viewAllReservations(db);
      Reservations.then((data) => {
        res.render("calendar", { data });
      });
    });
  });
};
