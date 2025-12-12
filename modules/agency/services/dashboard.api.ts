import api from "@/lib/api";
import { AgencyDashboardData } from "../types/dashboard.type";

export const fetchDashboardData = async (): Promise<AgencyDashboardData> => {
    const response = await api.get('/agency/dashboard', {
        silentError: true
    });
    return response.data.data;
};
