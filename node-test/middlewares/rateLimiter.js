const rateLimiter = require("express-rate-limit");

exports.globalLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests. Try again later.",
    data: {},
  },
});

exports.authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many attempts. Try again later.",
    data: {},
  },
});
