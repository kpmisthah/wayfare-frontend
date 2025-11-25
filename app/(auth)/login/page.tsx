"use client"
import { Login } from "@/shared/components/common/Login"
import { login } from "@/shared/services/auth.api"


export default function LoginPage() {
  const handleUserLogin = async (data:{email:string,password:string,role:string})=>{
          await login(data)
      }
  return (
    <>
    <Login 
    role='USER'
    redirectUrl='/forgot-password-otp'
    redirectLogin='/'
    onSubmit={handleUserLogin}
    />
    </>
  )
}
