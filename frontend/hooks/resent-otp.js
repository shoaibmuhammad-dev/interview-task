"use client";

import { useEffect, useState } from "react";
import { forgotPassword } from "@/services/authApi";

export const useResendOtp = (email) => {
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const resendOtp = async () => {
    if (timer > 0) return;
    if (!email) return alert("Email not found");

    try {
      setLoading(true);
      await forgotPassword({ email });

      alert("OTP sent");
      setTimer(60);
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    resendOtp,
    timer,
    loading,
    isDisabled: timer > 0 || loading,
  };
};
