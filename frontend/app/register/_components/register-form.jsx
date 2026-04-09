"use client";

import React from "react";
import Input from "../../../components/ui/Input";
import { useFormik } from "formik";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { signupSchema } from "../_validation/signupSchema";
import { register } from "@/services/authApi";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const RegisterForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await api.post("/auth/register", {
          name: values.fullName,
          email: values.email,
          password: values.password,
        });
        console.log(data);

        router.push(`/verify-otp?email=${values.email}`);
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-120 mx-auto border border-[#10B77F33] p-8 lg:p-12 rounded-xl form-container-shadow">
      <div className="w-full">
        <h1 className="text-(--light-gray) text-[30px] font-extrabold leading-none mb-3">
          Create Account
        </h1>
        <p className="text-(--primary-text)">
          Join Uptrix today and start building.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-10 space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          icon="/user-icon.svg"
          formik={formik}
        />

        <Input
          label="Email Address"
          name="email"
          placeholder="name@example.com"
          icon="/email-icon.svg"
          formik={formik}
        />

        <PasswordInput
          label="Password"
          name="password"
          icon="/lock-icon.svg"
          formik={formik}
        />

        <div className="w-full mt-7">
          <Button
            type={"submit"}
            text={"Get Started"}
            isLoading={false}
            icon={`/black-right-icon.svg`}
          />
        </div>
      </form>

      <div className="w-full border border-[#10B77F1A] mt-10" />

      <div className="w-full flex items-center justify-center gap-2 mt-8">
        <p className="text-(--gray)">Already have an account?</p>
        <Link href={"/login"} className="text-(--primary) font-bold">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
