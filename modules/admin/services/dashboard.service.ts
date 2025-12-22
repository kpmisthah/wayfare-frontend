import api from "@/lib/api";


export const getDashboard = async () => {
  try {

    const response = await api.get("/admin/summary");
    return response.data;
  } catch (error) {
  }
};

export const getRecentBookings = async ()=>{
  try {
    const response = await api.get('/admin/recent-bookings')
    return response.data
  } catch (error) {
    
  }
}
