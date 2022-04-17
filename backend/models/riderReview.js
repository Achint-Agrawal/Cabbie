const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RiderReviewSchema = new Schema({
    rideId: { type: String },
    driverId: { type: String },
    riderId: { type: String },
    rating: { type: Number },
    review: { type: String },
});

const RiderReview = mongoose.model("rider-review", RiderReviewSchema);

module.exports = { RiderReview };
