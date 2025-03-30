const express = require("express");
const router = express.Router();
const rideController = require("../controllers/rideController");
const authMiddleware = require("../middlewares/requireAuth");

//Both

router.get("/getAllRides", rideController.getRides);

//Driver

router.post("/driver/addRide", authMiddleware, rideController.addRide);

router.post(
  "/driver/deleteRide/:rideId",
  authMiddleware,
  rideController.deleteRide
);

router.get("/driver/My-rides", authMiddleware, rideController.getDriverRides);

//Passenger

module.exports = router;
