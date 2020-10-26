const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const db = require("../../models");


// @desc Register user
// @access Public
router.post("/instructor/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  db.Instructor.findOne({where:{ email: req.body.email }}).then(instructor => {
    if (instructor) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newInstructor = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        instructorType: req.body.instructorType,
        phoneNumber: req.body.phoneNumber
      };
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newInstructor.password, salt, (err, hash) => {
          if (err) throw err;
          newInstructor.password = hash;
          db.Instructor.create({
            name: newInstructor.name,
            email: newInstructor.email,
            password: newInstructor.password,
            address: newInstructor.address,
            city: newInstructor.city,
            state: newInstructor.state,
            instructorType: newInstructor.instructorType,
            phoneNumber: newInstructor.phoneNumber
          })
            .then(instructor => res.json(instructor))
            .catch(err => res.json(err));
        });
      });
    }
  }).catch(err => {
    return res.json(err);
  })
});

// @desc Login user and return JWT token
// @access Public
router.post("/instructor/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  db.Instructor.findOne({ where: { email: req.body.email } }).then(instructor => {
    // Check if user exists
    if (!instructor) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: instructor.id,
          name: instructor.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
