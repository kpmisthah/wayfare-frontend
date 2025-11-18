import api from "@/lib/api"
import { BookingStatus } from "../types/booking.enum"

export const bookPackage = async(data:{
    packageId:string,
    travelDate:string| null,
    peopleCount:number|null,
    totalAmount:number,
    paymentType:string
})=>{
    try {
        const response = await api.post('/booking/package',data)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchBookingByAgency = async()=>{
    try {
        const response = await api.get('/booking/get-bookings')
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export const updateBookingStatus = async (id: string, status: BookingStatus) => {
  try {
    const response = await api.patch(`/booking/update-status/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating booking status", error);
    throw error;
  }
};

export const fetchShortTripDetails = async () =>{
    try {
        const response = await api.get('/trip')
        console.log(response,'response frmo fetchShortTripDetils')
        return response.data
    } catch (error) {
        console.log(error,'Error');
        
    }
}

export const fetchBookingsByPackage = async(packageId:string)=>{
    try {
        const response = await api.get(`/booking/${packageId}/bookings`)
        return response.data
    }catch(error){
        console.log(error,'Error')
    }
}