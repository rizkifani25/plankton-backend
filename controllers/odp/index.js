const odpModelNew = require("../../models/odp/newOdp");

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
