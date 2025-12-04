import { useCallback, useEffect, useRef, useState } from "react";
import { PayoutRequest } from "../types/payout-request.type";
import {
  approvePayoutRequest,
  payoutRequest,
  rejectPayoutRequest,
} from "../services/payout-req.service";
import { PayoutStatus } from "../types/payout-status.enum";
interface PayoutFilters {
  page: number;
  limit: number;
  status: PayoutStatus | "all";
  search: string;
}
export const usePayoutReq = () => {
  const [payout, setPayout] = useState<PayoutRequest[]>([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PayoutRequest | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [filters, setFilters] = useState<PayoutFilters>({
    page: 1,
    limit: 10,
    status: PayoutStatus.PENDING,
    search: "",
  });
  const [searchTerm, setSearchTerm] = useState(filters.search);

  const fetchPayoutDetails = async () => {
    setIsLoading(true);
    try {
      const { page, limit, status, search } = filters;
      const result = await payoutRequest(page, limit, status, search);
      setPayout(result.data || []);
      setTotalItems(result.total);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleApprove = (requestId: string) => {
    setShowApproveModal(true);
    setSelectId(requestId);
  };
  const handleApproveConfirm = async () => {
    try {
      await approvePayoutRequest(selectId!);
      setShowApproveModal(false);
      setPayout((prev) =>
        filters.status === PayoutStatus.PENDING
          ? prev.filter((req) => req.id !== selectId)
          : prev.map((req) =>
              req.id === selectId
                ? { ...req, status: PayoutStatus.APPROVED }
                : req
            )
      );
    } catch (error) {
      console.error("Approve failed", error);
    }
  };
  const handleReject = (requestId: string) => {
    setRejectId(requestId);
    setShowRejectModal(true);
  };
  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) return alert("Reason required!");

    await rejectPayoutRequest(rejectId!, rejectReason);

    setPayout((prev) =>
      filters.status === PayoutStatus.PENDING
        ? prev.filter((req) => req.id !== rejectId)
        : prev.map((req) =>
            req.id === rejectId
              ? { ...req, status: PayoutStatus.REJECTED }
              : req
          )
    );
    setShowRejectModal(false);
    setRejectReason("");
  };

  const openDetailsModal = (request: PayoutRequest) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };
  useEffect(() => {
    fetchPayoutDetails();
  }, [filters]);

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search); 

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: search,
        page: 1,
      }));
    }, 500);
  }, []);

  const handleTabChange = useCallback((status: PayoutStatus | "all") => {
    setFilters((prev) => ({
      ...prev,
      status: status,
      page: 1,
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({
      ...prev,
      page: page,
    }));
  }, []);

  return {
    payout,
    handleApprove,
    handleReject,
    openDetailsModal,
    handleApproveConfirm,
    showApproveModal,
    setShowApproveModal,
    showDetailsModal,
    setShowDetailsModal,
    selectedRequest,
    handleSearchChange,
    statusFilter: filters.status,
    handleTabChange,
    currentPage: filters.page,
    setCurrentPage: handlePageChange,
    pageSize: filters.limit,
    totalItems,
    searchTerm,
    isLoading,
    handleRejectConfirm,
    showRejectModal,
    setShowRejectModal,
    rejectReason,
    setRejectReason,
  };
};
