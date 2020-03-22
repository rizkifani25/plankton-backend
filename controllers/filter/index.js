const odpModel = require("../../models/odp");
const reportModel = require("../../models/report");
const witelModel = require("../../models/witel");
const utilStatus = require("../../services/status");

// GET LIST REGIONAL
exports.getListRegional = async (req, res) => {
  let query = {};
  odpModel
    .find(query, {
      _id: 0
    })
    .distinct("REGIONAL")
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    });
};

// GET LIST WITEL
exports.getListWitel = async (req, res) => {
  let query;
  req.query.reg == null
    ? (query = {})
    : (query = {
        REGIONAL: req.query.reg
      });

  odpModel
    .find(query, {
      _id: 0
    })
    .distinct("WITEL")
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    });
};

// GET LIST DATEL
exports.getListDatel = async (req, res) => {
  let query;
  req.query.witel == null
    ? (query = {})
    : (query = {
        WITEL: req.query.witel
      });
  odpModel
    .find(query, {
      _id: 0
    })
    .distinct("DATEL")
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    });
};

// GET LIST STO
exports.getListSTO = async (req, res) => {
  let query;
  req.query.witel == null
    ? (query = {})
    : (query = {
        WITEL: req.query.witel
      });
  odpModel
    .find(query, {
      _id: 0
    })
    .distinct("STO")
    .exec()
    .then(response => {
      res.status(200).send({
        data: response
      });
    });
};

