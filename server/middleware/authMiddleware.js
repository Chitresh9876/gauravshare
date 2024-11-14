// // backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
// const { apiError } = require("../utils/Error.js");

const authMiddleware = async (req, res, next) => {
  try {
//     const accessToken =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "No token, authorization denied" });
//       throw new apiError(402, "no access token exist or user is not logged in");

    const decoded = await jwt.verify(
      Token,
      process.env.JWT_TOKEN
    );
    if (!decoded) throw new apiError(402, "no such user Exists");
    const User = await user.findById(decoded._id);
    if (!User) throw new apiError(402, "not found ");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
//     throw new apiError(402, "chala ja ");
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports = { authMiddleware, adminMiddleware };


