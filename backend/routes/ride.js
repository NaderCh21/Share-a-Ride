const express = require("express");
const router = express.Router();
const rideController = require("../controllers/rideController");
const authMiddleware = require("../middlewares/requireAuth");

// Add a new ride (Driver only)
router.post("/add", authMiddleware, rideController.addRide);

router.get("/driver/my-rides", authMiddleware, rideController.getDriverRides);

// Get all rides (Available for both passengers & drivers)
router.get("/", rideController.getRides);

// Get a specific ride by ID
router.get("/:id", rideController.getRideById);

// Join a ride as a passenger
router.post("/:id/join", authMiddleware, rideController.joinRide);

// Delete a ride (Only the driver who created it)
router.delete("/:id", authMiddleware, rideController.deleteRide);

module.exports = router;
