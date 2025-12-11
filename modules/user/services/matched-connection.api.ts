import api from "@/lib/api";
import { Travellers } from "../types/Ai-trip-plan.type";

export const matchedConnection = async (): Promise<Travellers[]> => {
    try {
        const response = await api.get<Travellers[]>('/travellers')
        return response.data || []
    } catch (error) {
        const err = error as { response?: { data?: { message?: string } } };
        console.error('Error fetching matched connections:', err);
        throw new Error(err.response?.data?.message || 'Failed to fetch travelers')
    }
}