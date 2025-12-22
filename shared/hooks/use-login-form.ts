import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import { fetchUser, login, googleLogin } from "../services/auth.api";
import { LoginForm, ErrorMessages, UseSignupProps } from "../types/auth.type";
import { getPasswordError } from "../utils/password-validation";

export const useLoginForm = ({ role = 'USER', onSubmit, redirectLogin }: UseSignupProps) => {
  const [loginData, setLoginData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorMessages>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthUser } = useAuthStore();
  const router = useRouter();

  const handleLoginSubmit = async () => {
    const newErrors: ErrorMessages = {};

    // Email validation
    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation using centralized utility (matches signup requirements)
    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = getPasswordError(loginData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});

    try {

      await onSubmit({ ...loginData, role })
      const user = await fetchUser();
      setAuthUser(user);
      router.replace(redirectLogin)
    } catch (error) {
      const err = error as { response?: { data?: { message?: string }; message?: string; status?: number }; message?: string };
      const message =
        err?.response?.data?.message ||
        err?.response?.message ||
        err?.message ||
        "Login failed. Please try again";
      if (err?.response?.status === 403 || message.toLowerCase().includes("token")) {
        setErrors({
          general: "Your account has been blocked by the admin. Please contact support.",
        });
      } else {
        setErrors({ general: message });
      }

    } finally {
      setIsLoading(false);
    }
  };
  const handleSocialSignup = async () => {
    setIsLoading(true);
    googleLogin();
  };

  return {
    loginData,
    setLoginData,
    errors,
    setErrors,
    isLoading,
    showPassword,
    setShowPassword,
    handleLoginSubmit,
    handleSocialSignup,
    useAuthStore
  }
};