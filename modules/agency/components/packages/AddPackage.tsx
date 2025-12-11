import React, { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  Calendar,
  Download,
  CreditCard,
  Edit2,
  X,
  Check,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useAgencyWallet } from "../../hooks/use-wallet";
import { useRecentWalletTx } from "../../hooks/use-recent-transaction";
import api from "@/lib/api";
import { useAuthStore } from "@/store/Auth";
import { Bank } from "../../types/bank.type";
export const AgencyWallet = () => {
  const { walletData } = useAgencyWallet();
  const { data, loading } = useRecentWalletTx();
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const emptyBankData: Bank = {
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    branch: "",
    ifscCode: "",
  };
  const [activeTab, setActiveTab] = useState<"payout" | "bank">("payout");

  const openPayoutModal = () => {
    setShowPayoutModal(true);
    setActiveTab("payout");
  };
  const [hasBankDetails, setHasBankDetails] = useState(true);
  const [bankDetails, setBankDetails] = useState<Bank>(emptyBankData);

  const [payoutAmount, setPayoutAmount] = useState("");
  const [formData, setFormData] = useState(bankDetails);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isBankFormValid = () => {
    return (
      formData.accountHolderName.trim() !== "" &&
      formData.accountNumber.trim() !== "" &&
      formData.ifscCode.trim() !== "" &&
      formData.bankName.trim() !== ""
    );
  };

  const handleSaveBankDetails = async () => {
    try {
      const payload = {
        accountHolderName: formData.accountHolderName.trim(),
        accountNumber: formData.accountNumber.trim(),
        ifscCode: formData.ifscCode.trim(),
        bankName: formData.bankName.trim(),
        branch: formData.branch?.trim() || "",
      };

      let response;
      if (hasBankDetails) {
        response = await api.patch("/agency/update/bankDetails", payload);
        alert("Bank details updated successfully!");
      } else {
        response = await api.post("/agency/bank-details", payload);
        alert("Bank details saved successfully!");
      }

      await fetchBankDetails();

      setActiveTab("payout");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error("Bank save error:", error);
      const message = error.response?.data?.message || "Failed to save bank details";
      alert(message);
    }
  };

  //handlePayoutSubmit 
  const handlePayoutSubmit = async () => {
    if (!hasBankDetails) {
      alert("Please add bank details first");
      setActiveTab("bank");
      return;
    }

    if (!payoutAmount || Number(payoutAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      await api.post("/agency/payout", {
        amount: Number(payoutAmount),
      });

      alert("Payout request sent successfully!");
      setShowPayoutModal(false);
      setPayoutAmount("");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error('Payout error:', error);
      alert(error.response?.data?.message || "Payout failed");
    }
  };
  useEffect(() => {
    if (!showPayoutModal) return;
    fetchBankDetails();
  }, [showPayoutModal]);

  async function fetchBankDetails() {
    try {
      const res = await api.get("/agency/bank/details");
      const bank = res.data;
      console.log(bank, "---------->Bank<-----------------");
      if (bank) {
        setHasBankDetails(true);
        setIsEditingBank(false);
        setFormData({
          accountHolderName: bank.accountHolderName,
          accountNumber: bank.accountNumber,
          ifscCode: bank.ifscCode,
          bankName: bank.bankName,
          branch: bank.branch,
        });
      } else {
        setHasBankDetails(false);
        setIsEditingBank(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Agency Wallet
          </h1>
          <p className="text-slate-600">
            Manage your earnings and track transactions
          </p>
        </div>

        {/* Wallet Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-8 h-8 opacity-80" />
              <div className="bg-white/20 rounded-lg px-3 py-1 text-sm">
                Available
              </div>
            </div>
            <p className="text-sm opacity-90 mb-1">Current Balance</p>
            <h2 className="text-3xl font-bold">
              ₹{(walletData?.walletAmount ?? 0).toLocaleString()}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-orange-500" />
              <div className="bg-orange-50 rounded-lg px-3 py-1 text-sm text-orange-600">
                Pending
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Pending Amount</p>
            <h2 className="text-3xl font-bold text-slate-800">
              ₹{(walletData?.pendingWalletAmount ?? 0).toLocaleString()}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Earnings</p>
            <h2 className="text-3xl font-bold text-slate-800">
              ₹{((walletData?.walletAmount || 0) / 100000).toFixed(1)}L
            </h2>
          </div>

          <div
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            onClick={openPayoutModal}
          >
            <div className="text-center text-white">
              <Download className="w-10 h-10 mx-auto mb-3" />
              <p className="font-semibold text-lg">Request Payout</p>
              <p className="text-sm opacity-90">Withdraw funds</p>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Recent Transactions
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Track all your earnings and withdrawals
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors">
                <Calendar className="w-4 h-4" />
                Last 30 days
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">
                    Customer name
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">
                    Status
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {/* <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "credit"
                              ? "bg-green-100"
                              : transaction.type === "debit"
                              ? "bg-red-100"
                              : "bg-orange-100"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownRight className="w-5 h-5 text-green-600" />
                          ) : transaction.type === "debit" ? (
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-orange-600" />
                          )}
                        </div> */}
                        <div>
                          <p className="font-semibold text-slate-800">
                            {transaction.name}
                          </p>
                          {/* <p className="text-sm text-slate-500">
                            {transaction.type === "credit"
                              ? "Received"
                              : transaction.type === "debit"
                              ? "Withdrawn"
                              : "Pending"}
                          </p> */}
                        </div>
                      </div>
                    </td>
                    {/* <td className="py-4 px-6">
                      <p className="text-slate-700">{transaction.booking}</p>
                    </td> */}
                    <td className="py-4 px-6">
                      <p className="text-slate-600">
                        {new Date(transaction.createdAt).toLocaleDateString(
                          "en-IN"
                        )}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${transaction.status === "SUCCEEDED"
                          ? "bg-green-100 text-green-700"
                          : transaction.status === "PENDING"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {transaction.status === "SUCCEEDED" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : transaction.status === "PENDING" ? (
                          <Clock className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <p
                      // className={`font-bold ${
                      //   transaction.type === "credit"
                      //     ? "text-green-600"
                      //     : transaction.type === "debit"
                      //     ? "text-red-600"
                      //     : "text-orange-600"
                      // }`}
                      >
                        {/* {transaction.type === "debit" ? "-" : "+"} ₹ */}
                        {transaction.amount.toLocaleString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout Modal */}
        {showPayoutModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {activeTab === "payout"
                      ? "Request Payout"
                      : "Bank Account Details"}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {activeTab === "payout"
                      ? hasBankDetails
                        ? "Withdraw your earnings to your bank account"
                        : "You need to add bank details first"
                      : hasBankDetails
                        ? "Update your bank account details"
                        : "Add your bank account to receive payouts"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowPayoutModal(false);
                    setIsEditingBank(false);
                  }}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="p-6">
                {/* Tab Switcher */}
                <div className="flex gap-4 mb-6 border-b border-slate-200">
                  <button
                    onClick={() => setActiveTab("payout")}
                    className={`pb-3 px-1 font-medium transition-colors border-b-2 ${activeTab === "payout"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    Request Payout
                  </button>
                  <button
                    onClick={() => setActiveTab("bank")}
                    className={`pb-3 px-1 font-medium transition-colors border-b-2 ${activeTab === "bank"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    Bank Details
                  </button>
                </div>

                {/* Payout Tab */}
                {activeTab === "payout" && (
                  <>
                    {/* Payout Amount */}
                    <div className="mb-8">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Payout Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={payoutAmount}
                          onChange={(e) => setPayoutAmount(e.target.value)}
                          placeholder="Enter amount to withdraw"
                          className="w-full pl-10 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-2xl font-bold"
                        />
                      </div>
                      <p className="text-sm text-slate-500 mt-3">
                        Available balance: ₹
                        {walletData?.walletAmount.toLocaleString()}
                      </p>
                    </div>

                    {/* Show Bank Summary */}
                    {hasBankDetails && bankDetails && (
                      <div className="bg-slate-50 rounded-xl p-5 mb-6">
                        <p className="text-sm font-medium text-slate-600 mb-2">
                          Paying to:
                        </p>
                        <div className="space-y-1 text-sm">
                          <p className="font-semibold">
                            {bankDetails.accountHolderName}
                          </p>
                          <p>
                            {bankDetails.bankName} • {bankDetails.branch}
                          </p>
                          <p>
                            A/c: {bankDetails.accountNumber} • IFSC:{" "}
                            {bankDetails.ifscCode}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowPayoutModal(false)}
                        className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>

                      {hasBankDetails ? (
                        <button
                          onClick={handlePayoutSubmit}
                          disabled={!payoutAmount || Number(payoutAmount) <= 0}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <Download className="w-5 h-5" />
                          Request Payout
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab("bank")}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          <CreditCard className="w-5 h-5" />
                          Add Bank Details First
                        </button>
                      )}
                    </div>
                  </>
                )}

                {/* Bank Details Tab */}
                {activeTab === "bank" && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          name="accountHolderName"
                          value={formData.accountHolderName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Enter account holder name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-1">
                            Account Number
                          </label>
                          <input
                            type="text"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="Enter account number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-1">
                            IFSC Code
                          </label>
                          <input
                            type="text"
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="e.g. HDFC0001234"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-1">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="e.g. HDFC Bank"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-1">
                            Branch
                          </label>
                          <input
                            type="text"
                            name="branch"
                            value={formData.branch}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="e.g. Mumbai Central"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => {
                          setShowPayoutModal(false);
                        }}
                        className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveBankDetails}
                        disabled={!isBankFormValid()}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        {hasBankDetails
                          ? "Update Bank Details"
                          : "Save Bank Details"}
                      </button>
                    </div>
                  </>
                )}

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Note:</span> Bank details
                    are securely saved and used only for payout transfers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
