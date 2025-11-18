'use client'
import { useEffect, useState } from "react"
import { getWallet } from "../services/wallet.api"

export const useWallet = ()=>{
    const[wallet,setWallet] = useState<{balance:number}>({
        balance:0
    })
  const [isProcessing, setIsProcessing] = useState(false);
    const payWithWallet = async (amount: number) => {
      setIsProcessing(true);
      try {
    
        await getWallet()
        return { success: true };
      } catch (error) {
        return { success: false, error };
      } finally {
        setIsProcessing(false);
      }
    };
    useEffect(()=>{
        const fetchWallet = async()=>{
            const response = await getWallet()
            setWallet({balance:response})
        }
        fetchWallet()
    },[])

    return {
        wallet,
        payWithWallet,
        isProcessing
    }


}