// const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/Error.js");
const validatePassword = require("../utils/validations/password.validate.js");
const validateEmail = require("../utils/validations/emailValidate.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // have to add validation rule for all feilds - comment for upgradation
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
    const createdUser = await User.findbyId(userDb._id).select("-password ");
    return res
      .status(200)
      .json(new ApiResponse(200, "user details", createdUser));
    // res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const genereateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await user.findById(userId);
    //
    const accessToken = await user.createAccessToken();
    const refreshToken = await user.createRefreshToken();

    user.refreshToken = refreshToken;
    user.save({
      validateBeforeSave: false,
    });
    // console.log(accessToken, refreshToken);
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      502,
      "something went wrong while creating refresh or access token"
    );
  }
};

const logingUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((val) => val.trim() === ""))
      throw new apiError(402, "field cannot be empty");
    const user = await user.findOne({ email });
    if (!user) throw new apiError(402, "error while fetching user");
    // if (!user) throw new apiError({402,"error while fetching user"});

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) throw new apiError(400, "invalid credentials");
    // return res.status(400).json(throw new apiError(400,"invalid credentials"));
    const { accessToken, RefreshToken } = await genereateAccessAndRefreshToken(
      user._id
    );
    if (!(accessToken && RefreshToken))
      throw new apiError(501, "something went wrong while generating token");
    user.refreshToken = RefreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await user
      .findById(user._id)
      .select(" -password -refreshToken");
    if (!loggedInUser)
      throw new apiError(402, "something went wrong while logging in");

    // const token = jwt.sign(
    //   { id: user._id, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1d" }
    // );
    // res.json({ message: "Login successful", token });
    const option = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", RefreshToken, option)
      .json(
        new ApiResponse(202, "user logged in succesfully", {
          user: loggedInUser,
          accessToken,
        })
      );
  } catch (error) {
    // res.status(500).json({ message: error.message });
    throw new apiError(500, "not able to login");
  }
});

module.exports = {
  registerUser,
  logingUser,
};
