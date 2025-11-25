import { fetchUser, resetPassword } from "../services/auth.api";
import { ErrorMessages, ResetProps } from "../types/auth.type";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";

export const useResetPassword = (redirectPath:string) => {
  console.log(redirectPath,'redirect path for reset password login in frontend useResetPassword Hook');
  
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
    if (!newPassword) newErrors.password = "Password is required";
    if (newPassword != confirmPassword)
    newErrors.confirmPassword = "password is not matching";
    if (newPassword.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    if (!/[A-Z]/.test(newPassword))
      newErrors.password =
        "Password must include at least one uppercase letter";
    if (!/[a-z]/.test(newPassword))
      newErrors.password =
        "Password must include at least one lowercase letter";
    if (!/\d/.test(newPassword))
      newErrors.password = "Password must include at least one number";
    setIsLoading(true);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    const email = localStorage.getItem("resetEmail");
      if (!email) {
      setErrors({session_expired:"Session expired. Please start over."});
      router.push("/forgot-password");
      return;
    }
    try {
      // const user = await fetchUser();
      // console.log(user,'user fetch from reset password')
      // if (!user?.email) throw new Error("Email not found");
      const response = await resetPassword(email, newPassword);
      console.log(response,'response from reset password front end');
      // const userData = await fetchUser()
      // console.log(userData,'suerdata')
      setAuthUser(response.user)
      // const{user} = useAuthStore()
      console.log('user store',response.user)
      localStorage.removeItem("resetEmail");
      router.push(redirectPath)
    } catch (error: any) {
      console.error(error);
      setErrors({ general: error.message || "Something went wrong" });
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
