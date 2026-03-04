import api from "@/lib/api";
import { useEffect, useState, useCallback } from "react";

interface SupervisorDashboardData {
  totalStudents: number;
  studentsInInternship: number;
  uniqueCompaniesCount: number;
  pendingGradingCount: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const useSupervisorDashboard = () => {
  const [data, setData] = useState<SupervisorDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get<ApiResponse<SupervisorDashboardData>>(
        "/supervisor/dashboard"
      );

      if (response.data.success) {
        setData(response.data.data);
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
