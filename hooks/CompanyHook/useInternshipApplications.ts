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

  status: "PENDING" | "INTERVIEW" | "APPROVED" | "REJECTED";

  appliedAt: string;

  interviewDate?: string;
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

export const useInternshipApplications = (
  internshipId: number,
  page: number = 1,
  size: number = 6
): ApplicationsReturn => {
  const [data, setData] = useState<Application[]>([]);

  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!internshipId) return;

    try {
      setIsLoading(true);
      setError(null);

    console.log("internshipid",internshipId)
      const res = await api.get(`internships/${internshipId}/applications`, {
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
      setError(err.message || "Failed loading applications");
    } finally {
      setIsLoading(false);
    }
  }, [internshipId, page, size]);

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
