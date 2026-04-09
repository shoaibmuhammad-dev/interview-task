import * as Yup from "yup";

export const verifyOtpSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  code: Yup.string()
    .length(6, "OTP must be 6 digits")
    .matches(/^[0-9]+$/, "OTP must be numeric")
    .required("OTP is required"),
});
