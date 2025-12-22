import api from "@/lib/api";

export const generateTrip = async (data: {
    destination: string;
    duration: string;
    travelerType: string;
    budget: string;
    startDate: string;
    visiblity: boolean;
    preferences?: {
        activities: string[];
        pace: string;
        interests: string[];
    };
}) => {
    try {
        let response = await api.post('/trip/generate', data)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const fetchTrip = async (id: string, destination: string) => {
    try {
        const response = await api.get(`/trip/${id}/${destination}`)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const generateLongTrip = async (data: {
    destination: string;
    startDate: string;
    endDate: string;
    travelers: string | number;
    minBudget: string | number;
    maxBudget: string | number;
    search?: string;
    vehicle?: string;
    durationFilter?: string;
    page?: number;
    limit?: number;
}) => {
    try {
        const response = await api.get(`/agency/filter/packages`, {
            params: {
                destination: data.destination,
                startDate: data.startDate,
                endDate: data.endDate,
                travelers: data.travelers,
                minBudget: data.minBudget,
                maxBudget: data.maxBudget,
                search: data.search,
                vehicle: data.vehicle,
                durationFilter: data.durationFilter,
                page: data.page || 1,
                limit: data.limit || 10,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};