import api from "@/lib/api"

export const getWallet = async () => {
    try {
        const response = await api.get('/wallet');
        return response.data.balance;
    } catch (error) {
        console.error('Failed to fetch wallet:', error);
        throw error;
    }
};

export const getWalletTransaction = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await api.get(`/wallet/transactions?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch wallet transactions:', error);
        throw error;
    }
};