import { useState, useEffect } from "react";
import { getRecentWalletTx } from "../services/wallet.api";
import { RecentWalletTx } from "../types/wallet.type";

export const useRecentWalletTx = () => {
  const [data, setData] = useState<RecentWalletTx[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWalletTx = async () => {
    try {
      setLoading(true);
      const response = await getRecentWalletTx();
      setData(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Failed to fetch wallet transactions:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletTx();
  }, []);

  return { loading, data };
};
