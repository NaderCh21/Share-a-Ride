const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rideSchema = new Schema({
  date: {
    type: Date, // Changed to Date
    required: true,
  },
  time: {
    type: String, // Kept as String since time is usually formatted separately
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    ref: "User",
    required: true,
  },
  availableSeats: {
    type: Number, // Changed to Number
    required: true,
  },
  passengerIdsList: {
    type: [mongoose.Schema.Types.ObjectId], // Changed to an array of ObjectIds
    ref: "User",
    default: [],
  },
});

module.exports = mongoose.model("Ride", rideSchema);
