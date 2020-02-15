const mongoose = require("mongoose");
const catODCModel = require("../../models/alpro/cat_odc_model");

exports.alpro_odc = (req, res) => {
  catODCModel
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
