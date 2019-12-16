const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Passport Config
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").MongoURI;

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connnected..."))
  .catch(err => console.log());

app.use(bodyParser.json());
app.use(cors());
app.use(expressLayout);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express seasion
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//ROUTES
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server starded on port ${PORT}`));
