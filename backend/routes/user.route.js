const express = require("express");
const userController = require("../controllers/user.controller");
const { requireAuth } = require("../middleware/auth.middleware"); // Route-Specific Middleware
const {
	signupValidationRules,
	validate,
	loginValidationRules,
} = require("../middleware/validation.middleware"); // Route-Specific Middleware

const router = express.Router();

// USER / AUTH ROUTES
router.post(
	"/signup",
	signupValidationRules(),
	validate,
	userController.signup
);
router.post("/login", loginValidationRules(), validate, userController.login);
router.get("/logout", requireAuth, userController.logout);
router.get("/check-auth", requireAuth, userController.checkAuth);

module.exports = router;
