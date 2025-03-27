const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//const Img = require("../models/imgModel");
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

// signup a user
const signupUser = async (req, res) => {
  const {
    universityEmail,
    password,
    confirmPassword,
    first_name,
    last_name,
    //studentIdPic,
    role,
  } = req.body;

  try {
    const user = await User.signup(
      universityEmail,
      password,
      confirmPassword,
      first_name,
      last_name,
      //studentIdPic,
      role
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ universityEmail, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const getUserInfo = async (req, res) => {
//   const user_id = req.user._id;
//   try {
//     const user = await User.findById(user_id)
//       .populate("profilePic")
//       .populate({
//         path: "userBlogs",
//         options: { sort: { createdAt: -1 } },
//         populate: {
//           path: "image",
//         },
//       });

//     if (!user) {
//       return res.status(404).json("User not found");
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching user info:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const updateInfo = async (req, res) => {
//   const user_id = req.user._id;

//   try {
//     if (req.body.password && req.body.password !== "") {
//       const salt = await bcrypt.genSalt(10);
//       const hash = await bcrypt.hash(req.body.password, salt);
//       req.body.password = hash;
//     }

//     if (req.body.profilePic && req.body.profilePic.data instanceof Buffer) {
//       req.body.profilePic.data = req.body.profilePic.data.toString("base64");
//     }

//     const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res.status(400).json("No user was found");
//     }
//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const uploadPic = async (req, res) => {
//   const id = req.user._id;
//   try {
//     const { image } = req.body;

//     if (!image) {
//       return res.status(400).json({ msg: "No image was found" });
//     }

//     let newImg = new Img({
//       image,
//       uploadedBy: id,
//     });

//     newImg = await newImg.save();
//     await User.findByIdAndUpdate(req.user._id, { profilePic: newImg._id });
//     res.json(newImg);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  //getUserInfo,
  //updateInfo,
  loginUser,
  signupUser,
  //uploadPic,
};
