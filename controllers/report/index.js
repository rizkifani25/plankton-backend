const mongoose = require("mongoose");
const reportSchema = require("../../models/report");
const objects = require("../../services/sanitizedata");
const utilStatus = require("./status");

mongoose.set("useFindAndModify", false);

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
    user_name: user.user_name,
    image_path: image_url,
    detail: detail,
    description: description,
    alproType: {
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
      res.status(400).send({
        message: "Report gagal dibuat."
      });
    });
};

exports.getReport = async (req, res) => {
  const report_id = req.query._id;
  const { user_phone, limit = 10, page = 1 } = req.query;

  if (report_id) {
    const query = {
      _id: report_id
    };
    reportSchema
      .findOne(query)
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
  } else if (user_phone) {
    const query = {
      user_phone
    };
    reportSchema
      .find(query, { user_phone: 0, user_name: 0, image_path: 0, location: 0 })
      .skip(limit * (page - 1))
      .limit(limit)
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
  }
};

exports.filterReport = async (req, res) => {
  let queryRequest = objects.sanitizeData(req.query);
  const {
    witel,
    datel,
    type,
    description,
    status,
    limit = 10,
    page = 1
  } = queryRequest;

  let query = {};

  if (witel) query["location.witel"] = witel;
  if (datel) query["location.datel"] = datel;
  if (type) query["alproType.alpro_name"] = type;
  if (description) query.description = description;
  if (status) query["status.code"] = status;

  reportSchema
    .find(query, { __v: 0 })
    .skip(limit * (page - 1))
    .limit(limit + 1)
    .exec()
    .then(response => {
      if (response.length > limit) {
        res.status(200).send({
          data: response.slice(0, -1),
          hasNextPage: true
        });
        return;
      }
      res.status(200).send({
        data: response,
        hasNextPage: false
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Kesalahan server."
      });
    });
};
