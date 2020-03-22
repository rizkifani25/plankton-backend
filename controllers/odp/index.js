const mongoose = require("mongoose");
const odpModelNew = require("../../models/odp/newOdp");
const odpModel = require("../../models/odp");

exports.closestODP = (req, res) => {
  const { latitude, longitude } = req.query;

  if (latitude && longitude) {
    odpModelNew
      .aggregate()
      .near({
        near: [parseFloat(longitude), parseFloat(latitude)],
        maxDistance: 50,
        spherical: true,
        distanceField: "dist.calculated"
      })
      .limit(1)
      .then(data => {
        res.send({
          message: "near",
          data: data[0]
        });
      });
    return;
  }
};

exports.addNewODP = (req, res) => {
  const {
    odpName,
    longitude,
    latitude,
    regional,
    witel,
    datel,
    sto
  } = req.query;

  const newODP = odpModelNew({
    _id: new mongoose.Schema.Types.ObjectId(),
    ODP_NAME: odpName,
    geometry: {
      _id: new mongoose.Schema.Types.ObjectId(),
      type: "point",
      coordinates: [longitude, latitude]
    },
    REGIONAL: regional,
    WITEL: witel,
    DATEL: datel,
    STO: sto
  });

  newODP
    .save()
    .then(response => {
      res.status(201).send({
        message: "Berhasil menambahkan ODP baru.",
        odp_id: newODP._id
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Gagal menambahkan ODP baru."
      });
    });
};

exports.checkODP = (req, res) => {
  const { odpName } = req.query;

  let query = {
    ODP_NAME: odpName
  };

  odpModel
    .find(query, { _id: 0 })
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    })
    .catch(response => {
      res.send({
        data: response
      });
    });
};
