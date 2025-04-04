const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Img = require("./imgModels");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  universityEmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  univeristyName: {
    type: String,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  campusLocation: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["driver", "passenger"],
  },
  profilePic: {
    type: Schema.Types.ObjectId,
    ref: "Img",
  },
  studentIdPic: {
    type: Schema.Types.ObjectId,
    ref: "Img",
    //required: true,
  },
  vehicleNb: {
    type: String,
    required: function () {
      return this.role === "driver";
    },
  },
  driverLicencePic: {
    type: Schema.Types.ObjectId,
    ref: "Img",
    //required: function () {
    //  return this.role === "driver";
    //},
  },
});

// static login method
userSchema.statics.login = async function (universityEmail, password) {
  if (!universityEmail || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ universityEmail });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

//static signup method
userSchema.statics.signup = async function (
  universityEmail,
  password,
  first_name,
  last_name,
  univeristyName,
  studentId,
  campusLocation,
  phoneNumber,
  location,
  role,
  studentIdPic,
  vehicleNb,
  driverLicense
) {
  // Validation
  if (
    !universityEmail ||
    !password ||
    !first_name ||
    !last_name ||
    !univeristyName ||
    !studentId ||
    !campusLocation ||
    !phoneNumber ||
    !location ||
    !role ||
    !studentIdPic
  ) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(universityEmail)) {
    throw Error("Email not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  if (role === "driver") {
    if (!vehicleNb || !driverLicense) {
      throw Error("Drivers must provide vehicle ID and driver license");
    }
  }

  const exists = await this.findOne({ universityEmail });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    universityEmail,
    password: hash,
    first_name,
    last_name,
    univeristyName,
    studentId,
    campusLocation,
    phoneNumber,
    location,
    role,
    studentIdPic,
    vehicleNb: role === "driver" ? vehicleNb : null, // Store only for drivers
    driverLicense: role === "driver" ? driverLicense : null, // Store only for drivers
  });

  return user;
};

module.exports = mongoose.model("User", userSchema);
