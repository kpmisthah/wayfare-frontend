import { useEffect, useState } from "react"
import { fetchAgencyProfile } from "../services/package.api"
export interface userProfile {
    name:string
    email:string
    phone:string
    specialization:string[]
    description:string
}
export const useFetchProfile = ()=>{
      const [profileData, setProfileData] = useState<userProfile | null>(null);
    useEffect(()=>{
        const loadProfile = async()=>{
            const data = await fetchAgencyProfile()
            setProfileData(data)
        }
        loadProfile()
    },[])

    return {
        profileData
    }
}
