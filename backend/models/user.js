const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RiderSchema = new Schema({
    // username: {
    //     type: String,
    //     required: [true, "username should not be empty"],
    // },
    firstname: { type: String },
    lastname: { type: String },
    contact: { type: String },
    email: { type: String, required: [true, "email should be valid"] },
    password: { type: String },
    address: { type: String },
    image_url: { type: String, default: 'default_profile.png' },
    rating: { type: Number, default: 5 },
});

const DriverSchema = new Schema({
    // username: {
    //     type: String,
    //     required: [true, "username should not be empty"],
    // },
    firstname: { type: String },
    lastname: { type: String },
    contact: { type: String },
    email: { type: String, required: [true, "email should be valid"] },
    password: { type: String },
    address: { type: String },
    image_url: { type: String, default: '/default_profile.png' },
    rating: { type: Number, default: 5 },
    vehicleType: { type: String },
    vehicleModel: { type: String },
    licence_number: {
        type: String,
        required: [true, "licence is necessary to register as driver"],
    },
});

const Rider = mongoose.model("rider", RiderSchema);
const Driver = mongoose.model("driver", DriverSchema);

module.exports = { Rider, Driver };
