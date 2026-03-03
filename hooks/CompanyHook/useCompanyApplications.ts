import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
}

export interface Internship {
  id: number;
  title: string;
  category: string;
}

export interface CvForm {
  id: number;
  title: string;
  filePath: string;
}

export interface Application {
  id: number;

  student: Student;

  internship: Internship;

  cvForm: CvForm;

  status: "PENDING" | "APPROVED" | "REJECTED";

  appliedAt: string;
}

export interface Pagination {
  totalElements: number;

  totalPages: number;

  page: number;

  size: number;
}

export interface ApplicationsReturn {
  data: Application[];

  pagination: Pagination | null;

  isLoading: boolean;

  error: string | null;

  refetch: () => void;
}

export const useCompanyApplications = (
  companyId: number,

  page: number = 1,

  size: number = 6
): ApplicationsReturn => {
  const [data, setData] = useState<Application[]>([]);

  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      setIsLoading(true);

      setError(null);

      const res = await api.get(
        `/companies/${companyId}/applications`,

        {
          params: { page, size },
        }
      );

      const responseData = res.data.data;

      setData(responseData.data ?? []);

      setPagination({
        totalElements: responseData.totalElements,

        totalPages: responseData.totalPages,

        page: responseData.currentPage,

        size: responseData.size,
      });
    } catch (err: any) {
      setError(err.message || "Failed loading applications");
    } finally {
      setIsLoading(false);
    }
  }, [companyId, page, size]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    data,

    pagination,

    isLoading,

    error,

    refetch: fetchApplications,
  };
};
