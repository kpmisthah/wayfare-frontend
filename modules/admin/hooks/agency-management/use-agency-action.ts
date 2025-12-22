"use client";
import { useEffect, useMemo, useState } from "react";
import { Agency, AgencyRequest } from "../../types/agency.type";
import {
  approvalAgencies,
  getAgencies,
  updateAgencies,
  updateAgencyDetails,
} from "../../services/agency.service";
import debounce from "lodash.debounce";
import { AgencyStatus } from "../../types/agency.status.enum";

export const agencyActions = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [agencyToBlock, setAgencyToBlock] = useState<Agency | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAgencies = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const response = await getAgencies({ page, limit, search });
      if (response) {
        setAgencies(response.data || []);
        setTotalPages(Math.ceil(response.total / limit));
        setCurrentPage(page);
      } else {
        setAgencies([]);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAgencies(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  useEffect(() => {
  }, [agencies]);

  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<AgencyRequest | null>(
    null
  );
  const [agencyTab, setAgencyTab] = useState<"agencies" | "requests">(
    "agencies"
  );
  const [editAgencyOpen, setEditAgencyOpen] = useState(false);
  const [deleteAgencyOpen, setDeleteAgencyOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [approvalLoading, setApprovalLoading] = useState<boolean>(false);
  const [blockLoading, setBlockLoading] = useState<boolean>(false);
  const [editRequestOpen, setEditRequestOpen] = useState(false);
  const [editSaveLoadingId, setEditSaveLoadingId] = useState(false);
  const handleDeleteAgency = () => {
    if (selectedAgency) {
      setAgencies((prev) => prev.filter((a) => a.id !== selectedAgency.id));
      setDeleteAgencyOpen(false);
      setSelectedAgency(null);
    }
  };

  const handleApprovalAgency = async (
    updateAgency: Agency,
    action?: "accept" | "reject",
    reason?: string
  ) => {
    try {
      setApprovalLoading(true);
      const finalAction =
        action ??
        (updateAgency.status === AgencyStatus.ACTIVE ? "accept" : "reject");

      const newAGencies = await approvalAgencies(
        updateAgency.id,
        finalAction,
        reason
      );

      setAgencies((prev) =>
        prev.map((agency) =>
          agency.id === updateAgency.id ? newAGencies : agency
        )
      );
      setEditAgencyOpen(false);
    } catch (error) {
      setEditSaveLoadingId(false);
    } finally {
      setApprovalLoading(false);
      setEditSaveLoadingId(false);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setCurrentPage(1);
        setSearchTerm(value);
      }, 500),
    []
  );
  const handleBlockAgency = async (updateAgency: Agency) => {

    try {
      setBlockLoading(true);
      let agencyStatus = await updateAgencies(updateAgency.id);
      setAgencies((prev) =>
        prev.map((agency) =>
          agency.id == updateAgency.id
            ? {
              ...agency,
              user: { ...agency.user, isBlock: agencyStatus.isBlock },
            }
            : agency
        )
      );
    } catch (error) {
      setBlockLoading(false);
    } finally {
      setBlockLoading(false);
    }
  };

  const handleSaveAgency = async (updated: Agency) => {
    try {
      setLoading(true);

      const updatedAgency = await updateAgencyDetails(updated.id, {
        name: updated.user.name,
        email: updated.user.email,
        status: updated.status,
      });

      setAgencies((prev) =>
        prev.map((agency) =>
          agency.id === updated.id ? updatedAgency : agency
        )
      );

      setEditAgencyOpen(false);
      setSelectedAgency(null);

    } catch (error) {
      console.error("Error updating agency:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRequest = (updated: Agency) => {
    setAgencies((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditRequestOpen(false);
  };

  const filteredAgencies = agencies.filter(
    (agency) =>
      agency.user.isVerified == true &&
      (agency.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRequests = agencies
    .filter((agency) => agency.user.isVerified == false)
    .filter(
      (agency) =>
        agency.user.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        agency.user.email.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );

  return {
    // handleRejectRequest,
    handleApprovalAgency,
    handleDeleteAgency,
    handleSaveAgency,
    handleSaveRequest,
    filteredAgencies,
    filteredRequests,
    agencyTab,
    setAgencyTab,
    searchTerm,
    setSearchTerm,
    selectedAgency,
    setSelectedAgency,
    editAgencyOpen,
    setEditAgencyOpen,
    deleteAgencyOpen,
    setDeleteAgencyOpen,
    setSelectedRequest,
    setEditRequestOpen,
    selectedRequest,
    editRequestOpen,
    loading,
    approvalLoading,
    blockLoading,
    handleBlockAgency,
    setEditSaveLoadingId,
    editSaveLoadingId,
    blockModalOpen,
    setBlockModalOpen,
    agencyToBlock,
    setAgencyToBlock,
    agencies,
    fetchAgencies,
    currentPage,
    setCurrentPage,
    totalPages,
    debouncedSearch,
    // handleApproveRequest,
  };
};
