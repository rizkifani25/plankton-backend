const alprosModel = require("../../models/alpro");
const alproDescModel = require("../../models/alpro-desc");

exports.alpros = (req, res) => {
  alprosModel
    .find({})
    .exec()
    .then(data => {
      res.status(200).send({
        data: data
      });
    })
    .catch(err => {
      res.send({
        message: err
      });
    });
};

exports.alproDesc = (req, res) => {
  alproDescModel
    .find({})
    .exec()
    .then(data => {
      res.status(200).send({
        data: data
      });
    })
    .catch(err => {
      res.send({
        message: err
      });
    });
};
