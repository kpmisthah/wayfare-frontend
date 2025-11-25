import { resetPassword } from "@/shared/services/auth.api"
import ResetPasswordPage from "@/shared/components/common/Reset-password"

export const UserResetPassword = ()=>{
    return(
        <>
        <ResetPasswordPage 
        resetFun={resetPassword}
        redirectPath="/"
        />
        </>
    )
}