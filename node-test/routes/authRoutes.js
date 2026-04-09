const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyOTP,
  forgotPassword,
  resetPasword,
  logout,
  getMe,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const { authLimiter } = require("../middlewares/rateLimiter");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", authLimiter, register);
router.post("/login", login);
router.post("/verify-otp", authLimiter, verifyOTP);
// router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", authLimiter, resetPasword);
router.post("/logout", protect, authLimiter, logout);

router.get("/me", protect, authLimiter, getMe);
router.put("/update-profile", protect, authLimiter, updateProfile);
router.put("/change-password", protect, authLimiter, changePassword);

module.exports = router;
