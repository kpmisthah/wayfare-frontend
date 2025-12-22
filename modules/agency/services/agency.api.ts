import api from "@/lib/api";
import { AgencyProfile } from "../types/agency.type";

export const fetchAgency = async () => {
    try {
        const authResponse = await api.get('/auth/me');
        const agencyResponse = await api.get('/agency/me');
        return {
            ...authResponse.data,
            ...agencyResponse.data,
            bannerImage: agencyResponse.data.user?.bannerImage,
            profileImage: agencyResponse.data.user?.profileImage
        };
    } catch (error) {
        throw error;
    }
};

export const getAgencyProfile = async () => {
    try {
        const response = await api.get('/agency/me');
        return response.data;
    } catch (error) {
    }
};

export const createAgency = async (agency: {
    description: string | null;
    specialization: string[];
    address: string;
    licenseNumber: string;
    ownerName: string;
    websiteUrl: string;
}) => {
    try {
        const response = await api.post('/agency/agency-profile', agency);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateAgencyProfile = async (data: Partial<AgencyProfile>) => {
    try {
        const response = await api.patch('/agency/agency-profile', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAgencyById = async (id: string) => {
    const response = await api.get(`/agency/${id}`);
    return response.data;
};