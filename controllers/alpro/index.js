const alprosModel = require("../../models/alpro");
const alproDescModel = require("../../models/alpro-desc");
const base64 = require("../../services/base64");

exports.alpros = (req, res) => {
  alprosModel
    .find({})
    .exec()
    .then(data => {
      res.status(200).send(data);
      // data.map((index, i) => {
      //   let path = data[i]["icon_path"];
      //   let image_data = [];
      //   base64.convertToBase64(path, image => {
      //     image_data.push(image);
      //   });
      // });
      // res.status(200).send({
      //   result: data,
      //   icon: image_data
      // });
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
