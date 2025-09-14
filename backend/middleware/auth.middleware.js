const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  try {
    // 1. Token निकालना (cookie या header से)
    const token =
      req.cookies.Authorization ||
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. User attach करना
    const user = await User.findById(decoded.sub).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(401)
      .json({ message: "Token has expired or is invalid" });
  }
};

module.exports = requireAuth; // ✅ direct function export
