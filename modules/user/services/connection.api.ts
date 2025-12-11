import api from "@/lib/api";
import { toast } from "sonner";

export const sendConnectionRequest = async (receiverId: string) => {
    try {
        console.log(receiverId, 'receiverId in sendConnectionRequest');
        const response = await api.post(`/connections/${receiverId}`);
        toast.success('Request sent!', {
            description: 'Your connection request has been sent.',
        });
        return response.data;
    } catch (err) {
        const error = err as { response?: { data?: { message?: string } | string } };
        const errorMessage = (typeof error.response?.data === 'string' ? error.response.data : error.response?.data?.message) || 'Failed to send connection request';
        console.error('Connection request failed:', errorMessage);
        throw new Error(errorMessage);
    }
};