const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverStatusSchema = new Schema({
    lat: { type: Number },
    lng: { type: Number },
    status: { type: String },
});

const DriverStatus = mongoose.model("driver-status", DriverStatusSchema);

module.exports = { DriverStatus };
