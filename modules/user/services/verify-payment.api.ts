import api from "@/lib/api"

export const verifyPayment = async(bookingId:string)=>{
    try {
    let result = await api.get(`/payment/${bookingId}`)
    console.log(result.data,'result.........')
    return result.data
    } catch (error) {
        console.log(error)
    }
}