const mongoose = require("mongoose");
const reportSchema = require("../../models/report");
const objects = require("../../services/sanitizedata");
const utilStatus = require("./status");

const getCurrentDate = () => {
  let today = new Date();
  return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() +
    " "}${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
};

exports.uploadReport = async (req, res) => {
  const queryRequest = objects.sanitizeData(req.query);
  const {
    report_id,
    image_url,
    user,
    alproType,
    detail,
    description,
    datel,
    witel
  } = queryRequest;

  const date = getCurrentDate();

  const status = utilStatus.findStatus(100);

  const { latitude, longitude } = queryRequest.coords;

  const newReport = new reportSchema({
    _id: report_id,
    user_phone: user.user_phone,
    image_path: image_url,
    detail: detail,
    description,
    alproType: {
      alpro_name_code: alproType.alpro_name_code,
      alpro_name: alproType.alpro_name,
      alpro_code: alproType.alpro_code,
      icon_path: alproType.icon_path
    },
    location: {
      latitude,
      longitude,
      datel,
      witel
    },
    status,
    date
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
      console.log(err);
      res.status(400).send({
        message: "Report gagal dibuat."
      });
    });
};

exports.getReport = async (req, res) => {
  const report_id = req.query._id;

  const query = {
    _id: report_id
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
