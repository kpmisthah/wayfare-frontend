import api from "@/lib/api";


export const sendConnectionRequest = async (receiverId: string) => {
    try {
        console.log(receiverId, 'receiverId in sendConnectionRequest');
        const response = await api.post(`/connections/${receiverId}`)
        return response.data
    } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.response?.data || 'Failed to send connection request'
        console.error('Connection request failed:', errorMessage)
        throw new Error(errorMessage)
    }
}