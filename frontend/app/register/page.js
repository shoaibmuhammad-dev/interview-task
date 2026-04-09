import React from "react";
import RegisterForm from "./_components/register-form";

export const metadata = {
  title: "Register Password",
  description: "Register page",
};

const page = () => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-5">
      <RegisterForm />
    </main>
  );
};

export default page;
