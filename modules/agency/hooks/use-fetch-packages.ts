"use client";
import { useEffect, useState } from "react";
import { fetchPackages, updatedPackage, updatePackageStatus } from "../services/package.api";
import { PackageData, PackageListing } from "../types/package.type";
import { PackageStatus } from "../types/package.enum";

export const useFetchPackages = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    setLoading(true)
    try {
      const loadPackages = async () => {
        const data = await fetchPackages(page, limit);
        // console.log(data.items,'in fetch packagess')
        setPage(data.page);
        setPackages(data.items||[]);
        setTotalPage(data.totalPages);
        setTotalPage(data.total);
      };
      loadPackages();
    } catch (error) {
    } finally {
        setLoading(false)
    }
  }, [page, limit]);
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
    setLoading
  };
};
