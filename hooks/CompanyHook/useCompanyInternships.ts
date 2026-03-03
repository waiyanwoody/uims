// hooks/CompanyHook/useCompanyInternships.ts
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { Internship } from "@/types/types";

export interface InternshipWithCount extends Internship {
  applicationCount: number;
}

export interface Pagination {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface UseCompanyInternshipsReturn {
  data: InternshipWithCount[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCompanyInternships = (
  companyId: number,
  page: number = 1,
  size: number = 6,
  search: string = "",
  status: string = "",
  category: string = "",
  sortField: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
): UseCompanyInternshipsReturn => {
  const [data, setData] = useState<InternshipWithCount[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInternships = useCallback(async () => {
    if (!companyId) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get(`/companies/${companyId}/internships`, {
        params: {
          page,
          size,
          search: search || undefined,
          status: status || undefined,
          category: category || undefined,
          sortField,
          sortOrder,
        },
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
      setError(err.message || "Failed to load internships");
    } finally {
      setIsLoading(false);
    }
  }, [companyId, page, size, search, status, category, sortField, sortOrder]);

  useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);

  return {
    data,
    pagination,
    isLoading,
    error,
    refetch: fetchInternships,
  };
};
