"use client"
import React, { useState } from "react";
import {
  DollarSign,
  Calendar,
  Building2,
  Wallet,
  Filter,
  Download,
} from "lucide-react";
import StatCard from "./statCard";
import { useFinance } from "../hooks/use-financial";

const FinancialManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { overview, agencies, loading } = useFinance();

  if (loading) {
    return <p className="p-6 text-gray-600">Loading financial data...</p>;
  }

  // Transactions for "overview" tab
  const transactions = overview?.transactionSummary || [];

  const TransactionRow = ({ tx }: { tx: any }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {new Date(tx.date).toLocaleDateString()}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(tx.date).toLocaleTimeString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          ₹{tx.commission}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            tx.type === "CREDIT"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {tx.type}
        </span>
      </td>
    </tr>
  );

  const AgencyRow = ({ agency }: { agency: any }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {agency.agencyName}
        </div>
        <div className="text-sm text-gray-500">{agency.agencyId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          ₹{agency.platfromEarning.toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{agency.all}</div>
      </td>
    </tr>
  );

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
            {/* <div className="flex space-x-3">
              <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div> */}
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
            value={overview?.totalCommission._sum.platformEarning || 0}
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Recent Transactions" },
                { id: "agencies", label: "Revenue by Agency" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Commission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
                      </th>
        
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((tx) => (
                      <TransactionRow key={tx.id} tx={tx} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "agencies" && (
              <div className="overflow-x-auto">
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
                    {agencies.map((agency) => (
                      <AgencyRow key={agency.agencyId} agency={agency} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialManagement;
