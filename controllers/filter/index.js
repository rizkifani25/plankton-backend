const odpModel = require("../../models/odp");
const reportModel = require("../../models/report");
const witelModel = require("../../models/witel");

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
    .find(query, { _id: 0 })
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
    .find(query, { _id: 0 })
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
    .find(query, { _id: 0 })
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
    .find(query, { _id: 0 })
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
