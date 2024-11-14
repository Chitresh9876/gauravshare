const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const { validateEmail } = require("../utils/validations/emailValidate.js");
const {
  validatePassword,
} = require("../utils/validations/password.validate.js");
const { apiError } = require("../utils/Error.js");
const { ApiResponse } = require("../utils/ApiResponse.js");

// Register

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if ([name, email, password, role].some((val) => val.trim() === ""))
      throw new apiError(401, "all feilds are mandatory fill all of them");

    if (!validateEmail(email)) throw new apiError(401, "wrong Email Format");
    if (!validatePassword)
      throw new apiError(
        401,
        "wrong password format -try with 8 char upper,lower,special,numerical combination  "
      );

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new apiError(401, "user already exists");

    const userDb = await User.create({ name, email, password, role });
    if (!userDb)
      throw new apiError(500, "internal server Error, please try again");
    // await user.save();
    const createdUser = await User.findById(userDb._id).select(" -password  -refreshToken");
    return res
      .status(200)
      .json(new ApiResponse(200, "user details", createdUser));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Login
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

);

// forget password
//

module.exports = router;

