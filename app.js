const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// main
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user/users");
const registerRouter = require("./routes/user/register");
const loginRouter = require("./routes/user/login");
const authLoginRouter = require("./routes/user/auth");

// alpro
const alprosRouter = require("./routes/alpro");
const alprosDescRouter = require("./routes/alpro-desc");

// list odp
const odpRouter = require("./routes/odp");

// report
const reportRouter = require("./routes/report/createReport");

const app = express();

app.use(
  cors({
    origin: "*"
  })
);

const endpoint = require("./services/endpoint");

require("dotenv").config();
// "mongodb+srv://dbPlankton:_plankton%40telkom@planktondb-jb15t.mongodb.net/dbPlankton"
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USERNAME +
      ":" +
      process.env.DB_PASSWORD +
      "@planktondb-jb15t.mongodb.net/" +
      process.env.DB_NAME,
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
app.use(endpoint.GET_USER_LOGIN, authLoginRouter);

// allpro
app.use(endpoint.ALPROS_ICON, alprosRouter);
app.use(endpoint.ALPRO_DESC, alprosDescRouter);

// odp
app.use(endpoint.LIST_ODP, odpRouter);

//Report
app.use(endpoint.CREATE_REPORT, reportRouter);

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
