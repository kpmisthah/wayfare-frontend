"use client";
import { useEffect, useState } from "react";
import { fetchPackages, updatedPackage, updatePackageStatus } from "../services/package.api";
import { PackageData, PackageListing } from "../types/package.type";


export const useFetchPackages = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 6;

  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true);
      try {
        const data = await fetchPackages(page, limit, search);
        setPage(data.page);
        setPackages(data.items || []);
        setTotalPage(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      loadPackages();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [page, limit, search]);

  const nextPage = () => page < totalPage && setPage((prev) => prev + 1);
  const prevPage = () => page > 1 && setPage((prev) => prev - 1);


  return {
    packages,
    setPackages,
    nextPage,
    prevPage,
    setPage,
    page,
    totalPage,
    loading,
    setLoading,
    search,
    setSearch
  };
};
