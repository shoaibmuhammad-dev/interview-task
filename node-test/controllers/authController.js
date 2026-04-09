const User = require("../models/User");
const TokenBlackList = require("../models/TokenBlackList");
const jwt = require("jsonwebtoken");
const { generateOtp } = require("../utils/emails/generateOtp");
const { sendEmail } = require("../utils/emails/sendEmail");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({
        success: false,
        message: "Email exists",
        data: {},
      });

    const otp = generateOtp();

    const user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail(email, "Verify your Uptrix Account", `Your OTP is ${otp}`);
    res.status(201).json({
      success: true,
      message: "User registered. Verification email sent!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        data: {},
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
        data: {},
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        data: {},
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax", // or "none" if cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: "Account verified",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: {},
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await TokenBlackList.create({
      token,
      expiresAt: new Date(decoded.exp * 1000),
    });

    res.json({
      success: true,
      message: "Logout successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
        data: {},
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "none", // or "none" if cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: "Account verified",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }

    const otp = generateOtp();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Uptrix Reset Password OTP",
      `Your password reset OTP is ${otp}`,
    );

    res.json({
      success: true,
      message: "OTP sent to email",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

exports.resetPasword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
        data: {},
      });
    }

    user.password = newPassword;
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "User profile",
      data: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (name) user.name = name;

    await user.save();
    res.json({
      success: true,
      message: "User profile updated",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
        data: {},
      });
    }

    user.password = newPassword;

    await user.save();
    res.json({
      success: true,
      message: "Password updated",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};
