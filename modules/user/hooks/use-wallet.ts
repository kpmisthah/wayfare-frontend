"use client";
import { useEffect, useState } from "react";
import { getWallet, getWalletTransaction } from "../services/wallet.api";
import { WalletTransaction } from "../types/wallet-transaction.type";

export const useWallet = (activeTab?: string) => {
  const [wallet, setWallet] = useState<{ balance: number }>({
    balance: 0,
  });
  const [transactionData, setTransactionData] = useState<WalletTransaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const payWithWallet = async (amount: number) => {
    setIsProcessing(true);
    try {
      await getWallet();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchWallet = async () => {
    try {
      const response = await getWallet();
      setWallet({ balance: response ?? 0 });
      setError(null);
    } catch (err) {
      console.error('Failed to fetch wallet:', err);
      setWallet({ balance: 0 });
    }
  };

  const transactionHistory = async (pageNum: number = 1) => {
    setIsLoading(true);
    try {
      const response = await getWalletTransaction(pageNum, limit);
      if (response) {
        setTransactionData(response.data ?? []);
        setTotalPages(response.totalPages ?? 1);
        setTotal(response.total ?? 0);
        setPage(response.page ?? 1);
      }
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setTransactionData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      transactionHistory(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      transactionHistory(page - 1);
    }
  };

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      transactionHistory(pageNum);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchWallet();
        await transactionHistory(1);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === 'wallet') {
      fetchWallet();
      transactionHistory(1);
    }
  }, [activeTab]);

  return {
    wallet,
    payWithWallet,
    isProcessing,
    transactionData,
    isLoading,
    error,
    refetchWallet: fetchWallet,
    refetchTransactions: transactionHistory,
    // Pagination
    page,
    totalPages,
    total,
    nextPage,
    prevPage,
    goToPage,
  };
};

