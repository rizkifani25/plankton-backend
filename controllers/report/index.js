const mongoose = require("mongoose");
const reportSchema = require("../../models/report");

exports.uploadReport = async (req, res) => {
  const {
    image_url,
    user,
    alproType,
    detail,
    description,
    latitude,
    longitude,
    datel,
    witel
  } = req.query;

  const newReport = new reportSchema({
    _id: `PL${new mongoose.Types.ObjectId()}`,
    user_phone: user.user_phone,
    image_path: image_url,
    detail: detail,
    description: description,
    alproType: {
      alpro_name_code: alproType.alpro_name_code,
      alpro_name: alproType.alpro_name,
      alpro_code: alproType.alpro_code,
      icon_path: alproType.icon_path
    },
    location: {
      latitude: latitude,
      longitude: longitude,
      witel: witel,
      datel: datel
    }
  });

  newReport
    .save()
    .then(response => {
      res.status(201).send({
        message: "Report telah dibuat.",
        post_id: newReport._id
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Report gagal dibuat."
      });
    });
};

exports.getReport = async (req, res) => {
  const reportId = req.query._id;

  const query = {
    _id: reportId
  };

  reportSchema
    .find(query)
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Kesalahan server."
      });
    });
};

exports.getAllReports = async (req, res) => {
  const query = {};
  reportSchema
    .find({})
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Kesalahan server."
      });
    });
};
