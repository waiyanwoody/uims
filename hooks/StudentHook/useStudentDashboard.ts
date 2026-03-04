import api from "@/lib/api";
import { useEffect, useState, useCallback } from "react";

// Matches your new JSON structure
export interface ApplicationSummary {
  TOTAL: number;
  INTERVIEWING: number;
  PENDING: number;
  APPROVED: number;
  REJECTED: number;
}

interface StudentDashboardData {
  applicationSummary: ApplicationSummary;
  cvUploaded: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const useStudentDashboard = () => {
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Changed endpoint to student dashboard
      const response = await api.get<ApiResponse<StudentDashboardData>>(
        "/student/dashboard"
      );

      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch student dashboard"
      );
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
