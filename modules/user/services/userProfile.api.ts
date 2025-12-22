import api from "@/lib/api";
import { toast } from "sonner";

export const getUserProfile = async () => {
  try {
    let response;
    response = await api.get('/user/me');

    if (response.data == '') {
      response = await api.get('/auth/me');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadUserProfileImage = async (file: File, type: 'profile' | 'banner') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  try {
    const response = await api.post('/user/upload-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Image uploaded!', {
      description: `Your ${type} image has been updated.`,
    });
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

export const updateProfileImage = async (imageUrl: string) => {
  try {
    const response = await api.put('/user/update-profile-image', imageUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: { name: string; email: string; phone: string; location: string }) => {
  try {
    const response = await api.put('/user/update-profile', data);
    toast.success('Profile updated!', {
      description: 'Your profile information has been saved.',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserBooking = async (
  page = 1,
  limit = 10,
  search?: string,
  status?: string,
) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);
    if (status && status !== 'all') params.append('status', status);

    const response = await api.get(`/booking/user?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const bookingCancel = async (id: string) => {
  try {
    const response = await api.post(`/booking/cancel/${id}`);
    toast.success('Booking cancelled', {
      description: 'Your booking has been cancelled and refund initiated.',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
  try {
    const response = await api.patch('/auth/change-password', data);
    toast.success('Password changed!', {
      description: 'Your password has been successfully updated.',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
