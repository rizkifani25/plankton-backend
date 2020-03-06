const odpModel = require("../../models/odp");
const odpModelNew = require("../../models/odp/newOdp")

const convertNumberFormat = number => {
    return number.replace(/,/, ".");
};


exports.closestODP = (req, res) => {
    const {
        latitude,
        longitude
    } = req.query

    if (latitude && longitude) {
        odpModelNew.aggregate().near({
            near: [parseFloat(longitude), parseFloat(latitude)],
            maxDistance: 100,
            spherical: true,
            distanceField: "dist.calculated"
        }).limit(1).then(data => {
            res.send({
                message: "near",
                data: data[0]
            })
        })
        return
    }
};

// exports.GetNewOdp = (req, res) => {
//     const {
//         lat,
//         lng
//     } = req.query

//     if (lat && lng) {
//         odpModelNew.aggregate().near({
//             near: [parseFloat(lng), parseFloat(lat)],
//             maxDistance: 100,
//             spherical: true,
//             distanceField: "dist.calculated"
//         }).limit(1).then(data => {
//             res.send({
//                 message: "near",
//                 data: data[0]
//             })
//         })
//         return
//     }
//     odpModelNew.find({}).sort({
//         LATITUDE: -1
//     }).limit(10).exec().then(data => {
//         res.send({
//             data
//         })
//     })
// }

// exports.TestingOdp = (req, res) => {
//     const {
//         latitude,
//         longitude,
//         page = 1
//     } = req.query;
//     const limit = 50000

//     odpModel.find({}).skip((page - 1) * limit).limit(limit).exec().then(closestLess => {

//             console.log(closestLess.length)
//             let itemsAdded = 0
//             closestLess.map(node => {
//                 const {
//                     _id,
//                     ODP_NAME,
//                     LATITUDE,
//                     LONGITUDE,
//                     REGIONAL,
//                     WITEL,
//                     DATEL,
//                     STO
//                 } = node

//                 if (node.LATITUDE && node.LONGITUDE && node.LATITUDE.length !== 0 && node.LONGITUDE.length !== 0) {
//                     itemsAdded += 1
//                     const newOdpNew = new odpModelNew({
//                         _id,
//                         ODP_NAME,
//                         geometry: {
//                             type: "point",
//                             coordinates: [parseFloat(convertNumberFormat(LONGITUDE)), parseFloat(convertNumberFormat(LATITUDE))]
//                         },
//                         REGIONAL,
//                         WITEL,
//                         DATEL,
//                         STO
//                     })
//                     newOdpNew.save().catch(err => {})
//                 }
//             })

//             res.send({
//                 data: closestLess.length,
//                 page,
//                 itemsAdded
//             })

//         })
//         .catch(errr => {
//             console.log(errr)
//         })

// }

// const FindClosestNode = (origin, points) => {
//     let closestDistance = Infinity;
//     let closestPoint;

//     points.map(point => {
//         const deltaX = Math.pow(parseFloat(convertNumberFormat(origin.latitude)) - parseFloat(convertNumberFormat(point.LATITUDE)), 2);
//         const deltaY = Math.pow(parseFloat(convertNumberFormat(origin.longitude)) - parseFloat(convertNumberFormat(point.LONGITUDE)), 2);
//         const jarak = Math.sqrt(deltaX + deltaY);

//         if (jarak <= closestDistance) {
//             closestDistance = jarak;
//             closestPoint = point;
//         }
//     });

//     // console.log(closestPoint, closestDistance);

//     return {
//         closestPoint,
//         closestDistance
//     };
// };

exports.getODPByWitel = async (req, res) => {
    odpModel.find().distinct("WITEL").exec().then(response => {
        res.status(200).send({
            data: response
        });
    });
};

exports.getODPByDatel = async (req, res) => {
    let query;
    req.query.witel == null ? (query = {}) : (query = {
        WITEL: req.query.witel
    });
    odpModel.find(query, {
        _id: 0
    }).distinct("DATEL").exec().then(response => {
        res.status(200).send({
            data: response
        });
    });
};