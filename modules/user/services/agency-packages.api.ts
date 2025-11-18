import api from "@/lib/api";

export const fetchAgencyPackages = async (agencyId:string,page=1,limit=1)=>{
    try {
        const response = await api.get(`/agency/${agencyId}/packages?page=${page}&limit=${limit}`)
        console.log(response.data,'response form fetch agency packages');
        
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchPackagesById = async (id:string)=>{
    try {
        const response = await api.get(`/agency/${id}/package-details`)
        console.log(response,'reposne from id of fetchPalcacakge');
        
        return response.data
    } catch (error) {
        console.log(error);
    }
}