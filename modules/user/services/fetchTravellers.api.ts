import api from "@/lib/api";

export const fetchTravellersData = async(destination:string)=>{
    try {
        let response = await api.get(`/travellers/same-destination?destination=${destination}`)
        console.log(response.data,'in fetfchTravllers api');
        return response.data
    } catch (error) {
        console.log(error,'error');
        
    }
}