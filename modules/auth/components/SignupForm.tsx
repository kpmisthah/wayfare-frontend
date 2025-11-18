"use client"
import { Signup } from '@/shared/components/common/Register'
import { signup } from '@/shared/services/auth.api'
export const handleUserSignup = async(data:{name?:string,password:string,role:string,email:string})=>{
  await signup(data)
}
const SignupForm = () => {
  return (
    <Signup 
    role='USER'
    // redirectUrl='/otp'
    redirectLogin='otp'
    onSubmit={handleUserSignup}
    />
  )
}

export default SignupForm