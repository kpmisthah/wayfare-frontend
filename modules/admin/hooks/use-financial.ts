"use client"
import { useEffect, useState } from "react";
import { getFinance,getAgencyRevenue } from "../services/finance.service";

interface Transaction {
  id: string;
  date: string;
  commission: number;
  type: string;
}

interface FinanceOverview {
  totalRevenue: number;
  totalCommission: {
    _sum: {
      platformEarning: number;
    };
  };
  walletBalance: number;
  activeAgencies: number;
  transactionSummary: Transaction[];
}

interface AgencyRevenue {
  agencyId: string;
  agencyName: string;
  platfromEarning: number;
  all: number;
}

export const useFinance = () => {
  const [overview, setOverview] = useState<FinanceOverview | null>(null);
  const [agencies, setAgencies] = useState<AgencyRevenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [financeRes, agencyRes] = await Promise.all([
          getFinance(),
          getAgencyRevenue(),
        ]);
        setOverview(financeRes);
        setAgencies(agencyRes);
      } catch (err) {
        console.error("Error fetching finance data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { overview, agencies, loading };
};
