import api from "@/lib/api";
import { PayoutStatus } from "../types/payout-status.enum";

export const payoutRequest = async (
  page: number,
  limit: number,
  status: PayoutStatus | "all",
  search: string
) => {
  try {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      status: status === "all" ? undefined : status,
      search: search || undefined,
    };
    const response = await api.get("/admin/payout-details",{params});
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const approvePayoutRequest = async (requestId: string) => {
  try {
    const response = await api.patch(`/admin/payout/approve/${requestId}`, {
      status: PayoutStatus.APPROVED,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const rejectPayoutRequest = async (requestId: string, reason: string) => {
  const response = await api.patch(`/admin/payout/reject/${requestId}`, {
    reason,
  });
  return response.data;
};