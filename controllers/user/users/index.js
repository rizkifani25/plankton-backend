const userModel = require("../../../models/user");

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
