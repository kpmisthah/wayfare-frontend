import api from "@/lib/api";
export const getAgencies = async ({ page = 1, limit = 10, search = "" }) => {
  try {
    const response = await api.get(`/admin/agencies?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const approvalAgencies = async (
  id: string,
  action: string,
  reason?: string
) => {
  try {
    const response = await api.patch(`/agency/${id}`, { action, reason });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAgencies = async (agencyId: string) => {
  try {
    const response = await api.patch(`/agency/profile/${agencyId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAgencyDetails = async (
  agencyId: string,
  data: {
    name: string;
    email: string;
    status?: string;
  }
) => {
  try {
    const response = await api.patch(`/admin/agency/${agencyId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
