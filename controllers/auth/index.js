const userModel = require("../../models/user");
const roleModel = require("../../models/role");
const jwt = require("jsonwebtoken");

exports.getUserLogin = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    res.status(401).send({
      message: "Akses ditolak."
    });
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const query = {
        user_phone: verified.phone
      };

      await userModel
        .findOne(query, { _id: 0, __v: 0 })
        .exec()
        .then(async data => {
          const userLevel = data.user_level;
          const query = {
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
        })
        .catch(err => {
          res.status(400).send({
            message: "Terjadi kesalahan."
          });
        });
    } catch (err) {
      res.status(400).send({
        message: "Token tidak valid."
      });
    }
  }
};
