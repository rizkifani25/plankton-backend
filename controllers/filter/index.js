const odpModel = require("../../models/odp");
const reportModel = require("../../models/report");

exports.filterTabel = async (req, res) => {
  const { regional, witel, datel, sto } = req.query;
  let query = {};

  if (regional == null && witel == null && datel == null && sto == null) {
    odpModel
      .find(query, { _id: 0 })
      .distinct("REGIONAL")
      .exec()
      .then(response => {
        res.status(200).send({
          data: response
        });
      })
      .catch(response => {
        res.status(400).send({
          data: response
        });
      });
  } else if (
    regional != null &&
    witel == null &&
    datel == null &&
    sto == null
  ) {
    query = {
      REGIONAL: regional
    };
    odpModel
      .find(query, { _id: 0 })
      .distinct("WITEL")
      .exec()
      .then(response => {
        res.status(200).send({
          data: response
        });
      })
      .catch(response => {
        res.status(400).send({
          data: response
        });
      });
  } else if (
    regional != null &&
    witel != null &&
    datel == null &&
    sto == null
  ) {
    query = {
      WITEL: witel
    };
    odpModel
      .find(query, { _id: 0 })
      .distinct("DATEL")
      .exec()
      .then(response => {
        res.status(200).send({
          data: response
        });
      })
      .catch(response => {
        res.status(400).send({
          data: response
        });
      });
  }
};

exports.countReportByRegional = async (req, res) => {
  let query = {};
  let listRegional = [],
    counterRegional = [],
    listWitel = [],
    countWitel = [],
    tempResultRegional = [];

  await odpModel
    .find(query, { _id: 0 })
    .distinct("REGIONAL")
    .exec()
    .then(async response => {
      listRegional = response;
      for (let i = 0; i < listRegional.length; i++) {
        let queryWitel = {
          REGIONAL: listRegional[i]
        };

        await odpModel
          .find(queryWitel, { _id: 0 })
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

// counterRegional = {
//   {
//     regional: "Regional 3",
//     data: [
//       {witel: "witel1", total: "total1"},
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
