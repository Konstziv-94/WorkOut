require("dotenv").config();


const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./collections/users");
const Blog = require("./collections/blog");
const Legs = require("./collections/legs");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoSanitize = require('express-mongo-sanitize');

const workout = require("./routes/workout");
const adminRouter = require("./routes/admin");


// "mongodb://localhost:27017/workdb"
// process.env.DB_URL

const dbUrl =  process.env.DB_URL || 'mongodb://localhost:27017/workdb';

const MongoStore = require("connect-mongo")(session)

// express
const app = express();
// ejs
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// body parser

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));




mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


const store = new MongoStore({
  url:dbUrl,
  secret:process.env.SENSION_SECRET,
  touchAfter: 24 * 60 * 60,
});

store.on("error",function(e){
  console.log('SENSSION ERROR!!!',e);
})

const sessionConfig = {
  store,
  name:"session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    //maxAge einai evdomada
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/workout",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { role: "user", username: profile.displayName, googleId: profile.id },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: "http://www.example.com/auth/facebook/myapp",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate(function (err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);

// FLASH
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//routes
app.use("", workout);
app.use("", adminRouter);

app.all("*", (req, res, next) => {
  throw new ExpressError("Page not found", 404);
});

app.use((err, req, res, next) => {
  const { statuCode = 500 } = err;
  if (!err.message) err.message = "Something went Wrong";
  res.status(statuCode).render("err", { err });
});

const port = "3000";


app.listen(port, () => {
  console.log(`Surver run on port ${port}` );
});
