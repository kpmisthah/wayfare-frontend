import api from "@/lib/api";

export const fetchTravellersData = async(destination:string)=>{
    try {
        let response = await api.get(`/travellers/same-destination?destination=${destination}`)
        return response.data
    } catch (error) {
        
    }
}