import api from "@/lib/api"

export const verifyPayment = async (bookingId: string) => {
    try {
        const result = await api.get(`/payment/${bookingId}`);
        return result.data;
    } catch (error) {
        console.error('Payment verification error:', error);
        // Throw the error so the caller can handle it
        throw error;
    }
};