// GET ALL WITEL WITH DATEL INSIDE
exports.getAllWitel = async (req, res) => {
  let query;
  req.query.witel == null
    ? (query = {})
    : (query = {
        WITEL: req.query.witel
      });
  witelModel
    .find(query, {
      _id: 0
    })
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

groupOverviewData = (datas, secondData) => {
  let result = {};

  datas.map(data => {
    result[data._id] = {
      totalCount: data.count,
      statusCount: {
        100: 0,
        101: 0,
        102: 0,
        200: 0,
        400: 0,
        1000: 0
      }
    };
  });

  secondData.map(data => {
    const currentData = result[data._id.location];
    result[data._id.location] = {
      ...currentData,
      statusCount: {
        ...currentData.statusCount,
        [data._id.status.code]: data.count
      }
    };
  });

  let finalResult = [];

  Object.keys(result).map(key => {
    finalResult.push({
      _id: key,
      ...result[key]
    });
  });

  return finalResult;
};

exports.improvedOverview = async (req, res) => {
  const { witel } = req.query;
  const status = utilStatus.getAllStatus();
  let listWitel = [],
    tempWitel = [],
    tempDatel = [],
    tempStatus = [],
    query = {};

  !witel
    ? (query = {})
    : (query = {
        WITEL: witel
      });

  reportModel
    .aggregate([
      {
        $group: {
          _id: "$location.witel",
          count: {
            $sum: 1
          }
        }
      }
    ])
    .then(data => {
      reportModel
        .aggregate([
          {
            $group: {
              _id: {
                location: "$location.witel",
                status: "$status"
              },
              count: {
                $sum: 1
              }
            }
          }
        ])
        .then(typeCounts => {
          reportModel
            .aggregate([
              {
                $group: {
                  _id: "$alproType",
                  count: {
                    $sum: 1
                  }
                }
              }
            ])
            .then(typeCount => {
              res.status(200).send({
                data: groupOverviewData(data, typeCounts),
                typeCount
              });
            });
        });
    });

  // await witelModel
  //   .find(query)
  //   .exec()
  //   .then(async response => {
  //     listWitel = response;
  //     tempWitel = [];
  //     for (let i = 0; i < listWitel.length; i++) {
  //       tempDatel = [];
  //       for (let j = 0; j < listWitel[i]["DATEL"].length; j++) {
  //         tempStatus = [];
  //         for (let k = 0; k < status.length; k++) {
  //           let query = {
  //             "location.datel": listWitel[i]["DATEL"][j],
  //             "status.code": status[k]["code"]
  //           };
  //           await reportModel.countDocuments(query).then(async response => {
  //             let resultStatus = {
  //               code: status[k]["code"],
  //               total: response
  //             };
  //             tempStatus.push(resultStatus);
  //           });
  //         }
  //         let resultDatel = {
  //           datel: listWitel[i]["DATEL"][j],
  //           data: [...tempStatus]
  //         };
  //         tempDatel.push(resultDatel);
  //       }
  //       let resultWitel = {
  //         witel: listWitel[i]["WITEL"],
  //         data: [...tempDatel]
  //       };
  //       tempWitel.push(resultWitel);
  //     }
  //     res.status(200).send({
  //       data: tempWitel
  //     });
  //   });
}; //50

exports.countReportByRegional = async (req, res) => {
  let query = {};
  let listRegional = [],
    counterRegional = [],
    listWitel = [],
    tempResultRegional = [];

  await odpModel
    .find(query, {
      _id: 0
    })
    .distinct("REGIONAL")
    .exec()
    .then(async response => {
      listRegional = response;
      for (let i = 0; i < listRegional.length; i++) {
        let queryWitel = {
          REGIONAL: listRegional[i]
        };

        await odpModel
          .find(queryWitel, {
            _id: 0
          })
          .distinct("WITEL")
          .exec()
          .then(async response => {
            listWitel = response;
            tempResultRegional = [];
            for (let j = 0; j < listWitel.length; j++) {
              let query = {
                "location.witel": listWitel[j]
              };

              await reportModel.countDocuments(query).then(response => {
                let result = {
                  witel: listWitel[j],
                  total_report: response
                };
                tempResultRegional.push(result);
              });
            }
            counterRegional.push({
              regional: listRegional[i],
              data: tempResultRegional
            });
          });
      }
      res.status(200).send({
        data: counterRegional
      });
    })
    .catch(response => {
      res.status(400).send({
        data: response
      });
    });
};

exports.testingOverview = async (req, res) => {
  let query = {};
  let listRegional = [],
    counterRegional = [],
    listWitel = [],
    listDatel = [],
    status = utilStatus.getAllStatus(),
    listStatus = [],
    tempResultRegional = [],
    tempResultWitel = [],
    tempResultDatel = [],
    tempResult = {};

  await odpModel
    .find(query, {
      _id: 0
    })
    .distinct("REGIONAL")
    .exec()
    .then(async response => {
      listRegional = response;
      for (let i = 0; i < listRegional.length; i++) {
        let queryWitel = {
          REGIONAL: listRegional[i]
        };

        await odpModel
          .find(queryWitel, {
            _id: 0
          })
          .distinct("WITEL")
          .exec()
          .then(async response => {
            listWitel = response;
            tempResultRegional = [];
            for (let j = 0; j < listWitel.length; j++) {
              let query = {
                WITEL: listWitel[j]
              };

              await odpModel
                .find(query, {
                  _id: 0
                })
                .distinct("DATEL")
                .exec()
                .then(async response => {
                  listDatel = response;
                  tempResultWitel = [];
                  tempResultWitel = {
                    witel: listWitel[j],
                    datel: []
                  };
                  for (let k = 0; k < listDatel.length; k++) {
                    tempResultDatel = [];
                    tempResultDatel = {
                      datel: listDatel[k],
                      data: []
                    };
                    listStatus = [];
                    for (let l = 0; l < status.length; l++) {
                      let query = {
                        "location.datel": listDatel[k],
                        "status.code": status[l]["code"]
                      };
                      await reportModel.countDocuments(query).then(response => {
                        let tempResultStatus = {
                          code: status[l]["code"],
                          total: response
                        };

                        listStatus.push(tempResultStatus);
                      });
                    }
                    tempResultDatel.data.push(listStatus);
                    tempResultWitel.datel.push(tempResultDatel);
                  }
                });
              tempResultRegional.push(tempResultWitel);
            }
            counterRegional.push({
              regional: listRegional[i],
              data: tempResultRegional
            });
          });
      }
      res.status(200).send({
        data: counterRegional
      });
    })
    .catch(response => {
      res.status(400).send({
        data: response
      });
    });
}; //89

exports.testingOverview2 = async (req, res) => {
  let listStatus = utilStatus.getAllStatus();
  let counter = [],
    tempResult = [];
  for (let i = 0; i < listStatus.length; i++) {
    let query = {
      "status.code": listStatus[i]["code"]
    };
    tempResult = [];
    await reportModel.countDocuments(query).then(response => {
      tempResult = {
        code: listStatus[i]["code"],
        total: response
      };

      counter.push(tempResult);
    });
  }
  res.status(200).send({
    data: counter
  });
};

// counterRegional = {
//   {
//     regional: "Regional 3",
//     data: [
//       {witel: "witel1", {datel: { datel1: "datel1", total: "totaldatel1"}, {datel2: "datel2", total: "totaldatel2"}}, total: "total1"},
//       {witel: "witel2", total: "total2"}
//     ]
//   },
//   {
//     regional: "Regional 4",
//     data: [
//       {witel: "witel1", total: "total1"},
//       {witel: "witel2", total: "total2"}
//     ]
//   },
//   {
//     regional: "Regional 5",
//     data: [
//       {witel: "witel1", total: "total1"},
//       {witel: "witel2", total: "total2"}
//     ]
//   }
// }
