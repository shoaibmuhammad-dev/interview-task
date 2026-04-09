"use client";

import React, { useRef, useState } from "react";
import Input from "./Input";
import { useFormik } from "formik";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { verifyOtp } from "@/services/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useResendOtp } from "@/hooks/resent-otp";
import { verifyOtpSchema } from "../_validation/verifyOtpSchema";
import api from "@/lib/api";

const VerifyOtpForm = () => {
  const inputsRef = useRef([]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: searchParams.get("email") || "",
      code: "",
    },
    validationSchema: verifyOtpSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const data = await api.post("/auth/verify-otp", {
          email: values.email,
          otp: values.code,
        });
        console.log("verify otp >>> ", data);
        if (data.data.success) {
          alert("OTP has been verified successfully");
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const codeArray = formik.values.code.split("");
    codeArray[index] = value;

    const newCode = codeArray.join("");
    formik.setFieldValue("code", newCode);

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
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    formik.setFieldValue("code", paste);

    paste.split("").forEach((char, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = char;
      }
    });

    inputsRef.current[paste.length - 1]?.focus();
  };

  const { resendOtp, timer, isDisabled } = useResendOtp(email);

  return (
    <div className="w-full max-w-120 mx-auto border border-[#10B77F33] p-8 lg:p-12 rounded-xl form-container-shadow bg-[#10B77F0D]">
      {/* Header */}
      <div className="w-full text-center space-y-4">
        <Image
          src={"/verify-otp-email-icon.svg"}
          alt="verify-otp-email-icon"
          width={64}
          height={64}
          className="mx-auto"
        />
        <h1 className="text-(--light-gray) text-[30px] font-extrabold leading-none mb-3">
          Verify OTP
        </h1>
        <p className="text-(--gray)">
          We've sent a 6-digit verification code to your email address. Please
          enter it below to continue.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="mt-10">
        <Input
          label="Verification Email"
          name="email"
          placeholder="name@gmail.com"
          icon="/email-gray-icon.svg"
          formik={formik}
        />

        {/* OTP */}
        <div className="w-full text-center mt-7">
          <label className="text-(--gray)">Enter 6-digit code</label>

          <div className="w-full grid grid-cols-6 gap-3 mt-2">
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
                className="w-full text-center border-2 h-13.25 rounded-lg border-[#10B77F33] outline-none text-white"
              />
            ))}
          </div>

          {/* Error */}
          {formik.touched.code && formik.errors.code && (
            <p className="text-red-500 text-xs mt-2">{formik.errors.code}</p>
          )}
        </div>

        {/* Submit */}
        <div className="w-full mt-7">
          <Button
            type="submit"
            text="Verify Account"
            isLoading={loading}
            textColor={`#fff`}
            icon="/right-arrow-white-icon.svg"
          />
        </div>
      </form>

      {/* Footer */}
      <div className="w-full flex justify-center gap-2 mt-8">
        <p className="text-(--gray)">Didn't receive the code?</p>
        <button
          type="button"
          onClick={resendOtp}
          disabled={isDisabled}
          className={`font-bold ${
            isDisabled ? "text-gray-500 cursor-not-allowed" : "text-(--primary)"
          }`}
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
        </button>
      </div>

      <Link
        href="/login"
        className="text-[#64748B] text-xs flex justify-center mt-5 gap-1"
      >
        <Image src={"/back-icon.svg"} alt="back-icon" width={10} height={10} />
        Back to login
      </Link>
    </div>
  );
};

export default VerifyOtpForm;
