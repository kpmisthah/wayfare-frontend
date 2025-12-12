"use client";
import React, { useState, useMemo } from "react";
import {
  DollarSign,
  Calendar,
  Building2,
  Wallet,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import StatCard from "./statCard";
import {
  useFinance,
  Transaction,
  AgencyRevenue,
} from "../hooks/use-financial";
import {
  exportToCSV,
  formatDateForExport,
  formatCurrencyForExport,
} from "@/lib/export-utils";
import debounce from "lodash.debounce";

const FinancialManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const {
    overview,
    loading,
    transactions,
    transactionPage,
    setTransactionPage,
    handleTransactionSearch,
    transactionLoading,
    transactionTotalPages,
    transactionTotal,
    agencyList,
    agencyPage,
    setAgencyPage,
    handleAgencySearch,
    agencyLoading,
    agencyTotalPages,
    agencyTotal,
  } = useFinance();


  const debouncedTransactionSearch = useMemo(
    () => debounce((value: string) => handleTransactionSearch(value), 500),
    [handleTransactionSearch]
  );

  const debouncedAgencySearch = useMemo(
    () => debounce((value: string) => handleAgencySearch(value), 500),
    [handleAgencySearch]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading financial data...</span>
      </div>
    );
  }


  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig: Record<
      string,
      { bg: string; text: string; icon: React.ElementType }
    > = {
      SUCCEEDED: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
      },
      PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
      FAILED: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
      REFUNDED: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        icon: AlertCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
      >
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const handleExportTransactions = () => {
    exportToCSV<Transaction>(
      transactions,
      [
        {
          header: "Date",
          accessor: (tx: Transaction) => formatDateForExport(tx.date),
        },
        {
          header: "Time",
          accessor: (tx: Transaction) =>
            new Date(tx.date).toLocaleTimeString(),
        },
        {
          header: "Agency",
          accessor: (tx: Transaction) => tx.agencyName || "N/A",
        },
        {
          header: "Destination",
          accessor: (tx: Transaction) => tx.destination || "N/A",
        },
        {
          header: "Booking Code",
          accessor: (tx: Transaction) => tx.bookingCode || "N/A",
        },
        {
          header: "Commission",
          accessor: (tx: Transaction) => formatCurrencyForExport(tx.commission),
        },
        { header: "Status", accessor: "status" },
        { header: "Type", accessor: "type" },
      ],
      "transactions_export"
    );
  };

  const handleExportAgencies = () => {
    exportToCSV<AgencyRevenue>(
      agencyList,
      [
        { header: "Agency Name", accessor: "agencyName" },
        { header: "Agency ID", accessor: "agencyId" },
        {
          header: "Platform Earning",
          accessor: (a: AgencyRevenue) =>
            formatCurrencyForExport(a.platformEarning ?? 0),
        },
        { header: "Total Bookings", accessor: "all" },
      ],
      "agency_revenue_export"
    );
  };

  const handleExport = () => {
    if (activeTab === "overview") {
      handleExportTransactions();
    } else {
      handleExportAgencies();
    }
  };

  const TransactionRow = ({ tx }: { tx: Transaction }) => {
    console.log('Transaction data:', tx);
    return (
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {new Date(tx.date).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(tx.date).toLocaleTimeString()}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {tx.agencyName || "—"}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-700">{tx.destination || "—"}</div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm font-semibold text-gray-900">
            ₹{tx.commission.toLocaleString()}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <StatusBadge status={tx.status} />
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${tx.type === "CREDIT"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
              }`}
          >
            {tx.type}
          </span>
        </td>
      </tr>
    );
  };

  const AgencyRow = ({ agency }: { agency: AgencyRevenue }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {agency.agencyName}
        </div>
        <div className="text-sm text-gray-500">{agency.agencyId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          ₹{agency.platformEarning?.toLocaleString() ?? 0}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{agency.all}</div>
      </td>
    </tr>
  );

  // Pagination Component
  const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    isLoading,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    isLoading: boolean;
  }) => {
    if (totalPages <= 0) return null;

    const itemsPerPage = 10;
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-600">
          {totalItems > 0 ? (
            <>
              Showing <span className="font-medium">{startItem}</span> to{" "}
              <span className="font-medium">{endItem}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </>
          ) : (
            "No results"
          )}
        </div>
        <div className="flex items-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${currentPage === 1 || isLoading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="px-3 py-2 text-sm font-medium text-gray-600">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${currentPage >= totalPages || isLoading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Revenue Management
              </h1>
              <p className="text-gray-600 mt-1">
                Monitor and manage your commission earnings
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleExport}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={overview?.totalRevenue || 0}
            icon={DollarSign}
            color="green"
          />
          <StatCard
            title="Total Commission"
            value={overview?.totalCommission ?? 0}
            icon={Calendar}
            color="blue"
          />
          <StatCard
            title="Wallet Balance"
            value={overview?.walletBalance || 0}
            icon={Wallet}
            color="purple"
          />
          <StatCard
            title="Active Agencies"
            value={overview?.activeAgencies || 0}
            icon={Building2}
            color="orange"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 gap-4">
              {/* Tab Buttons */}
              <nav className="flex space-x-4">
                {[
                  { id: "overview", label: "Recent Transactions" },
                  { id: "agencies", label: "Revenue by Agency" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-4 font-medium text-sm rounded-lg transition-colors ${activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={
                    activeTab === "overview"
                      ? "Search agency, destination..."
                      : "Search agencies..."
                  }
                  onChange={(e) =>
                    activeTab === "overview"
                      ? debouncedTransactionSearch(e.target.value)
                      : debouncedAgencySearch(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            {activeTab === "overview" && (
              <>
                <div className="overflow-x-auto relative">
                  {transactionLoading && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    </div>
                  )}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date & Time
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Agency
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Destination
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Commission
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.length > 0 ? (
                        transactions.map((tx) => (
                          <TransactionRow key={tx.id} tx={tx} />
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-12 text-center text-gray-500"
                          >
                            No transactions found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={transactionPage}
                  totalPages={transactionTotalPages}
                  onPageChange={setTransactionPage}
                  totalItems={transactionTotal}
                  isLoading={transactionLoading}
                />
              </>
            )}

            {activeTab === "agencies" && (
              <>
                <div className="overflow-x-auto relative">
                  {agencyLoading && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    </div>
                  )}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Agency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Commission
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total Bookings
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {agencyList.length > 0 ? (
                        agencyList.map((agency) => (
                          <AgencyRow key={agency.agencyId} agency={agency} />
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="px-6 py-12 text-center text-gray-500"
                          >
                            No agencies found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={agencyPage}
                  totalPages={agencyTotalPages}
                  onPageChange={setAgencyPage}
                  totalItems={agencyTotal}
                  isLoading={agencyLoading}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialManagement;
