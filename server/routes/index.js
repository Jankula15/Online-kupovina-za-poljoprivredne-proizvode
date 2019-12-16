const express = require("express");
const path = require("path");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const User = require("../models/User");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.send({ user: req.user })
);

/* router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.find({
    email,
    password
  });
}); */

module.exports = router;
