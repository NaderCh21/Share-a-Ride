const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
  confirmPassword: {
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
    //required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  campusLocation: {
    type: String,
    //required: true,
  },
  phoneNumber: {
    type: String,
    //required: true,
  },
  location: {
    type: String,
    //required: true,
  },
  role: {
    type: String,
    required: true,
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
  vehicleIdPic: {
    type: Schema.Types.ObjectId,
    ref: "Img",
  },
  driverLicencePic: {
    type: Schema.Types.ObjectId,
    ref: "Img",
  },
});

// static signup method
userSchema.statics.signup = async function (
  universityEmail,
  password,
  confirmPassword,
  first_name,
  last_name,
  //studentIdPic,
  role
) {
  // validation
  if (
    !universityEmail ||
    !password ||
    !confirmPassword ||
    !first_name ||
    !last_name ||
    //!studentIdPic ||
    !role
  ) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(universityEmail)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
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
    confirmPassword: hash,
    //studentIdPic,
    first_name,
    last_name,
    role,
  });

  return user;
};

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

module.exports = mongoose.model("User", userSchema);
