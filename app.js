const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// main
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user/users");
const registerRouter = require("./routes/user/register");
const loginRouter = require("./routes/user/login");

// alpro icons
const alproIconsRouter = require("./routes/alpro/list_alpro_icons");

// categories alpro
const alproCatCableRouter = require("./routes/alpro/list_alpro_cat_cable");
const alproCatODPRouter = require("./routes/alpro/list_alpro_cat_odp");
const alproCatODCRouter = require("./routes/alpro/list_alpro_cat_odc");
const alproCatPostRouter = require("./routes/alpro/list_alpro_cat_post");

const app = express();

const endpoint = require("./services/api/endpoint");
require("dotenv").config();

// "mongodb+srv://" +
//       process.env.DB_USERNAME +
//       ":" +
//       process.env.DB_PASSWORD +
//       "@planktondb-jb15t.mongodb.net/" +
//       process.env.DB_NAME

console.log(process.env.DB_NAME);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
mongoose
  .connect(
    "mongodb+srv://dbPlankton:_plankton%40telkom@planktondb-jb15t.mongodb.net/dbPlankton",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(console.log("DB connected"))
  .catch(err => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// main
app.use(endpoint.HOME, indexRouter);
app.use(endpoint.USERS, usersRouter);
app.use(endpoint.REGISTER_V1, registerRouter);
app.use(endpoint.LOGIN, loginRouter);

// assets
app.use(endpoint.LIST_ALPRO_ICONS, alproIconsRouter);

// list alpro
app.use(endpoint.LIST_ALPRO_CABLE, alproCatCableRouter);
app.use(endpoint.LIST_ALPRO_ODC, alproCatODCRouter);
app.use(endpoint.LIST_ALPRO_ODP, alproCatODPRouter);
app.use(endpoint.LIST_ALPRO_POST, alproCatPostRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
