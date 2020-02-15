const mongoose = require("mongoose");
const userModel = require("../models/user_model");

exports.register_user = (req, res) => {
  let username = req.query.username,
    password = req.query.pass,
    phone = req.query.phone,
    level = req.query.level;

  let query = {
    user_name: username,
    user_level: level
  };

  userModel
    .find(query)
    .exec()
    .then(data => {
      if (data.length == 1) {
        res.status(409).json({
          message: "Username already existasddsadas"
        });
      } else {
        let newUser = new userModel({
          _id: new mongoose.Types.ObjectId(),
          user_name: username,
          user_password: password,
          user_phone: phone,
          user_level: level
        });

        newUser.save().then(response => {
          res.status(201).json({
            message: "Success",
            data: response
          });
        });
      }
    })
    .catch(err => {
      res.send({
        message: err
      });
    });
};

exports.login_user = (req, res) => {
  let username = req.query.username,
    password = req.query.pass;
  phone = req.query.phone;

  let query = {
    user_name: username,
    user_password: password
  };
  userModel
    .find(query)
    .exec()
    .then(data => {
      if (data.length == 1) {
        res.status(200).json({
          message: "Login Success"
        });
      } else {
        res.status(401).json({
          status: "ERR",
          message: "Invalid username or password"
        });
      }
    })
    .catch(err => {
      res.send({
        message: err
      });
    });
};

exports.all_user = (req, res) => {
  userModel
    .find({}, { _id: 0, __v: 0, user_password: 0 })
    .exec()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
