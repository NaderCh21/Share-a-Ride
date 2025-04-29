const Feedback = require("../models/feedbackModel");

const submitFeedback = async (req, res) => {
  try {
    const { rideId, feedbackForUserId, rating, feedback, role } = req.body;
    const userId = req.user.id;

    if (userId === feedbackForUserId) {
      return res
        .status(400)
        .json({ message: "You cannot give feedback to yourself." });
    }

    const newFeedback = new Feedback({
      rideId,
      userId,
      feedbackForUserId,
      rating,
      feedback,
      role,
    });

    await newFeedback.save();
    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getRideFeedback = async (req, res) => {
  try {
    const { rideId } = req.params;

    const feedback = await Feedback.find({ rideId })
      .populate("userId feedbackForUserId", "name email") // Populate user details (feedback giver and receiver)
      .populate("rideId", "pickupLocation date"); // Optionally populate ride details

    if (!feedback || feedback.length === 0) {
      return res
        .status(404)
        .json({ message: "No feedback found for this ride." });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getRideFeedback,
};
