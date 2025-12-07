import ForgotPasswordOtp from "@/shared/components/common/Frogot-password-otp"

export const UserForgotPassword = ({ email }: { email: string })=>{
    return(
        <ForgotPasswordOtp userEmail={email} redirectUrl="/reset-password"/>
    )
}