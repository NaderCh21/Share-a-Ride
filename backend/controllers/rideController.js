const Ride = require("../models/rideModel");
const User = require("../models/userModel");

// Both
// Get all available rides
const getRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate();
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Driver

// Add a new ride
const addRide = async (req, res) => {
  try {
    const { date, route, pickupLocation, availableSeats } = req.body;
    const driverID = req.user.id;

    if (!date || !route || !pickupLocation || availableSeats === undefined) {
      return res.status(400).json({ message: "All fields must be filled." });
    }

    // Create new ride
    const newRide = new Ride({
      date,
      route,
      pickupLocation,
      driverId: driverID,
      availableSeats,
    });

    await newRide.save();
    res.status(201).json({ message: "Ride added successfully", ride: newRide });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a ride
const deleteRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const driverId = req.user.id;

    // Find the ride
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.driverId !== driverId) {
      return res.status(403).json({ message: "You can only delete your ride" });
    }

    // Delete the ride
    await Ride.findByIdAndDelete(rideId);

    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get rides added by the logged-in driver
const getDriverRides = async (req, res) => {
  try {
    const driverID = req.user.id; // Assuming authenticated driver

    // Find all rides belonging to the driver
    const rides = await Ride.find({ driverId: driverID });

    if (!rides.length) {
      return res
        .status(404)
        .json({ message: "No rides found for this driver" });
    }

    res.status(200).json({ rides });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Passenger

module.exports = {
  addRide,
  getDriverRides,
  getRides,
  deleteRide,
};
