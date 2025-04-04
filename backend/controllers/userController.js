const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { universityEmail, password } = req.body;

  try {
    const user = await User.login(universityEmail, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ universityEmail, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const {
    universityEmail,
    password,
    confirmPassword,
    first_name,
    last_name,
    univeristyName,
    campusLocation,
    phoneNumber,
    location,
    role,
    studentIdPic,
    vehicleNb, // Only required for drivers
    driverLicense, // Only required for drivers
  } = req.body;

  try {
    if (password !== confirmPassword) {
      throw Error("Passwords do not match");
    }

    const user = await User.signup(
      universityEmail,
      password,
      first_name,
      last_name,
      univeristyName,
      campusLocation,
      phoneNumber,
      location,
      role,
      studentIdPic,
      vehicleNb, // Only required for drivers
      driverLicense // Only required for drivers
    );

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ universityEmail, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateInfo = async (req, res) => {
  const user_id = req.user._id;

  try {
    const updates = { ...req.body };

    if (updates.password && updates.password !== "") {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const imageFields = ["profilePic", "studentIdPic", "driverLicencePic"];
    imageFields.forEach((field) => {
      if (updates[field] && updates[field].data instanceof Buffer) {
        updates[field].data = updates[field].data.toString("base64");
      }
    });

    const updatedUser = await User.findByIdAndUpdate(user_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(400).json({ error: "No user was found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadPic = async (req, res) => {
  const id = req.user._id;
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ msg: "No image was found" });
    }

    let newImg = new Img({
      image,
      uploadedBy: id,
    });

    newImg = await newImg.save();
    await User.findByIdAndUpdate(req.user._id, { profilePic: newImg._id });
    res.json(newImg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  updateInfo,
  loginUser,
  signupUser,
  uploadPic,
};
