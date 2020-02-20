const odpModel = require("../../models/odp");

const FindClosestNode = (origin, points) => {
  let closestDistance = Infinity;
  let closestPoint;

  points.map(point => {
    const deltaX = Math.pow(
      parseFloat(origin.LATITUDE) - parseFloat(point.LATITUDE),
      2
    );
    const deltaY = Math.pow(
      parseFloat(origin.LONGITUDE) - parseFloat(point.LONGITUDE),
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
  const query = { LATITUDE: "-6,9984", LONGITUDE: "107,1410" };

  odpModel
    .find({
      LATITUDE: { $lt: query.LATITUDE },
      LONGITUDE: { $lt: query.LONGITUDE }
    })
    .sort({ LATITUDE: -1, LONGITUDE: -1 })
    .limit(1000)
    .exec()
    .then(closestLess => {
      odpModel
        .find({
          LATITUDE: { $gt: query.LATITUDE },
          LONGITUDE: { $gt: query.LONGITUDE }
        })
        .sort({ LATITUDE: 1, LONGITUDE: 1 })
        .limit(1000)
        .exec()
        .then(closestMore => {
          const less = FindClosestNode(query, closestLess);
          const more = FindClosestNode(query, closestMore);

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
    .find(query)
    .distinct("DATEL")
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    });
};
