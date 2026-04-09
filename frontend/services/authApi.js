// services/authApi.js
import api from "@/lib/api";

export const login = (data) => api.post("/v1/auth/login", data);
export const register = (data) => api.post("/v1/auth/register", data);
export const verifyOtp = (data) => api.post("/v1/auth/verify-otp", data);
export const forgotPassword = (data) =>
  api.post("/v1/auth/forgot-password", data);
export const resetPassword = (data) =>
  api.post("/v1/auth/reset-password", data);
export const logout = () => api.post("/v1/auth/logout");
export const getMe = () => api.get("/v1/auth/me");
