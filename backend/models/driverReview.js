const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverReviewSchema = new Schema({
    rideId: { type: String },
    driverId: { type: String },
    riderId: { type: String },
    rating: { type: Number },
    review: { type: String },
});

const DriverReview = mongoose.model("driver-review", DriverReviewSchema);

module.exports = { DriverReview };
