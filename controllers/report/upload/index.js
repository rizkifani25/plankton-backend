// const admin = require("firebase-admin");
// const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://plankton-project.firebaseio.com"
// });

// const storage = admin.storage().bucket();

exports.uploadReport = async (req, res) => {
  const imageFile = req.query.rawImage;
  const detail = req.query.detail;
  const description = req.query.description;
  const reporterName = req.query.reporterName;
  const alproTypeActive = req.query.alproTypeActive;
  const alproType = req.query.alproType;
  const coords = req.query.coords;

  const data = {
    message: "Testing"
    // place: {

    // },
    // reporter: {
    //   user_name: reporterName,
    //   user_phone: ""
    // },
    // report_data: {
    //   report_type
    // }
  };

  res.status(200).send({
    data: data
  });
};
