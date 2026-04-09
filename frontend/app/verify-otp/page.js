import React from "react";
import VerifyOtpForm from "./_components/verify-otp-form";

export const metadata = {
  title: "Verify OTP",
  description: "Verify OTP page",
};

const page = async () => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-5">
      <VerifyOtpForm />
    </main>
  );
};

export default page;
