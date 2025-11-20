import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import { fetchUser, login, googleLogin } from "../services/auth.api";
import { LoginForm, ErrorMessages, UseSignupProps } from "../types/auth.type";

export const useLoginForm = ({role='USER',onSubmit,redirectLogin}:UseSignupProps) => {
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

    if (!loginData.email) {
      newErrors.email = "Email is required";
    }else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
        newErrors.email = "Please enter a valid email address"
    }
    if (!loginData.password) newErrors.password = "Password is required";
    if (loginData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
     if (!/[A-Z]/.test(loginData.password))
      newErrors.password =
        "Password must include at least one uppercase letter";
    if (!/[a-z]/.test(loginData.password))
      newErrors.password =
        "Password must include at least one lowercase letter";
    if (!/\d/.test(loginData.password))
      newErrors.password = "Password must include at least one number";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});

    try {

      await onSubmit({...loginData,role})
      const user = await fetchUser();
      console.log(user,'login user admin or user')
      console.log(user.role, "user role");
      setAuthUser(user);
      router.replace(redirectLogin)
    } catch (error: any) {
      const message =
        error?.response?.data.message ||
        error?.response?.message ||
        error?.message ||
        "Login failed. Please try again";
        console.log(message,'error message in login hook')
      if (error?.response?.status === 403 || message.toLowerCase().includes("token")) {
      setErrors({
        general: "Your account has been blocked by the admin. Please contact support.",
      });
    }else{
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