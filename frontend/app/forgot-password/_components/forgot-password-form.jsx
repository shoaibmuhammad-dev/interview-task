"use client";

import React from "react";
import Input from "./Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import Message from "./message";
import { forgotPassword } from "@/services/authApi";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const verifyOtpSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: verifyOtpSchema,
    onSubmit: async (values) => {
      try {
        const data = await api.post("/auth/forgot-password", {
          email: values.email,
        });
        console.log("data >>> ", data);
        if (data?.data?.success) {
          router.push(`/reset-password?email=${values.email}`);
        }
      } catch (err) {
        console.log("error >>> ", err);
        alert(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto border border-[#10B77F33] p-8 lg:p-12 rounded-xl form-container-shadow bg-[#10B77F0D]">
      {/* Header */}
      <div className="w-full text-center space-y-4">
        <Image
          src={"/forgot-password-icon.svg"}
          alt="forgot-password-icon"
          width={64}
          height={48}
          className="mx-auto"
        />
        <h1 className="text-(--light-gray) text-[30px] font-extrabold leading-none my-3">
          Forgot password?
        </h1>
        <p className="text-(--gray)">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <Message />

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="mt-7">
        <Input
          label="Email Address"
          name="email"
          placeholder="name@gmail.com"
          icon="/email-gray-icon.svg"
          formik={formik}
        />

        {/* Submit */}
        <div className="w-full mt-7">
          <Button
            type="submit"
            text="Send reset code"
            isLoading={false}
            textColor={`#fff`}
            icon="/right-arrow-white-icon.svg"
          />
        </div>
      </form>

      <Link
        href="/login"
        className="text-(--primary) text-sm font-semibold flex justify-center mt-7 gap-1"
      >
        <Image
          src={"/green-left-arrow.svg"}
          alt="green-left-arrow"
          width={12}
          height={12}
        />
        Back to login
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
