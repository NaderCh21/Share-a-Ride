const express = require("express");
const router = express.Router();
const rideController = require("../controllers/rideController");
const authMiddleware = require("../middlewares/requireAuth");

//Both
// Get all rides
router.get("/getAllRides", rideController.getRides);

//Driver
// Add a new ride
router.post("/driver/addRide", authMiddleware, rideController.addRide);

// delete ride
router.post(
  "/driver/deleteRide/:rideId",
  authMiddleware,
  rideController.deleteRide
);

// Delete a ride
router.delete("/driver/:id", authMiddleware, rideController.deleteRide);

router.get("/driver/My-rides", authMiddleware, rideController.getDriverRides);

//Passenger

module.exports = router;
