import api from "@/lib/api";

export const listDestinations = async()=>{
    try {
        const response = await api.get('/agency/trending/packages')
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}   