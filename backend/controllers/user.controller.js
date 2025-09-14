const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/* [POST] Signup */
const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered. Please login." });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({ email, password: hashedPassword });

    // Auto login after signup
    req.body = { email, password };
    await login(req, res, next);
  } catch (err) {
    next(err);
  }
};

/* [POST] Login */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Wrong password." });
    }

    // Token generate (30 days)
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Cookie में set करना
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("Authorization", token, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure:isProduction,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ email: user.email });
  } catch (err) {
    next(err);
  }
};

/* [GET] Logout */
const logout = (req, res, next) => {
  try {
    res.cookie("Authorization", "", { expires: new Date(0) });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

/* [GET] Check Auth */
const checkAuth = (req, res, next) => {
  try {
    res.status(200).json({ email: req.user.email });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
