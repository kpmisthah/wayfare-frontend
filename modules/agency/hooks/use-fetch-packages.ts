'use client'
import { useEffect, useState } from "react"
import { fetchPackages } from "../services/package.api";
import { PackageData, PackageListing } from "../types/package.type";
export const useFetchPackages = ()=>{
    const[packages,setPackages] = useState<PackageData[]>([])
    const[page,setPage] = useState(1)
    const[totalPage,setTotalPage] = useState(1)
    const limit = 100
    useEffect(()=>{
        const loadPackages = async ()=>{
            const data = await fetchPackages(page,limit)
            setPackages(data.items)
            setTotalPage(data.totalPages)
        }
        loadPackages()
    },[page,limit])
    const nextPage = ()=> page<totalPage && setPage(prev=>prev+1)
    const prevPage = ()=>page>1 && setPage(prev=>prev-1)
    return{
        packages,
        setPackages,
        nextPage,
        prevPage,
        setPage,
        page,
        totalPage
    }
}