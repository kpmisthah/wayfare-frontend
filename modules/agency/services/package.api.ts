import api from "@/lib/api";
import { toast } from "sonner";
import { Itinerary, PackageData } from "../types/package.type";
import { PackageStatus } from "../types/package.enum";

export const addPackage = async (data: {
  title: string;
  destination: string;
  description: string;
  highlights: string | string[];
  duration: string;
  picture: (string | File)[];
  price: string;
  itinerary: Itinerary[];
  vehicle: string;
  pickup_point: string;
  drop_point: string;
  details: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("destination", data.destination);
    formData.append("description", data.description);
    formData.append("duration", String(data.duration));
    formData.append("price", String(data.price));
    formData.append("highlights", Array.isArray(data.highlights) ? data.highlights.join(',') : data.highlights);
    formData.append('itinerary', JSON.stringify(data.itinerary));
    formData.append('vehicle', data.vehicle);
    formData.append('pickup_point', data.pickup_point);
    formData.append('drop_point', data.drop_point);
    formData.append('details', data.details);
    data.picture.forEach((photo) => {
      if (photo instanceof File) {
        formData.append("photos", photo);
      } else {
        formData.append("photos", photo);
      }
    });

    console.log("w", data);

    const response = await api.post("/agency/add/packages", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(response.data, 'from backend');
    toast.success('Package created!', {
      description: 'Your travel package has been successfully added.',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPackages = async (page: number = 1, limit: number = 5, search: string = '') => {
  try {
    const response = await api.get('/agency/get/packages', {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAgencyProfile = async () => {
  try {
    const response = await api.get('/agency/get/packages');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatedPackage = async (updatedPackage: Partial<PackageData>, packageId: string) => {
  try {
    console.log(updatedPackage, 'update package before send to backend, packageId:', packageId);
    const response = await api.put(`/agency/package/${packageId}`, updatedPackage);
    console.log(response, 'response');
    toast.success('Package updated!', {
      description: 'Your travel package has been successfully updated.',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePackageStatus = async (status: PackageStatus, packageId: string) => {
  try {
    const response = await api.patch(`/agency/package/status/${packageId}`, { status });
    console.log(response.data, 'response');
    toast.success('Status updated!', {
      description: `Package is now ${status.toLowerCase()}.`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};