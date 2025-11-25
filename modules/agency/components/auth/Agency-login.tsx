'use client'
import { Login } from "@/shared/components/common/Login";
import { login } from "@/shared/services/auth.api";

export const AgencyLogin = ()=> {
    const handleAgencyLogin = async (data:{email:string,password:string,role:string})=>{
        console.log('password for agency login bro',data.password);
        
        await login(data)
    }
    return(
        <>
        <Login 
        role='AGENCY'
        redirectUrl='/agency/forgot-password-otp'
        redirectLogin = '/agency'
        onSubmit = {handleAgencyLogin}
        />
        </>
    )
}