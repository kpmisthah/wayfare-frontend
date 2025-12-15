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

export const getMyConnections = async () => {
    try {
        const response = await api.get('/connections');
        console.log(response.data, 'response.data in getMyConnections');
        return response.data;
    } catch (err) {
        const error = err as { response?: { data?: { message?: string } | string } };
        const errorMessage = (typeof error.response?.data === 'string' ? error.response.data : error.response?.data?.message) || 'Failed to fetch connections';
        console.error('Failed to fetch connections:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const getAcceptedConnections = async () => {
    try {
        const response = await api.get('/connections/accepted');
        return response.data;
    } catch (err) {
        const error = err as { response?: { data?: { message?: string } | string } };
        const errorMessage = (typeof error.response?.data === 'string' ? error.response.data : error.response?.data?.message) || 'Failed to fetch accepted connections';
        console.error('Failed to fetch accepted connections:', errorMessage);
        throw new Error(errorMessage);
    }
};