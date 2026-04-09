// src/lib/auth.js
import Cookies from "js-cookie";

// Save token after login/register
export const setToken = (token) => {
  Cookies.set("token", token, {
    expires: 7, // 7 days
    secure: true, // HTTPS only in production
    sameSite: "strict",
  });
};

export const getToken = () => Cookies.get("token");

export const removeToken = () => Cookies.remove("token");

export const isAuthenticated = () => !!Cookies.get("token");
