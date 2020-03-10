const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
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
const getAllReportRouter = require("./routes/report/all-report");
const getReportRouter = require("./routes/report/get-report");
const getUserReportRouter = require("./routes/report/get-user-report");
const createReportRouter = require("./routes/report/create-report");
const updateReportRouter = require("./routes/report/update-report");
const filterReportRouter = require("./routes/report/filter-report");
const getStatusListRouter = require("./routes/report/get-status-list");

//witel
const getByWitelReportRouter = require("./routes/report/get-witel-report");
const getByDatelReportRouter = require("./routes/report/get-datel-report");
const getAllWitelRouter = require("./routes/witel");

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
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(console.log("DB connected"))
  .catch(err => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// main
app.use(endpoint.HOME, indexRouter);
app.use(endpoint.USERS, usersRouter);
app.use(endpoint.REGISTER_V1, registerRouter);
app.use(endpoint.LOGIN, loginRouter);
app.use(endpoint.GET_USER_LOGIN, authLoginRouter);

//report
app.use(endpoint.LIST_ALL_REPORT, getAllReportRouter);
app.use(endpoint.GET_REPORT, getReportRouter);
app.use(endpoint.CREATE_NEW_REPORT, createReportRouter);
app.use(endpoint.GET_USER_REPORT, getUserReportRouter);
app.use(endpoint.FILTER_REPORT, filterReportRouter);
app.use(endpoint.GET_STATUSLIST, getStatusListRouter);
app.use(endpoint.UPDATE_REPORT, updateReportRouter);

app.use(endpoint.WITEL, getByWitelReportRouter);
app.use(endpoint.DATEL, getByDatelReportRouter);
app.use(endpoint.GET_ALL_WITEL, getAllWitelRouter);

// allpro
app.use(endpoint.ALPROS_ICON, alprosRouter);
app.use(endpoint.ALPROS_DESC, alprosDescRouter);

// odp
app.use(endpoint.LIST_ODP, odpRouter);

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
  res.json({});
});

module.exports = app;
