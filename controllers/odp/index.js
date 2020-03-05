const odpModel = require("../../models/odp");

const convertNumberFormat = number => {
    return number.replace(/,/, ".");
};

const FindClosestNode = (origin, points) => {
    let closestDistance = Infinity;
    let closestPoint;

    points.map(point => {
        const deltaX = Math.pow(parseFloat(convertNumberFormat(origin.latitude)) - parseFloat(convertNumberFormat(point.LATITUDE)), 2);
        const deltaY = Math.pow(parseFloat(convertNumberFormat(origin.longitude)) - parseFloat(convertNumberFormat(point.LONGITUDE)), 2);
        const jarak = Math.sqrt(deltaX + deltaY);

        if (jarak <= closestDistance) {
            closestDistance = jarak;
            closestPoint = point;
        }
    });

    // console.log(closestPoint, closestDistance);

    return {
        closestPoint,
        closestDistance
    };
};

exports.closestODP = (req, res) => {
    const {
        latitude,
        longitude
    } = req.query;
    odpModel.findOne({
        LATITUDE: latitude,
        LONGITUDE: longitude
    }).exec().then(data => {
        if (data) {
            res.status(200).send({
                data
            });
            return;
        } else {

            odpModel.find({
                LATITUDE: {
                    $lte: latitude,
                    $exists: true,
                    $ne: ""
                },
                LONGITUDE: {
                    $lte: longitude,
                    $exists: true,
                    $ne: ""
                }
            }).sort({
                LATITUDE: -1,
                LONGITUDE: -1
            }).limit(100).exec().then(closestLess => {
                odpModel.find({
                    LATITUDE: {
                        $gte: latitude,
                        $exists: true,
                        $ne: ""
                    },
                    LONGITUDE: {
                        $gte: longitude,
                        $exists: true,
                        $ne: ""
                    }
                }).sort({
                    LATITUDE: 1,
                    LONGITUDE: 1
                }).limit(100).exec().then(closestMore => {
                    odpModel.find({
                        LATITUDE: {
                            $lte: latitude,
                            $exists: true,
                            $ne: ""
                        },
                        LONGITUDE: {
                            $gte: longitude,
                            $exists: true,
                            $ne: ""
                        }
                    }).sort({
                        LATITUDE: -1,
                        LONGITUDE: 1
                    }).limit(100).exec().then(closestLessMore => {
                        odpModel.find({
                            LATITUDE: {
                                $gte: latitude,
                                $exists: true,
                                $ne: ""
                            },
                            LONGITUDE: {
                                $lte: longitude,
                                $exists: true,
                                $ne: ""
                            }
                        }).sort({
                            LATITUDE: 1,
                            LONGITUDE: -1
                        }).limit(100).exec().then(closestMoreLess => {
                            const less = FindClosestNode(req.query, closestLess);
                            const more = FindClosestNode(req.query, closestMore);
                            const lessMore = FindClosestNode(req.query, closestLessMore);
                            const moreLess = FindClosestNode(req.query, closestMoreLess);
                            const nums = [less.closestDistance, more.closestDistance, lessMore.closestDistance, moreLess.closestDistance];
                            const points = [less, more, lessMore, moreLess];
                            const closest = Math.min.apply(Math, nums);
                            const closestValue = points.filter(point => {
                                return point.closestDistance === closest;
                            })[0];

                            res.status(200).send({
                                data: closestValue.closestPoint
                            });
                        });
                    });
                });
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Something went wrong."
        });
    });
};

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