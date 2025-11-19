"use client";
import { useEffect, useState } from "react";
import { getWallet, getWalletTransaction } from "../services/wallet.api";
import { WalletTransaction } from "../types/wallet-transaction.type";

export const useWallet = (activeTab?:string) => {
  const [wallet, setWallet] = useState<{ balance: number }>({
    balance: 0,
  });
  const[transactionData,setTransactionData] = useState<WalletTransaction[]>([])
  const [isProcessing, setIsProcessing] = useState(false);
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
    const response = await getWallet();
    setWallet({ balance: response });
  };
  const transactionHistory = async()=>{
    const response = await getWalletTransaction()
    setTransactionData(response)
  }
    useEffect(() => {
      const fetchData = async()=>{
      await fetchWallet();
      await transactionHistory()
      }
      fetchData()
  }, []);
  useEffect(() => {
    if(activeTab === 'wallet'){
    fetchWallet();
    transactionHistory()
    }
  }, [activeTab]);
useEffect(()=>{
  console.log(transactionData,'transactionData in hook')
},[])
  return {
    wallet,
    payWithWallet,
    isProcessing,
    transactionData
  };
};
