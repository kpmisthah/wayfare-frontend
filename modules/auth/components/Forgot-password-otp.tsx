"use client"
import ForgotPasswordOtp from "@/shared/components/common/Frogot-password-otp"
import { useSearchParams } from "next/navigation"

export const UserForgotPasswordOtp = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    return (
        <ForgotPasswordOtp
            userEmail={email}
            redirectUrl="/reset-password"
        />
    )
}