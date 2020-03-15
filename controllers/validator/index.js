const utilStatus = require("./status");
const reportSchema = require("../../models/report");

// GET ALL REPORTS
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

// UPDATE STATUS REPORT
exports.updateReport = async (req, res) => {
  const { status, _id } = req.query;
  const updatedStatus = utilStatus.findStatus(parseInt(status));
  const query = {
    _id: _id
  };
  const update = {
    status: updatedStatus
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
