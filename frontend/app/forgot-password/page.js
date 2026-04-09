import React from "react";
import ForgotPasswordForm from "./_components/forgot-password-form";

export const metadata = {
  title: "Forgot Password",
  description: "Forgot password page",
};

const page = () => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-5">
      <ForgotPasswordForm />
    </main>
  );
};

export default page;
