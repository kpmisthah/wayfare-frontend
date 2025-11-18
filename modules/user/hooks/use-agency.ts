
import { useEffect, useState } from "react";
import { Agency } from "../types/agency.type";
import { getAgencies } from "@/modules/admin/services/agency.service";
import { Package, PackagesResponse } from "../types/package.type";
import { fetchAgencyPackages, fetchPackagesById } from "../services/agency-packages.api";
import { fetchAgencyById } from "@/modules/agency/services/agency.api";
import { listAgencies, searchListAgencies } from "../services/agency-list.api";

export const useAgencies = ()=>{
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");  
  const [agencies,setAgencies] = useState<Agency[]>([])
  // const [agency,setAgency] = useState<Agency>()
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  useEffect(() => {
    const handler = setTimeout(()=>{
    const fetchAgencies = async () => {
        const response = await searchListAgencies(searchTerm,page,limit);
        setAgencies(response.data)
        setTotalPages(response.totalPages)
    };
    fetchAgencies();      
    },500)
    return ()=>clearTimeout(handler)
  }, [searchTerm,page]);
  useEffect(()=>{
    console.log(agencies,'agenciessss')
  },[])
    const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    agencies,
    page,
    totalPages,
    nextPage,
    prevPage
    // agency,
    // setAgency
  }
}
export const useAgencyById = (id:string)=>{
  const[agency,setAgency] = useState<Agency>()
  useEffect(()=>{
    const fetchAgency = async ()=>{
      const data = await fetchAgencyById(id)
      setAgency(data)
    }
    fetchAgency()
  },[])
  return {
    agency,
    setAgency

  }
}
export const usePackages = (id:string)=>{
  const [packages,setPackages] = useState<Package[]>([])
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(1)
  const limit = 6
  useEffect(()=>{
    const fetchPackages = async ()=>{
      const res = await fetchAgencyPackages(id,page,limit)
       console.log(res.data,'fetch-agency-packages') 
        setPackages((prev)=>[...prev,...res.data]) 
        setTotalPages(res.totalPages)
    }
    fetchPackages()
  },[page,id])
  // useEffect(()=>{
  //   console.log(page,'pageeeee haahaahaa');
  //   console.log(totalPages,'totalPagessss');
    
  // },[page,totalPages])
 
  const loadMore = ()=>{
    if(page<totalPages) setPage(prev=>prev+1)
  }
  return{
    packages,
    setPackages,
    loadMore,
    page,
    totalPages
  }
}

export const usePackage = (id:string) =>{
  const[packageById,setPackageById] = useState<Package|null>(null)
  const[isLoading,setIsLoading] = useState(true)
  useEffect(()=>{
    const fetchPackage = async () =>{
      try {
      setIsLoading(true)  
      const data = await fetchPackagesById(id)
      setPackageById(data)          
      } catch (error) {
        console.log(error)
      }finally {
        setIsLoading(false)
      }
    }
    fetchPackage()
  },[id])
  return {
    packageById,
    isLoading
  }
}