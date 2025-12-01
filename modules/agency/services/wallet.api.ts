import api from "@/lib/api"

export const wallet = async ()=>{
    const response = await api.get('/agency/wallet')
    return response.data
}

export const getRecentWalletTx = async ()=> {
  const res = await api.get("/agency/recent-booking");
  return res.data;
};