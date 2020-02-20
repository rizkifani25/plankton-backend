const mongoose = require("mongoose");
const userModel = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
exports.loginUser = async (req, res) => {
  const phone = req.query.phone;
  const password = req.query.password;

  const query = {
    user_phone: phone
  };

  await userModel
    .findOne(query, { __v: 0 })
    .exec()
    .then(async data => {
      const isValidPass = await bcrypt.compare(password, data.user_password);
      if (!isValidPass) {
        res.status(400).json({
          message: "Password salah."
        });
      } else {
        const token = jwt.sign(
          { _id: data._id, phone: data.user_phone },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "1h" }
        );

        res.status(200).send({
          auth_token: token
        });
      }
    })
    .catch(err => {
      res.status(400).send({
        message: "Nomor telfon atau password tidak valid."
      });
    });
};

// REGISTER
exports.registerUser = async (req, res) => {
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

// ALL USER
exports.allUser = async (req, res) => {
  await userModel
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
