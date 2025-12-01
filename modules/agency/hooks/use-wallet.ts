// src/hooks/useAgencyWallet.ts
import { useState, useEffect } from "react";
import { getWallet } from "@/modules/user/services/wallet.api";
import { wallet } from "../services/wallet.api";
import { WalletSummary } from "../types/wallet.type";

export const useAgencyWallet = () => {
  const [walletData, setWalletData] = useState<WalletSummary|null>(null);
  const[loading,setLoading] = useState(false)
  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const walletRes = await wallet()

      setWalletData(walletRes);;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return {
    loading,
    walletData
  };
};
