const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    userID: { type: String },
    pickupName: { type: String },
    pickupLat: { type: Number },
    pickupLng: { type: Number },
    dropName: { type: String },
    vehicleType: { type: String },
    dropLat: { type: Number },
    dropLng: { type: Number },
    rideStatus: { type: String },
    driverID: { type: String },
    fare: { type: Number },
});

BookingSchema.index({ timestamp: 1, pickupLat: 1, pickupLng: 1 });

const Booking = mongoose.model("booking", BookingSchema);

module.exports = { Booking };
