const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    userID: { type: String },
    pickupName: { type: String },
    pickupLat: { type: Number },
    pickupLng: { type: Number },
    dropName: { type: String },
    dropLat: { type: Number },
    dropLng: { type: Number },
    rideStatus: { type: String },
    driverID: { type: String },
    fare: { type: Number },
});

const Booking = mongoose.model("booking", BookingSchema);

module.exports = { Booking };
