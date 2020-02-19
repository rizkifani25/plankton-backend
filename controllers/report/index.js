const reportSchema = require("../../models/reports");
const mongoose = require("mongoose");

exports.uploadReport = async (req, res) => {
  const { image_url, user, alproType, detail, description, coords } = req.query;

  // const image_url = handleUploadImage(rawImage); //return imageUrl from firebase
  console.log(req.query.description);
  const newReport = new reportSchema({
    _id: `PL${new mongoose.Types.ObjectId()}`,
    user: JSON.parse(user),
    alproType: JSON.parse(alproType),
    detail,
    description,
    image_path: image_url || "/",
    location: JSON.parse(coords)
  });

  console.log(newReport);

  res.status(200).json({ message: "asdads" });

  // newReport
  //   .save()
  //   .then(Response => {
  //     res.status(201).send({ post_id: newReport._id });
  //   })
  //   .catch(err => {
  //     res.status(400).send({});
  //   });
};
