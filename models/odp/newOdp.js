const mongoose = require("mongoose");


const GeoSchema = mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})


const odpSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ODP_NAME: String,
    geometry: GeoSchema,
    REGIONAL: String,
    WITEL: String,
    DATEL: String,
    STO: String
});

module.exports = mongoose.model("odpModelNew", odpSchema, "list-odp-V2");