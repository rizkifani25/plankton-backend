const reportSchema = require("../../models/reports");
const mongoose = require("mongoose");

exports.uploadReport = async (req, res) => {
  const { user, coords, alproType, detail, description, rawImage } = req.query;
  let image_url = "";

  // const image_url = handleUploadImage(rawImage); //return imageUrl from firebase
  console.log(req.query, req.body);

  const newReport = new reportSchema({
    _id: `PL${new mongoose.Types.ObjectId()}`,
    user,
    alproType,
    detail,
    description,
    image_path: image_url || "/",
    location: coords
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
