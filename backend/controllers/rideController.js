const Ride = require("../models/rideModel");
const User = require("../models/userModel");

// Add a new ride
exports.addRide = async (req, res) => {
  try {
    const { date, time, route, pickupLocation, availableSeats } = req.body;
    const driverId = req.user.id;

    if (
      !date ||
      !time ||
      !route ||
      !pickupLocation ||
      availableSeats === undefined
    ) {
      return res.status(400).json({ message: "All fields must be filled." });
    }

    // Create new ride
    const newRide = new Ride({
      date,
      time,
      route,
      pickupLocation,
      driver: driverId,
      availableSeats,
    });

    await newRide.save();
    res.status(201).json({ message: "Ride added successfully", ride: newRide });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get rides added by the logged-in driver
exports.getDriverRides = async (req, res) => {
  try {
    const driverId = req.user.id; // Assuming `req.user.id` contains the authenticated driver's ID
    const rides = await Ride.find({ driver: driverId });

    res.status(200).json({ success: true, rides });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all available rides
exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate(
      "driver",
      "first_name last_name email"
    );
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single ride by ID
exports.getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate(
      "driver",
      "first_name last_name email"
    );
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Join a ride as a passenger
exports.joinRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.availableSeats <= 0) {
      return res.status(400).json({ message: "No available seats left" });
    }

    if (ride.passengerIdsList.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You have already joined this ride" });
    }

    ride.passengerIdsList.push(req.user.id);
    ride.availableSeats -= 1;

    await ride.save();
    res.status(200).json({ message: "Successfully joined the ride", ride });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a ride (Only driver can delete)
exports.deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.driver.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can only delete your own rides" });
    }

    await ride.deleteOne();
    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
