import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Search,
  Filter,
  Building,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { Column, Table } from "@/shared/components/common/Table";
import Modal from "@/shared/components/common/Modal";
import Detail from "@/shared/components/common/Detail";
import { PayoutStatus } from "../types/payout-status.enum";
import { usePayoutReq } from "../hooks/use-payout-req";
import { PayoutRequest } from "../types/payout-request.type";

// Status Badge Component
const StatusBadge = ({ status }: { status: PayoutStatus }) => {
  const statusConfig = {
    PENDING: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      label: "Pending",
      icon: Clock,
    },
    APPROVED: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Approved",
      icon: CheckCircle,
    },
    REJECTED: {
      bg: "bg-red-100",
      text: "text-red-700",
      label: "Rejected",
      icon: XCircle,
    },
    PROCESSING: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Processing",
      icon: Clock,
    },
    COMPLETED: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Completed",
      icon: CheckCircle,
    },
  };

  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

// Mobile Card Component for Payout Requests
const MobilePayoutCard = ({
  request,
  onView,
  onApprove,
  onReject,
}: {
  request: PayoutRequest;
  onView: (req: PayoutRequest) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm">
      {/* Header with Agency Info */}
      <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Building className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 truncate">
            {request.agencyInfo.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {request.agencyInfo.email}
          </p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      {/* Amount and Phone */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">Amount</p>
          <p className="font-bold text-lg text-gray-800">
            ₹{request.amount.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Phone</p>
          <p className="text-sm text-gray-800">{request.agencyInfo.phone}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          onClick={() => onView(request)}
          className="flex-1 min-w-[100px] px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        {request.status === PayoutStatus.PENDING && (
          <>
            <button
              onClick={() => onApprove(request.id)}
              className="flex-1 min-w-[100px] px-3 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(request.id)}
              className="flex-1 min-w-[100px] px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Main Component
const PayoutHistory = () => {
  // const [selectedTab, setSelectedTab] = useState<PayoutStatus | string>(
  //   PayoutStatus.PENDING
  // );
  const {
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
    searchTerm,
    handleSearchChange,
    statusFilter,
    handleTabChange,
    isLoading,
    totalItems,
    currentPage,
    setCurrentPage,
    pageSize,
    handleRejectConfirm,
    showRejectModal,
    setShowRejectModal,
    rejectReason,
    setRejectReason,
  } = usePayoutReq();

  // const getFilteredRequests = () => {
  //   if (selectedTab === "all") return payout;
  //   return payout?.filter((req) => req.status === selectedTab) ?? [];
  // };

  // Table Columns Definition for Desktop
  const columns: Column<PayoutRequest>[] = [
    {
      header: "Agency",
      renderProps: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Building className="w-5 h-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 truncate">
              {row.agencyInfo.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {row.agencyInfo.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Amount",
      renderProps: (row) => (
        <p className="font-bold text-lg text-gray-800 whitespace-nowrap">
          ₹{row.amount.toLocaleString()}
        </p>
      ),
    },
    {
      header: "Phone",
      renderProps: (row) => (
        <p className="font-semibold text-gray-800 whitespace-nowrap">
          {row.agencyInfo.phone}
        </p>
      ),
    },
    {
      header: "Status",
      renderProps: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: "Actions",
      renderProps: (row) => (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => openDetailsModal(row)}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          {row.status === PayoutStatus.PENDING && (
            <>
              <button
                onClick={() => handleApprove(row.id)}
                className="px-3 py-1.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(row.id)}
                className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const filteredRequests = payout;

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* Header with Tabs and Search */}
        <div className="p-4 sm:p-6 border-b border-gray-200 space-y-4">
          {/* Title and Actions Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Payout Requests
            </h2>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Filter and Export Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>

                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {[
              PayoutStatus.PENDING,
              PayoutStatus.APPROVED,
              PayoutStatus.REJECTED,
              "all",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as PayoutStatus | "all")}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  statusFilter === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table View - Hidden on Mobile */}
        <div className="hidden lg:block overflow-x-auto">
          <Table
            col={columns}
            data={filteredRequests}
            title=""
            description=""
          />
        </div>

        {/* Mobile Card View - Hidden on Desktop */}
        <div className="lg:hidden p-4 space-y-3">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <MobilePayoutCard
                key={request.id}
                request={request}
                onView={openDetailsModal}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No payout requests found
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border 
      ${
        currentPage === 1
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-100"
      }`}
        >
          Previous
        </button>

        <span className="text-sm font-medium text-gray-700">
          Page {currentPage} of {Math.ceil(totalItems / pageSize)}
        </span>

        <button
          disabled={currentPage >= Math.ceil(totalItems / pageSize)}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border 
      ${
        currentPage >= Math.ceil(totalItems / pageSize)
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-100"
      }`}
        >
          Next
        </button>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Payout Request Details"
        subtitle={selectedRequest?.id}
      >
        <div className="space-y-4 sm:space-y-6 text-sm sm:text-base max-h-[70vh] overflow-y-auto">
          {/* Agency Info */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" />
              Agency Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Detail
                label="Agency Name"
                value={selectedRequest?.agencyInfo.name}
              />
              <Detail label="Agency ID" value={selectedRequest?.id} />
              <Detail label="Email" value={selectedRequest?.agencyInfo.email} />
              <Detail label="Phone" value={selectedRequest?.agencyInfo.phone} />
            </div>
          </div>

          {/* Payout Details */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Payout Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Detail
                label="Requested Amount"
                value={`₹${selectedRequest?.amount.toLocaleString()}`}
              />
              <Detail
                label="Available Balance"
                value={`₹${selectedRequest?.amount.toLocaleString()}`}
              />
              <Detail
                label="Total Earnings"
                value={`₹${selectedRequest?.amount.toLocaleString()}`}
              />

              <div>
                <p className="text-gray-600 mb-1">Status</p>
                <StatusBadge
                  status={selectedRequest?.status ?? PayoutStatus.PENDING}
                />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Bank Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Detail
                label="Account Holder Name"
                value={selectedRequest?.bankDetails.accountName}
              />
              <Detail
                label="Account Number"
                value={selectedRequest?.bankDetails.accountNumber}
              />
              <Detail
                label="IFSC Code"
                value={selectedRequest?.bankDetails.ifscCode}
              />
              <Detail
                label="Bank Name"
                value={selectedRequest?.bankDetails.bankName}
              />
              <Detail
                label="Branch"
                value={selectedRequest?.bankDetails.branch}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Approval Modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title="Approve"
        subtitle="Are you sure You want to approve"
        size="sm"
      >
        <div className="flex gap-3 justify-end">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => handleApproveConfirm()}
          >
            Yes, Approve
          </button>

          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={() => setShowApproveModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Request"
        subtitle="Please provide a reason"
        size="sm"
      >
        <textarea
          className="w-full border rounded-lg p-2 text-sm"
          placeholder="Enter rejection reason"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          rows={3}
        />

        <div className="flex gap-3 justify-end mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={handleRejectConfirm}
          >
            Reject
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={() => setShowRejectModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PayoutHistory;
