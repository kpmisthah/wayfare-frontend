"use client"

import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React, { JSX, useEffect } from "react";
export function withAuth<T extends object>(WrapComponent:React.ComponentType<T>){

    return (props: T)=>{
    const router = useRouter()
    const {isAuthenticated} = useAuthStore()        
        useEffect(()=>{
            if(!isAuthenticated){
                router.push('/login')
            }
        },[isAuthenticated,router])
        if(isAuthenticated){
            return <WrapComponent {...props}/>
        }else{
            return null
        }
    }
}