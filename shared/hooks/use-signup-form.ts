import { useState } from "react";
import { ErrorMessages, SignupForm, UseSignupProps } from "../types/auth.type";
import { useRouter } from "next/navigation";
import { getPasswordError } from "../utils/password-validation";

export const useSignup = ({ role = 'USER', redirectLogin, onSubmit }: UseSignupProps) => {
  const [signupData, setSignupData] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<ErrorMessages>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignupSubmit = async () => {
    const newErrors: ErrorMessages = {};

    // Name validation
    if (!signupData.name) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!signupData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation using centralized utility
    if (!signupData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = getPasswordError(signupData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    // Confirm password validation
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!signupData.agreeToTerms) {
      newErrors.terms = "You must agree to the terms";
    }

    // Mobile validation for Agency
    if (role === 'AGENCY') {
      if (!signupData.mobile) {
        newErrors.mobile = "Phone number is required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await onSubmit({ ...signupData, role });
      router.push(`/${redirectLogin}?email=${encodeURIComponent(signupData.email)}`);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setErrors({ general: err?.response?.data?.message || "Signup failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signupData,
    setSignupData,
    errors,
    setErrors,
    isLoading,
    handleSignupSubmit
  };
};

