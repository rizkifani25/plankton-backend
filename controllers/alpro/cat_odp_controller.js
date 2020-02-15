const mongoose = require("mongoose");
const catODPModel = require("../../models/alpro/cat_odp_model");

exports.alpro_odp = (req, res) => {
  catODPModel
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
