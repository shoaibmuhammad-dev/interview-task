import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  // .matches(/[a-z]/, "Must contain at least one lowercase letter")
  // .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  // .matches(/[0-9]/, "Must contain at least one number")
  // .matches(
  //   /[!@#$%^&*(),.?":{}|<>]/,
  //   "Must contain at least one special character",
  // )
});
