"use client";

import React, { useRef } from "react";
import Input from "./Input";
import { useFormik } from "formik";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import PasswordInput from "./PasswordInput";
import { resetPasswordSchema } from "../_validation/resetPasswordSchema";
import { resetPassword } from "@/services/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useResendOtp } from "@/hooks/resent-otp";
import api from "@/lib/api";

const ResetPasswordForm = () => {
  const inputsRef = useRef([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await api.post("/auth/reset-password", {
          otp: values.code,
          email: values.email,
          newPassword: values.password,
        });
        if (data?.data?.success) {
          alert("Password reset successfully");
          resetForm();
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    },
  });

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const codeArray = formik.values.code.split("");
    codeArray[index] = value;

    const newCode = codeArray.join("");
    formik.setFieldValue("code", newCode);
    formik.setFieldTouched("code", true);

    // Move forward
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const codeArray = formik.values.code.split("");

      if (!codeArray[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }

      codeArray[index] = "";
      formik.setFieldValue("code", codeArray.join(""));
      formik.setFieldTouched("code", true);
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(paste)) return;

    const code = paste.padEnd(6, "").slice(0, 6);

    formik.setFieldValue("code", code);
    formik.setFieldTouched("code", true);

    code.split("").forEach((char, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = char;
      }
    });

    inputsRef.current[Math.min(code.length - 1, 5)]?.focus();
  };

  const { resendOtp, timer, isDisabled } = useResendOtp(email);

  return (
    <div className="w-full">
      <div className="w-full max-w-127.5 mx-auto form-container-shadow bg-[#0F172A66]">
        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full border border-[#10B77F1A] rounded-bl-none rounded-br-none border-b-[#0F172A66] p-8 lg:p-12 rounded-xl"
        >
          {/* Header */}
          <div className="w-full text-center space-y-4 pb-8">
            <Image
              src={"/reset-password-icon.svg"}
              alt="reset-password-icon"
              width={64}
              height={64}
              className="mx-auto"
            />
            <h1 className="text-(--light-gray) text-[30px] font-extrabold leading-none mb-3">
              Reset Password
            </h1>
            <p className="text-(--gray)">
              Secure your account by updating your credentials below.
            </p>
          </div>

          <Input
            label="Email Address"
            name="email"
            placeholder="name@gmail.com"
            icon="/email-gray-icon.svg"
            formik={formik}
          />

          {/* OTP */}
          <div className="w-full text-start mt-7">
            <label className="text-[#CBD5E1]">Verification Code</label>

            <div className="w-full flex items-center justify-between gap-3 mt-2">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={formik.values.code[i] || ""}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center border-2 rounded-lg bg-[#1E293B] border-[#334155] outline-none text-white"
                />
              ))}
            </div>

            {/* Error */}
            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500 text-xs mt-2">{formik.errors.code}</p>
            )}
          </div>

          {/* Footer */}
          <div className="w-full flex justify-center gap-2 mt-4 text-xs">
            <p className="text-(--gray)">
              We sent a 6-digit code to your email.
            </p>
            <button
              type="button"
              onClick={resendOtp}
              disabled={isDisabled}
              className={`font-bold ${
                isDisabled
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-(--primary)"
              }`}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </button>
            {/* <button
              type="button"
              onClick={handleResend}
              className="text-(--primary) font-bold"
            >
              Resend code{" "}
            </button> */}
          </div>

          <div className="w-full flex items-center justify-center gap-2 my-6">
            <div className="w-full border border-gray-800" />
            <div>
              <p className="text-(--gray) text-xs uppercase whitespace-nowrap bg-[#0F172A] p-1">
                new credentials
              </p>
            </div>
            <div className="w-full border border-gray-800" />
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mt-8">
            <PasswordInput
              label="New Password"
              name="password"
              icon="/gray-key-icon.svg"
              formik={formik}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              icon="/gray-safety-icon.svg"
              formik={formik}
            />
          </div>

          {/* Submit */}
          <div className="w-full mt-7">
            <Button
              type="submit"
              text="Reset Password"
              isLoading={formik.isSubmitting}
              textColor={`#fff`}
              icon="/right-arrow-white-icon.svg"
              disabled={!formik.isValid || formik.isSubmitting}
            />
          </div>
        </form>

        <div className="w-full bg-[#1E293B80] h-17.25 flex items-center justify-center rounded-b-lg">
          <Link
            href="/login"
            className="text-(--gray) text-sm font-medium flex justify-center gap-1"
          >
            <Image
              src={"/gray-left-icon.svg"}
              alt="gray-left-icon"
              width={12}
              height={12}
            />
            Back to login
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-4 mt-9">
        <p className="text-(--gray) text-sm flex items-center gap-1">
          <Image src={"/ssl-icon.svg"} alt="ssl-icon" width={14} height={14} />{" "}
          SSL Encrypted
        </p>
        <div className="w-2 h-2 rounded-full bg-gray-700" />
        <p className="text-(--gray) text-sm flex items-center gap-1">
          <Image src={"/pci-icon.svg"} alt="ssl-icon" width={10} height={13} />{" "}
          PCI Compliant
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
