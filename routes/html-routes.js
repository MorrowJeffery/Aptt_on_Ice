// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var viewAllReservations = require("./api-routes")
    // Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const moment = require("moment")

module.exports = function(app) {
    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            // res.redirect("/index");
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

    app.get("/caltest", function(req, res) {
        const reservations = [{
                id: 01,
                start: "2020-04-13 09:30:47",
                end: "2020-04-13 10:00:47",
                instructor: "john wick",
                customer: "hello kitty",
                email: "blah@so.com",
                status: "unreserved",
                reservation_number: 01
            },
            {
                id: 02,
                start: "2020-04-17 08:00:00",
                end: "2020-04-17 09:11:47",
                instructor: "john doe",
                customer: "hello kitty",
                email: "blah@so.com",
                status: "unreserved",
                reservation_number: 06
            },
            {
                id: 03,
                start: "2020-04-16 09:11:47",
                end: "2020-04-16 09:31:47",
                instructor: "jerry mcguire",
                customer: "hello kitty",
                email: "blah@so.com",
                status: "hockey appointment with so and so",
                reservation_number: 05
            }
        ]

        function trimDate(reservation) {
            reservation.start = reservation.start.substring(11, 16)
            reservation.end = reservation.end.substring(11, 16)
        }
        const week = {
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: []
        }
        reservations.forEach(reservation => {
            switch (moment(reservation.start).format('dddd')) {
                case "Sunday":
                    trimDate(reservation)
                    week.sunday.push(reservation)
                    break;
                case "Monday":
                    trimDate(reservation)
                    week.monday.push(reservation)
                    break;
                case "Tuesday":
                    trimDate(reservation)
                    reservation.tuesday = true
                    week.tuesday.push(reservation)
                    break;
                case "Wednesday":
                    reservation.wednesday = true
                    week.wednesday.push(reservation)
                    break;
                case "Thursday":
                    trimDate(reservation)
                    reservation.thursday = true
                    week.thursday.push(reservation)
                    break;
                case "Friday":
                    trimDate(reservation)
                    reservation.friday = true
                    week.friday.push(reservation)
                    break;
                case "Saturday":
                    trimDate(reservation)
                    week.saturday.push(reservation)
                    break;

            }

        })
        console.log(week)
        res.render("caltest", week)


    })

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function(req, res) {
        res.render("members", req.user);
    });

    // Calendar route
    app.get("/calendar", isAuthenticated, function(req, res) {
        res.render("calendar", req.user);
    });
};