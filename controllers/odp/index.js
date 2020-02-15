const odpModel = require("../../models/odp");

exports.allODP = (req, res) => {
  odpModel
    .find({})
    .exec()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.send({
        message: err
      });
    });
};
