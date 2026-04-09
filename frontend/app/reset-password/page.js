import React from "react";
import ResetPasswordForm from "./_components/reset-password-form";

export const metadata = {
  title: "Reset Password",
  description: "Reset password page",
};

const page = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-5 pt-20 pb-12">
      <ResetPasswordForm />
    </main>
  );
};

export default page;
