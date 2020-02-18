const mongoose = require("mongoose");
const userModel = require("../../../models/user");
const bcrypt = require("bcryptjs");

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
