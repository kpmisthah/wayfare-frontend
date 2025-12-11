"use client";
import { useEffect, useState, useCallback } from "react";
import {
  getFinance,
  getAgencyRevenue,
  FinanceQueryParams,
} from "../services/finance.service";

export interface Transaction {
  id: string;
  date: string;
  commission: number;
  type: string;
  status: string;
  category: string;
  agencyName?: string;
  destination?: string;
  bookingCode?: string;
}

export interface TransactionSummary {
  data: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FinanceOverview {
  totalRevenue: number;
  totalCommission: number;
  walletBalance: number;
  activeAgencies: number;
  transactionSummary: TransactionSummary;
}

export interface AgencyRevenue {
  agencyId: string;
  agencyName: string;
  platformEarning: number;
  all: number;
}

export interface AgencyRevenueResult {
  data: AgencyRevenue[];
  total: number;
  page: number;
  totalPages: number;
}

export const useFinance = () => {
  const [overview, setOverview] = useState<FinanceOverview | null>(null);
  const [agencies, setAgencies] = useState<AgencyRevenueResult | null>(null);
  const [loading, setLoading] = useState(true);

  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionSearch, setTransactionSearch] = useState("");
  const [transactionLoading, setTransactionLoading] = useState(false);

  const [agencyPage, setAgencyPage] = useState(1);
  const [agencySearch, setAgencySearch] = useState("");
  const [agencyLoading, setAgencyLoading] = useState(false);

  const LIMIT = 10;


  const fetchFinance = useCallback(
    async (params?: FinanceQueryParams) => {
      try {
        setTransactionLoading(true);
        const financeRes = await getFinance({
          page: params?.page ?? transactionPage,
          limit: LIMIT,
          search: params?.search ?? transactionSearch,
        });
        setOverview(financeRes);
      } catch (err) {
        console.error("Error fetching finance data", err);
      } finally {
        setTransactionLoading(false);
      }
    },
    [transactionPage, transactionSearch]
  );

  const fetchAgencies = useCallback(
    async (params?: FinanceQueryParams) => {
      try {
        setAgencyLoading(true);
        const agencyRes = await getAgencyRevenue({
          page: params?.page ?? agencyPage,
          limit: LIMIT,
          search: params?.search ?? agencySearch,
        });
        setAgencies(agencyRes);
      } catch (err) {
        console.error("Error fetching agency data", err);
      } finally {
        setAgencyLoading(false);
      }
    },
    [agencyPage, agencySearch]
  );

  // Initial load
  useEffect(() => {
    async function initialFetch() {
      setLoading(true);
      await Promise.all([fetchFinance(), fetchAgencies()]);
      setLoading(false);
    }
    initialFetch();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchFinance();
    }
  }, [transactionPage, transactionSearch]);

  useEffect(() => {
    if (!loading) {
      fetchAgencies();
    }
  }, [agencyPage, agencySearch]);

  const handleTransactionSearch = (search: string) => {
    setTransactionSearch(search);
    setTransactionPage(1); 
  };

  const handleAgencySearch = (search: string) => {
    setAgencySearch(search);
    setAgencyPage(1); 
  };

  return {
    overview,
    agencies,
    loading,
    transactionPage,
    setTransactionPage,
    transactionSearch,
    handleTransactionSearch,
    transactionLoading,
    transactionTotalPages: overview?.transactionSummary?.totalPages ?? 1,
    transactionTotal: overview?.transactionSummary?.total ?? 0,
    transactions: overview?.transactionSummary?.data ?? [],
    agencyPage,
    setAgencyPage,
    agencySearch,
    handleAgencySearch,
    agencyLoading,
    agencyTotalPages: agencies?.totalPages ?? 1,
    agencyTotal: agencies?.total ?? 0,
    agencyList: agencies?.data ?? [],
  };
};
