'use client'
import { Login } from "@/shared/components/common/Login"
import { login } from "@/shared/services/auth.api"

const AdminLogin = () => {
    const handleAdminLogin = async(data:{email:string,password:string,role:string})=>{
        await login(data)
    }
    return (
        <>
        <Login 
        role='ADMIN'
        redirectUrl="/forgot-password-otp"
        redirectLogin="/admin/dashboard"
        onSubmit={handleAdminLogin}
        />
        </>
    )
}

export default AdminLogin