import api from "@/lib/api"
export const getFinance = async()=>{
    try {
        const response = await api.get('/admin/finance/dashboard')
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

export const getAgencyRevenue = async()=>{
    try {
        const response = await api.get('/admin/finance/agency')
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}