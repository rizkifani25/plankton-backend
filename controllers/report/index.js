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

exports.updateReport = async (req, res) => {
  const { status, _id } = req.query;
  const updatedStatus = utilStatus.findStatus(parseInt(status));
  const query = {
    _id: _id
  };
  const update = {
    status: updatedStatus.code
  };
  reportSchema
    .findOneAndUpdate(query, update)
    .then(response => {
      res.status(200).send({
        message: "Berhasil memperbarui status laporan."
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Gagal memperbarui status laporan."
      });
    });
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

  const status = utilStatus.findStatus(100).code;

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

exports.getAllReports = async (req, res) => {
  const query = {};
  reportSchema
    .find(query, { __v: 0 })
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

exports.getReportByUser = async (req, res) => {
  const { user_phone } = req.query;

  const query = {
    user_phone: user_phone
  };

  reportSchema
    .find(query, { __v: 0 })
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

exports.filterReport = async (req, res) => {
  const { witel, datel, alpro_name, description, status } = req.query;
  const filteredStatus = utilStatus.findStatus(status);
  let query;
  if (
    witel != null &&
    datel == null &&
    alpro_name == null &&
    description == null &&
    status == null
  ) {
    query = { "location.witel": witel };
  } else if (
    witel == null &&
    datel != null &&
    alpro_name == null &&
    description == null &&
    status == null
  ) {
    query = { "location.datel": datel };
  } else if (
    witel == null &&
    datel == null &&
    alpro_name != null &&
    description == null &&
    status == null
  ) {
    query = { "alproType.alpro_name": alpro_name };
  } else if (
    witel == null &&
    datel == null &&
    alpro_name == null &&
    description != null &&
    status == null
  ) {
    query = { description: description };
  } else if (
    witel == null &&
    datel == null &&
    alpro_name == null &&
    description == null &&
    status != null
  ) {
    query = { status: filteredStatus.code };
  } else if (
    witel != null &&
    datel != null &&
    alpro_name != null &&
    description != null &&
    status != null
  ) {
    query = {
      "location.witel": witel,
      "location.datel": datel,
      "alproType.alpro_name": alpro_name,
      description: description,
      "status.label": status
    };
  } else {
    query = {};
  }

  reportSchema
    .find(query, { __v: 0 })
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
