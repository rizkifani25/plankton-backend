const userModel = require("../../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

        // const refreshToken = jwt.sign(
        //   { _id: data._id, phone: data.user_phone },
        //   process.env.TOKEN_SECRET_KEY_V2,
        //   { expiresIn: "5m" }
        // );
        // refresh_token: refreshToken

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
