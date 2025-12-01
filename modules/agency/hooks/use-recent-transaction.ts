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
      setData(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletTx();
  }, []);

  return { loading, data };
};
