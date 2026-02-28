import { useState, useEffect } from "react";
import api from "@/lib/api";
import { ApplicationWithDetails } from "@/types/types";

export interface PaginatedResponse<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export const useStudentApplications = (
  studentId: number | undefined,
  page: number = 1,
  size: number = 10,
  status?: string,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [applications, setApplications] = useState<ApplicationWithDetails[]>(
    [],
  );
  const [pagination, setPagination] = useState<Omit<
    PaginatedResponse<ApplicationWithDetails>,
    "data"
  > | null>(null);

  const fetchApplications = async () => {
    if (!studentId) return;
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/applications", {
        params: {
          studentId,
          page,
          size,
          status: status && status !== "all" ? status.toUpperCase() : undefined,
        },
      });

      const responseData = res.data.data;
      if (responseData && responseData.data) {
        setApplications(responseData.data);
        setPagination({
          totalElements: responseData.totalElements,
          totalPages: responseData.totalPages,
          page: responseData.page,
          size: responseData.size,
        });
      } else {
        setApplications(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching student applications:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [studentId, page, size, status]);

  return {
    applications,
    pagination,
    loading,
    error,
    refetch: fetchApplications,
  };
};
