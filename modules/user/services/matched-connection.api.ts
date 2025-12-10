import api from "@/lib/api";
import { Travellers } from "../types/Ai-trip-plan.type";

export const matchedConnection = async (): Promise<Travellers[]> => {
    try {
        const response = await api.get<Travellers[]>('/travellers')
        return response.data || []
    } catch (error: any) {
        console.error('Error fetching matched connections:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch travelers')
    }
}