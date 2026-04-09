import React from "react";
import LoginForm from "./_components/login-form";

export const metadata = {
  title: "Login",
  description: "Login page",
};

const page = () => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-5">
      <LoginForm />
    </main>
  );
};

export default page;
