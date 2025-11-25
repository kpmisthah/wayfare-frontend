import api from "@/lib/api";

export const fetchPreferences = async ()=>{
    try {
        const response = await api.get('/admin/preferences')
        return response.data
    } catch (error) {
        console.log(error,'error');
        throw error
    }
}