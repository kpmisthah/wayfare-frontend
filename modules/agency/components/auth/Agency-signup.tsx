"use client"
import { Signup } from '@/shared/components/common/Register'
import { signup } from '@/shared/services/auth.api'
import React from 'react'

export const handleAgencySignup = async(data:{name?:string,password:string,role:string,email:string})=>{
  console.log(data,'data frmo handleAgencySignup');
  
  await signup(data)
}
const AgencySignup = () => {
  return (
    <>
    <Signup 
    role='AGENCY'
    redirectLogin='agency/otp'
    onSubmit={handleAgencySignup}
    />
    </>
  )
}

export default AgencySignup