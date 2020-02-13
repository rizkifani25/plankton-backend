const mongoose = require("mongoose");
const userModel = require("../models/user_model");

exports.register_user = (req, res) => {
  let username = req.query.username,
    phone = req.query.phone;

  let query = {
    reporter_name: username,
    reporter_phone: phone
  };

  userModel
    .find(query, { _id: 0 })
    .exec()
    .then(data => {
      if (data.length == 1) {
        res.status(409).json({
          message: "Username already exist"
        });
      } else {
        let newUser = new userModel({
          _id: new mongoose.Types.ObjectId(),
          reporter_name: username,
          reporter_phone: phone
        });

        newUser.save().then(response => {
          res.status(201).json({
            message: "Success",
            data: response
          });
        });
      }
    });
};

exports.all_user = (req, res) => {
  userModel
    .find({}, { _id: 0, __v: 0 })
    .exec()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};
