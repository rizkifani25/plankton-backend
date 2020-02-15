const mongoose = require("mongoose");
const { alprosModel, alproDescModel } = require("../../models/alpro");

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
