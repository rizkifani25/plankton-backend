const mongoose = require("mongoose");
const catIconsModel = require("../../models/alpro/cat_icons_model");

exports.alpro_icons = (req, res) => {
  catIconsModel
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
