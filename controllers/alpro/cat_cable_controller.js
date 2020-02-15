const mongoose = require("mongoose");
const catCableModel = require("../../models/alpro/cat_cable_model");

exports.alpro_cable = (req, res) => {
  catCableModel
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
