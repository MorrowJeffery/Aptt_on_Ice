const { v4: uuidv4 } = require("uuid");
var db = require("../models");
var passport = require("../config/passport");

async function viewAllReservations(db) {
  let results;
  try {
    results = await db.reservations.findAll({
      include: [
        {
          model: db.users
        },
        {
          model: db.users,
          as: "instructor"
        }
      ]
    });
  } catch (err) {
    console.log("Something went sideways", err);
  }

  let values = [];
  results.forEach(res => {
    values.push({
      id: res.id,
      start: res.start_Time,
      end: res.end_Time,
      instructor: res.instructor.first_name + " " + res.instructor.last_name,
      customer: res.user.first_name + " " + res.user.last_name,
      email: res.user.email,
      status: res.status,
      reservation_number: res.session_ID
    });
  });

  return values;
}
async function viewAllUserReservations(db, req) {
  let results;
  try {
    results = await db.reservations.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: db.users
        },
        {
          model: db.users,
          as: "instructor"
        }
      ]
    });
  } catch (err) {
    console.log("Something went sideways", err);
  }

  let values = [];
  results.forEach(res => {
    values.push({
      id: res.id,
      start: res.start_Time,
      end: res.end_Time,
      instructor: res.instructor.first_name + " " + res.instructor.last_name,
      customer: res.user.first_name + " " + res.user.last_name,
      email: res.user.email,
      status: res.status,
      reservation_number: res.session_ID
    });
  });

  return values;
}
async function createTimeSlot(db, req) {
  let { Start_Time, End_Time, Id } = req;
  let sesh_id = uuidv4();
  db.reservations.create({
    start_Time: Start_Time,
    end_Time: End_Time,
    instructorId: Id,
    session_ID: sesh_id
  });
}

module.exports = function(app) {
  // route for logging in a user
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
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
