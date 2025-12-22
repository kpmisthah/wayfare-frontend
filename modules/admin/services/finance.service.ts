import api from "@/lib/api";

export interface FinanceQueryParams {
    page?: number;
    limit?: number;
    search?: string;
}

export const getFinance = async (params?: FinanceQueryParams) => {
    try {
        const response = await api.get("/admin/finance/dashboard", {
            params: {
                page: params?.page ?? 1,
                limit: params?.limit ?? 10,
                search: params?.search ?? "",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAgencyRevenue = async (params?: FinanceQueryParams) => {
    try {
        const response = await api.get("/admin/finance/agency", {
            params: {
                page: params?.page ?? 1,
                limit: params?.limit ?? 10,
                search: params?.search ?? "",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};