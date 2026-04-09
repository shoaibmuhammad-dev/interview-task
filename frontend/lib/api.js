// import axios from "axios";

// const api = axios.create({
//   baseURL: `http://localhost:5000/api`,
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const message = error?.response?.data?.message || "Something went wrong";
//     return Promise.reject(message);
//   },
// );

// export default api;

// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ this is all you need — sends & receives cookies automatically
});

// Interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
