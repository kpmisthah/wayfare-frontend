import { useEffect, useState } from "react"
import { listDestinations } from "../services/destination-lilst.api"
import { Destination } from "../types/destination.type"

export const useDestinations = ()=>{
    const[popularDestinations,setPopularDestinations]   = useState<Destination[]>([])
    useEffect(()=>{
        const fetchDestinations = async()=>{
            const data = await listDestinations()
            setPopularDestinations(data)
        }
        fetchDestinations()
    },[])
    return {
        popularDestinations
    }   
}