import { resetPassword } from "../services/auth.api";
import { ErrorMessages } from "../types/auth.type";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import { getPasswordError } from "../utils/password-validation";

export const useResetPassword = (redirectPath: string) => {
  console.log(redirectPath, 'redirect path for reset password');

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorMessages>({});

  const { setAuthUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async () => {
    const newErrors: ErrorMessages = {};

    // Password validation using centralized utility
    if (!newPassword) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = getPasswordError(newPassword);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    // Confirm password validation
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const email = localStorage.getItem("resetEmail");
    if (!email) {
      setErrors({ session_expired: "Session expired. Please start over." });
      router.push("/forgot-password");
      return;
    }

    try {
      const response = await resetPassword(email, newPassword);
      console.log(response, 'response from reset password');
      setAuthUser(response.user);
      console.log('user store', response.user);
      localStorage.removeItem("resetEmail");
      router.push(redirectPath);
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setErrors({ general: err.message || "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    setNewPassword,
    setConfirmPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    errors,
    handleSubmit,
    confirmPassword,
    newPassword,
  };
};

