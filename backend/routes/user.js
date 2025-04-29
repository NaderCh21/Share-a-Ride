const express = require("express");

const auth = require("../middlewares/requireAuth");

const { upload } = require("../middlewares/upload"); // Ensure correct import

const userRoutes = express.Router();

const {
  updateInfo,
  loginUser,
  signupUser,
  //uploadPic,
  generateQRCode,
} = require("../controllers/userController");

userRoutes.patch("/updateInfo", auth, updateInfo);

userRoutes.post("/login", loginUser);

//userRoutes.post("/signup", upload, signupUser);
userRoutes.post(
  "/signup",
  upload.fields([
    { name: "studentIdPic", maxCount: 1 },
    { name: "driverLicensePic", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    next();
  },
  signupUser
);
//userRoutes.post("/uploadPic", auth, uploadPic);
userRoutes.get("/generate-qr", auth, generateQRCode);

module.exports = userRoutes;
