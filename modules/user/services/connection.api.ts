import api from "@/lib/api";

export const sendConnectionRequest = async(receiverId:string)=>{
    try {
        console.log(receiverId,'recieverId in sendConnectionRequest');
        const response = await api.post(`/connections/${receiverId}`)
        return response.data
    } catch (err:any) {
        alert(err.response?.data)
    }
}