// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var routeFunctions = require("./route-functions");
var db = require("../models");


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    
    res.render("members", {data}})
    // {userName: req.User.user_name}
  });

  //This route gives the user the page for booking an appointment
  //we will need to adjust this once we have made the handlebar adjustments
  app.get("/make-reservation", isAuthenticated, function(req,res) {
    res.render("calendar");
  });

  //route for showing any appointments currently booked
  app.get("/reservations", isAuthenticated, function(req,res) {
    res.render("reservations", viewAllReservations(db));
  })
