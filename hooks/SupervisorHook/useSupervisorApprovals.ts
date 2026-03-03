import { useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

export interface PendingCompanyHrResponse {
  hrId: number;
  hrName: string;
  hrEmail: string;
  hrPhone: string;
  companyId: number;
  companyName: string;
  industry: string;
  location: string;
  companyStatus: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
}

export const useSupervisorApprovals = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approvals, setApprovals] = useState<PendingCompanyHrResponse[]>([]);
  const [pagination, setPagination] = useState<{
    totalPages: number;
    totalElements: number;
    page: number;
    size: number;
  } | null>(null);

  const fetchPendingApprovals = useCallback(
    async (page: number = 0, size: number = 10) => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching pending approvals: page=${page}, size=${size}`);
        const response = await api.get("/companies/pendingHrAccounts", {
          params: { page, size },
        });
        console.log("Pending approvals response:", response.data);

        // Based on user provided JSON:
        // { success: true, data: { data: [...], totalPages: 1, ... }, message: "..." }
        const apiResponse = response.data;
        const pageData = apiResponse.data || {};
        const content = pageData.data || []; // The inner 'data' array contains the specific items

        // Ensure content is an array and filter out nulls/undefined
        const validContent = Array.isArray(content)
          ? content.filter((item) => item !== null && item !== undefined)
          : [];

        setApprovals(validContent);
        setPagination({
          totalPages: pageData.totalPages || 0,
          totalElements: pageData.totalElements || validContent.length,
          page: pageData.currentPage || page + 1, // API returns 1-based currentPage
          size: pageData.size || size,
        });
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch pending approvals";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const approveCompanyHr = useCallback(async (companyHrId: number) => {
    setLoading(true);
    try {
      // The error log indicates that /companies/{id}/reject is 404.
      // Since the service method calls supervisorService.approveCompany(), it is likely
      // located in the SupervisorController which maps to /supervisors.
      const response = await api.post(`/supervisors/${companyHrId}/approve`);
      toast.success("Company HR registration approved successfully");
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to approve company HR";
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const rejectCompanyHr = useCallback(async (companyHrId: number) => {
    setLoading(true);
    try {
      // Same logic as approve - likely in SupervisorController
      const response = await api.post(`/supervisors/${companyHrId}/reject`);
      toast.success("Company HR registration rejected successfully");
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to reject company HR";
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    approvals,
    pagination,
    loading,
    error,
    fetchPendingApprovals,
    approveCompanyHr,
    rejectCompanyHr,
  };
};
