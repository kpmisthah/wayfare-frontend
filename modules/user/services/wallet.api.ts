import api from "@/lib/api"

export const getWallet = async()=>{
    try {
        const response = await api.get('/wallet')
        return response.data.balance
    } catch (error) {
        console.log(error);
        
    }
}