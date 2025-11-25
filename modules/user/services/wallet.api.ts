import api from "@/lib/api"

export const getWallet = async()=>{
    try {
        const response = await api.get('/wallet')
        return response.data.balance
    } catch (error) {
        console.log(error);
        
    }
}

export const getWalletTransaction = async ()=>{
    try {
        const response = await api.get('/wallet/transactions')
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}