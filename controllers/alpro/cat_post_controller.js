const mongoose = require("mongoose");
const catPostModel = require("../../models/alpro/cat_post_model");

exports.alpro_post = (req, res) => {
  catPostModel
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
