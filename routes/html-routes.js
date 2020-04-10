// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/index");
       res.render("members");
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members");
    }
    res.render("index");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members");
  });

  //This route gives the user the page for booking an appointment
  //we will need to adjust this once we have made the handlebar adjustments
  app.get("/scheduleAppoitment", isAuthenticated, function(req,res) {
    res.sendFile(path.join(__dirname, "../public/schedule.html"))
  });

  //route for showing any appointments currently booked
  app.get("/currentAppointments", isAuthenticated, function(req,res) {
    res.sendFile(path.join(__dirname, "../public/appointments.html"))
  })
};
