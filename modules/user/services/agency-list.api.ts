import api from "@/lib/api";
export const listAgencies = async(page:string,limit:string)=>{
    try {
        const response = await api.get(`/agency?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        console.log(error);  
    }
}

export const searchListAgencies = async (searchTerm:string,page:number,limit:number,sortBy:string)=>{
    try {
        const response = await api.get(`/agency/search?q=${searchTerm}&page=${page}&limit=${limit}&sortBy=${sortBy}`)
        console.log(response.data,'in ferch cheyth kondennapo entha smbaviche noka')
        return response.data
    } catch (error) {
        
    }
}