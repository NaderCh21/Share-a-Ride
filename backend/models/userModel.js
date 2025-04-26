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
  // studentId: {
  //   type: Number,
  //   unique: true,
  // },
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
  // studentIdPic: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Img",
  //   required: true,
  // },
  // driverLicencePic: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Img",
  //   required: function () {
  //     return this.role === "driver";
  //   },
  // },
  studentIdPic: {
    type: String, // Store as base64 string
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: function () {
      return this.role === "driver";
    },
  },
  driverLicensePic: {
    type: String, // Store as base64 string
    required: function () {
      return this.role === "driver";
    },
  },
});

// static login method
userSchema.statics.signup = async function (
  universityEmail,
  password,
  first_name,
  last_name,
  univeristyName,
  //studentId,
  campusLocation,
  phoneNumber,
  location,
  role,
  studentIdPic,
  vehicleNumber,
  driverLicensePic
) {
  // Validation
  if (
    !universityEmail ||
    !password ||
    !first_name ||
    !last_name ||
    !univeristyName ||
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
    if (!vehicleNumber || !driverLicensePic) {
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
    //studentId,
    campusLocation,
    phoneNumber,
    location,
    role,
    studentIdPic,
    vehicleNumber: role === "driver" ? vehicleNumber : null,
    driverLicensePic: role === "driver" ? driverLicensePic : null,
  });

  return user;
};

module.exports = mongoose.model("User", userSchema);
