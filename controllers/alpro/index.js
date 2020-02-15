const alprosModel = require("../../models/alpro");

exports.alpros = (req, res) => {
  alprosModel
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
