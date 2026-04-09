"use client";

import React from "react";
import Input from "./Input";
import { useFormik } from "formik";
import PasswordInput from "./PasswordInput";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { loginSchema } from "../_validation/loginSchema";
import { login } from "@/services/authApi";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";
import api from "@/lib/api";

const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await api.post("/auth/login", values);
        console.log("login data >>> ", data);
        if (data?.data?.success) {
          // setToken(data?.data?.accessToken);
          router.push("/");
        }
      } catch (err) {
        console.log("login error >>> ", err);
        alert(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-120 mx-auto py-20">
      <div className="w-full text-center space-y-4">
        <Image
          src={"/login-page-logo.svg"}
          alt="login-page-logo"
          width={64}
          height={64}
          className="mx-auto"
        />
        <h1 className="text-(--light-gray) text-[30px] font-extrabold leading-none mb-3">
          Uptrix
        </h1>
        <p className="text-(--gray)">Welcome back to your dashboard</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="mt-10 space-y-4 border border-[#1E293B] bg-[#0F172A80] p-8 rounded-xl form-container-shadow"
      >
        <Input
          label="Email address"
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

        <div className="w-full flex items-center gap-1">
          <input
            type="checkbox"
            name="keepLoggedin"
            id="keepLoggedin"
            className="w-4 h-4 accent-[#10B77F] bg-transparent"
          />
          <label htmlFor="keepLoggedin" className="text-sm text-(--gray)">
            Keep me logged in
          </label>
        </div>

        <div className="w-full mt-7">
          <Button
            type={"submit"}
            text={"Sign In"}
            isLoading={false}
            textColor={`#fff`}
            icon={`/right-arrow-white-icon.svg`}
          />
        </div>

        <div className="w-full flex items-center justify-center gap-2 my-8">
          <div className="w-full border border-gray-800" />
          <div>
            <p className="text-(--gray) text-xs uppercase whitespace-nowrap">
              or continue with
            </p>
          </div>
          <div className="w-full border border-gray-800" />
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <button
            type="button"
            className="w-full h-11 text-white border border-[#1E293B] rounded-lg flex items-center justify-center gap-2"
          >
            <div className="w-5 h-5 bg-gray-100" />
            Google
          </button>
          <button
            type="button"
            className="w-full h-11 text-white border border-[#1E293B] rounded-lg flex items-center justify-center gap-2"
          >
            <div className="w-5 h-5 bg-gray-100" />
            Apple
          </button>
        </div>
      </form>

      <div className="w-full flex items-center justify-center gap-2 mt-8">
        <p className="text-(--gray)">Don't have an account?</p>
        <Link href={"/register"} className="text-(--primary) font-semibold">
          Create an account
        </Link>
      </div>

      <div className="w-full">
        <ul className="flex items-center justify-between flex-wrap gap-3 text-(--gray) text-xs mt-10 px-10">
          {["Privady Policy", "Terms of Service", "Contact Support"].map(
            (t, i) => {
              return <li key={i}>{t}</li>;
            },
          )}
        </ul>
      </div>
    </div>
  );
};

export default LoginForm;
