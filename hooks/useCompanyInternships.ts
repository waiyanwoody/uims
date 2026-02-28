import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export const useCompanyInternships = (
  companyId: number,
  page: number = 1,
  size: number = 10
) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshSignal, setRefreshSignal] = useState(0); // Add this toggle

  // We use useCallback so the function identity doesn't change on every render
  const refetch = useCallback(() => {
    setRefreshSignal((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/companies/${companyId}/internships`, {
          params: { page, size },
        });
        setData(res.data.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch");
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) fetchInternships();
  }, [companyId, page, size, refreshSignal]); // Listen to refreshSignal

  return { data, isLoading, error, refetch }; // Now refetch is returned!
};
