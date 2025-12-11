import api from "@/lib/api";

export const fetchAgencyPackages = async (
    agencyId: string,
    page = 1,
    limit = 10,
    search?: string
) => {
    try {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (search) params.append('search', search);

        const response = await api.get(`/agency/${agencyId}/packages?${params.toString()}`);
        console.log(response.data, 'response form fetch agency packages');

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchPackagesById = async (id: string) => {
    try {
        const response = await api.get(`/agency/${id}/package-details`)
        console.log(response, 'reposne from id of fetchPalcacakge');

        return response.data
    } catch (error) {
        console.log(error);
    }
}