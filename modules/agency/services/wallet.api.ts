import api from "@/lib/api"

export const wallet = async () => {
  const response = await api.get('/agency/wallet', {
    // @ts-ignore - custom config to suppress error toasts for expected 404s
    silentError: true
  })
  return response.data
}

export const getRecentWalletTx = async () => {
  const res = await api.get("/agency/recent-booking", {
    // @ts-ignore - custom config to suppress error toasts for expected 404s
    silentError: true
  });
  return res.data;
};