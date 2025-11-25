import api from "@/lib/api";

export const matchedConnection = async()=>{
    try {
        const response = await api.get('/travellers')
        return response.data
    } catch (error) {
        console.log(error); 
    }
}