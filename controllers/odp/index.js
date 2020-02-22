const odpModel = require("../../models/odp");

const FindClosestNode = (origin, points) => {
  let closestDistance = Infinity;
  let closestPoint;

  points.map(point => {
    const deltaX = Math.pow(
      parseFloat(origin.latitude) - parseFloat(point.LATITUDE),
      2
    );
    const deltaY = Math.pow(
      parseFloat(origin.longitude) - parseFloat(point.LONGITUDE),
      2
    );
    const jarak = Math.sqrt(deltaX + deltaY);
    if (jarak < closestDistance) {
      closestDistance = jarak;
      closestPoint = point;
    }
  });

  return { closestPoint, closestDistance };
};

exports.closestODP = (req, res) => {
  const { latitude, longitude } = req.query;

  odpModel
    .find({
      LATITUDE: { $lt: latitude },
      LONGITUDE: { $lt: longitude }
    })
    .sort({ LATITUDE: -1, LONGITUDE: -1 })
    .limit(200)
    .exec()
    .then(closestLess => {
      odpModel
        .find({
          LATITUDE: { $gt: latitude },
          LONGITUDE: { $gt: longitude }
        })
        .sort({ LATITUDE: 1, LONGITUDE: 1 })
        .limit(200)
        .exec()
        .then(closestMore => {
          const less = FindClosestNode(req.query, closestLess);
          const more = FindClosestNode(req.query, closestMore);

          if (less.closestDistance < more.closestDistance) {
            res.status(200).send({ data: less.closestPoint });
          } else {
            res.status(200).send({ data: more.closestPoint });
          }
        });
    })
    .catch(err => {
      res.send({
        message: err
      });
    });
};

exports.getODPByWitel = async (req, res) => {
  odpModel
    .find()
    .distinct("WITEL")
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    });
};

exports.getODPByDatel = async (req, res) => {
  let query;
  req.query.witel == null
    ? (query = {})
    : (query = {
        WITEL: req.query.witel
      });
  odpModel
    .find(query, { _id: 0 })
    .distinct("DATEL")
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    });
};
