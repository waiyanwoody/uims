import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Internship } from "@/types/types";

export interface PaginatedResponse<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export const useInternship = (
  page: number = 1,
  size: number = 10,
  status?: string,
  search?: string,
  category?: string,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [pagination, setPagination] = useState<Omit<
    PaginatedResponse<Internship>,
    "data"
  > | null>(null);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/internships", {
        params: {
          page,
          size,
          ...(status && { status }),
          ...(search && { search }),
          ...(category && { category }),
        },
      });

      const responseData = res.data.data; // This is the PaginatedResponse
      setInternships(responseData.data);
      setPagination({
        totalElements: responseData.totalElements,
        totalPages: responseData.totalPages,
        page: responseData.page,
        size: responseData.size,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [page, size, status, search, category]);

  return {
    internships,
    pagination,
    loading,
    error,
    refetch: fetchInternships,
  };
};
