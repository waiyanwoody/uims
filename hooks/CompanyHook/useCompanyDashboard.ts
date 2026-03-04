import api from "@/lib/api";
import { useEffect, useState, useCallback } from "react";

interface CompanyDashboardData {
  totalInternships: number;
  totalApplications: number;
  activeInterns: number;
  pendingApplications: number;
  reportsAwaitingEvaluation: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const useCompanyDashboard = () => {
  const [data, setData] = useState<CompanyDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get<ApiResponse<CompanyDashboardData>>(
        "/companies/dashboard"
      );

      if (response.data.success) {
        setData(response.data.data); // 👈 IMPORTANT (extract nested data)
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch dashboard");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
};
