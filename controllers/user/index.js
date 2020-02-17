const mongoose = require("mongoose");
const userModel = require("../../models/user");
const roleModel = require("../../models/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register_user = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const phone = req.query.phone;

  const query = {
    user_phone: phone,
    user_level: 1
  };

  await userModel
    .findOne(query)
    .exec()
    .then(async data => {
      if (data) {
        res.status(409).json({
          message: "Nomor telfon sudah digunakan."
        });
      } else {
        // Hashing password
        const saltedKey = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltedKey);

        const newUser = new userModel({
          _id: new mongoose.Types.ObjectId(),
          user_name: username,
          user_password: hashedPassword,
          user_phone: phone,
          user_level: 1
        });

        newUser
          .save()
          .then(response => {
            res.status(201).json({});
          })
          .catch(err => {
            res.send({
              message: "Kesalahan server. Gagal membuat user baru."
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

// LOGIN
exports.login_user = async (req, res) => {
  const phone = req.query.phone;
  const password = req.query.password;

  const query = {
    user_phone: phone
  };

  console.log(req.query);

  userModel
    .findOne(query, { _id: 0, __v: 0 })
    .exec()
    .then(async data => {
      const isValidPass = await bcrypt.compare(password, data.user_password);
      console.log(isValiedPass);
      if (!isValidPass) {
        res.status(400).json({
          message: "Password salah."
        });
      } else {
        let userLevel = data.user_level;
        let query = {
          user_level: userLevel
        };
        let result;
        roleModel
          .find(query, { _id: 0, user_level: 0 })
          .exec()
          .then(datas => {
            result = {
              user_data: data,
              authority: datas
            };
            res.status(200).send({
              data: result
            });
          })
          .catch(err => {
            res.send({
              message: "Kueri salah."
            });
          });
      }
    })
    .catch(err => {
      res.status(400).send({
<<<<<<< HEAD
        message: "Nomor telfon tidak valid."
=======
        message: "Nomor telfon atau password tidak valid."
>>>>>>> master
      });
    });
};

exports.all_user = (req, res) => {
  userModel
    .find({}, { _id: 0, __v: 0, user_password: 0 })
    .exec()
    .then(data => {
      res.send({
        data: data
      });
    })
    .catch(err => {
      res.send({
        message: err
      });
    });
};
