import api from "@/lib/api";
import { toast } from "sonner";
import { BookingStatus } from "../types/booking.enum";

export const bookPackage = async (data: {
    packageId: string;
    travelDate: string | null;
    peopleCount: number | null;
    totalAmount: number;
    paymentType: string;
}) => {
    try {
        const response = await api.post('/booking/package', data);
        toast.success('Booking initiated!', {
            description: 'Redirecting to payment...',
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchBookingByAgency = async () => {
    try {
        const response = await api.get('/booking/get-bookings');
        return response.data;
    } catch (error) {
    }
};

export const updateBookingStatus = async (id: string, status: BookingStatus) => {
    try {
        const response = await api.patch(`/booking/update-status/${id}`, { status });
        toast.success('Status updated!', {
            description: `Booking status changed to ${status.toLowerCase()}.`,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating booking status", error);
        throw error;
    }
};

export const fetchShortTripDetails = async () => {
    try {
        const response = await api.get('/trip');
        return response.data;
    } catch (error) {
    }
};

export const fetchBookingsByPackage = async (
    packageId: string,
    page: number = 1,
    limit: number = 10,
    search: string = ''
) => {
    try {
        const response = await api.get(`/booking/${packageId}/bookings`, {
            params: { page, limit, search }
        });
        return response.data;
    } catch (error) {
    }
};