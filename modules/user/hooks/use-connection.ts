"use client"
import { useEffect, useState } from "react"
import { Travellers } from "../types/Ai-trip-plan.type"
import { matchedConnection } from "../services/matched-connection.api"

export const useMatchedTravellers = ()=>{
    const [travelers,setTravellers] = useState<Travellers[]>([])
    
    useEffect(()=>{
        const fetchMatchedTravellers = async()=>{
            const result = await matchedConnection()
            setTravellers(result)
        }
        fetchMatchedTravellers()
    },[])
    return {
        travelers
    }
}