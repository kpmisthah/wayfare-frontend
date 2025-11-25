"use client";
import { useWallet } from "@/modules/user/hooks/use-wallet";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { TabsContent } from "@/shared/components/ui/tabs";
import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface WalletTabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

const WalletTabButton = ({ id, label, isActive, onClick }: WalletTabButtonProps) => (
  <Button
    onClick={() => onClick(id)}
    variant={isActive ? "default" : "ghost"}
    className={`${
      isActive
        ? "bg-blue-500 text-white"
        : "text-gray-600 hover:text-blue-500"
    }`}
  >
    {label}
  </Button>
);

export const Wallet = ({ activeTab }: { activeTab: string }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeWalletTab, setActiveWalletTab] = useState("wallet");
  const { wallet, transactionData } = useWallet(activeTab);
  console.log(transactionData, "transactionDataa");

  return (
    <TabsContent value="wallet" className="space-y-6">
      <div className="max-w-6xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-sm">Available Balance</h3>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {showBalance ? wallet.balance : "****"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Navigation Tabs */}
        <div className="flex space-x-2 mb-6 bg-white p-2 rounded-lg shadow-sm">
          <WalletTabButton
            id="history"
            label="Transaction History"
            isActive={activeWalletTab === "history"}
            onClick={setActiveWalletTab}
          />
        </div>
     
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionData.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.transactionType === "CREDIT"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transaction.transactionType === "CREDIT" ? (
                          <ArrowDownLeft className="w-6 h-6 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-6 h-6 text-red-600" />
                        )}
                      </div>

                      <div>
                        <p className="font-medium">
                          {transaction.transactionType === "CREDIT" ? "Wallet Credit" : "Wallet Debit"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-lg font-bold ${
                          transaction.transactionType === "CREDIT" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.transactionType === "CREDIT" ? "+" : "-"}₹{transaction.amount}
                      </span>
                      <p className="text-sm text-gray-600">{transaction.paymentStatus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
     
      </div>
    </TabsContent>
  );
};
