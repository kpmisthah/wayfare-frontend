import { useState } from "react";
import { forgotPassword } from "../services/auth.api";
import { useRouter } from "next/navigation";

export const useForgotPassword = (redirectUrl: string) => {
  console.log(redirectUrl, 'in userHooks');

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const router = useRouter();

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotPasswordError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotPasswordError("Please enter a valid email address");
      return;
    }

    setForgotPasswordLoading(true);
    setForgotPasswordError("");

    try {
      await forgotPassword(forgotEmail);
      localStorage.setItem('resetEmail', forgotEmail)
      setForgotPasswordSuccess(true);
      // Redirect to OTP verification page, not directly to reset password
      router.push(`${redirectUrl}?email=${encodeURIComponent(forgotEmail)}`);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string }; message?: string }; message?: string };
      const message =
        err?.response?.data?.message ||
        err?.response?.message ||
        err?.message ||
        "The Email didnt Exist";

      setForgotPasswordError(message);
    }
  };

  const resetForgotPasswordModal = () => {
    setForgotEmail("");
    setForgotPasswordError("");
    setForgotPasswordSuccess(false);
    setForgotPasswordLoading(false);
  };
  return {
    showForgotPassword,
    setShowForgotPassword,
    forgotEmail,
    setForgotEmail,
    forgotPasswordLoading,
    forgotPasswordSuccess,
    forgotPasswordError,
    handleForgotPassword,
    resetForgotPasswordModal,
  };
};
