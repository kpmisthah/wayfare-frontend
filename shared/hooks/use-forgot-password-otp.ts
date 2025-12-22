
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { verifyForgotPassword, fetchUser, verifyOtp } from "../services/auth.api";
interface ResendOTPRequest {
  email: string;
}
interface APIResponse {
  success: boolean;
  message: string;
  data?: unknown;
}
export const useForgotPasswordOtp = (userEmail: string, redirectUrl: string) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isResending, setIsResending] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  // const {setAuthUser} = useAuthStore()
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChangeOtp = (index: number, value: string): void => {
    if (value.length > 1) return;

    // Clear any existing errors
    setError("");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDownOtp = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePasteOtp = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
  };

  const handleVerifyForgotPassword = async (): Promise<void> => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setIsLoading(true);
      setError("");

      try {
        let result = await verifyForgotPassword({ otp: otpCode, email: userEmail });
        // const user = await fetchUser()
        // setAuthUser(user)
        // router.push('/reset-password')
        router.push(redirectUrl);
      } catch (err) {
        setError("Invalid Otp");
        console.error("OTP verification error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    setIsResending(true);
    setError("");

    try {
      // Import forgotPassword from auth.api
      const { forgotPassword } = await import("../services/auth.api");

      // Resend forgot password OTP by calling forgotPassword again
      await forgotPassword(userEmail);

      setTimeLeft(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus(); // Focus first input
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("OTP resend error:", err);
    } finally {
      setIsResending(false);
    }
  };


  const handleBack = (): void => {
    // Navigate back to login page
    // You can use Next.js router here:
    // router.back();
  };

  const isCompleteOtp = otp.every((digit) => digit !== "");

  // Mask email for display
  const maskedEmail = userEmail.replace(/(.{2})(.*)(@.*)/, "$1***$3");
  return {
    handleBack,
    maskedEmail,
    error,
    otp,
    inputRefs,
    handleChangeOtp,
    handleKeyDownOtp,
    handlePasteOtp,
    isLoading,
    canResend,
    handleResendOtp,
    isResending,
    handleVerifyForgotPassword,
    isCompleteOtp,
    timeLeft
  }
};
