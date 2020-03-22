const mongoose = require("mongoose");
const odpModelNew = require("../../models/odp/newOdp");
const odpModel = require("../../models/odp");

const convertNumberFormat = (number) =>{
  return parseFloat(number.toString().replace(',','.'))
}

exports.closestODP = (req, res) => {
  const { latitude, longitude, all = false } = req.query;
  let limit = 1
  if(all){
    limit = 10
  }

  if (latitude && longitude) {
    odpModelNew
      .aggregate()
      .near({
        near: [parseFloat(longitude), parseFloat(latitude)],
        maxDistance: 50,
        spherical: true,
        distanceField: "dist.calculated"
      })
      .limit(limit)
      .then(data => {
        let responseData = data[0]
        if(all){
          responseData = data
        }
        res.send({
          message: "near",
          data: responseData
        });
      });
    return;
  }
};

exports.addNewODP = (req, res) => {
  let {
    odpName,
    longitude,
    latitude,
    regional,
    witel,
    datel,
    sto
  } = req.query;

  longitude = convertNumberFormat(longitude)
  latitude = convertNumberFormat(latitude)

  const newODP = odpModelNew({
    _id: new mongoose.Types.ObjectId(),
    ODP_NAME: odpName,
    geometry: {
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
      console.log(err)
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
