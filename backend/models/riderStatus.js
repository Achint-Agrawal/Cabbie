const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RiderStatusSchema = new Schema({
    lat: { type: Number },
    lng: { type: Number },
    status: { type: String },
});

const RiderStatus = mongoose.model("rider-status", RiderStatusSchema);

module.exports = { RiderStatus };
