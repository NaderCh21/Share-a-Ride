const express = require("express");

const auth = require("../middlewares/requireAuth");

const userRoutes = express.Router();

const {
  updateInfo,
  loginUser,
  signupUser,
  uploadPic,
} = require("../controllers/userController");

userRoutes.patch("/updateInfo", auth, updateInfo);

userRoutes.post("/login", loginUser);

userRoutes.post("/signup", signupUser);

userRoutes.post("/uploadPic", auth, uploadPic);

module.exports = userRoutes;
