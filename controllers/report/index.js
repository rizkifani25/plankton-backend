const reportSchema = require("../../models/reports");

exports.uploadReport = async (req, res) => {
  const { user, coords, alproType, detail, description, rawImage } = req.query;
  let image_url = "";

  // const image_url = handleUploadImage(rawImage); //return imageUrl from firebase
  console.log(req.query);

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

  // newReport
  //   .save()
  //   .then(Response => {
  //     res.status(201).send({ post_id: newReport._id });
  //   })
  //   .catch(err => {
  //     res.status(400).send({});
  //   });
};
