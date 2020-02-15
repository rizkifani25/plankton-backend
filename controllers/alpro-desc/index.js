const alproDescModel = require("../../models/alpro-desc");

exports.alproDesc = (req, res) => {
  alproDescModel
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
