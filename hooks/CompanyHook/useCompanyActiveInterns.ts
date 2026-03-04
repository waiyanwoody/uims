import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export interface CompanyIntern {
  enrollmentId: number;
  studentId: number;
  studentName: string;
  studentNumber: string;
  companyId: number;
  companyName: string;
  internshipId: number;
  internshipTitle: string;
  startedAt: string;
}

export interface Pagination {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface CompanyInternsReturn {
  data: CompanyIntern[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCompanyActiveInterns = (
  companyId: number,
  page: number = 1,
  size: number = 6
): CompanyInternsReturn => {
  const [data, setData] = useState<CompanyIntern[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInterns = useCallback(async () => {
    if (!companyId) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get(`/companies/${companyId}/active-interns`, {
        params: { page, size },
      });

      const responseData = res.data.data;

      setData(responseData.data ?? []);

      setPagination({
        totalElements: responseData.totalElements,
        totalPages: responseData.totalPages,
        page: responseData.currentPage,
        size: responseData.size,
      });
    } catch (err: any) {
      setError(err.message || "Failed loading active interns");
    } finally {
      setIsLoading(false);
    }
  }, [companyId, page, size]);

  useEffect(() => {
    fetchInterns();
  }, [fetchInterns]);

  return {
    data,
    pagination,
    isLoading,
    error,
    refetch: fetchInterns,
  };
};
