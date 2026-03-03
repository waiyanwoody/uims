import { useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

export interface InternshipReportResponse {
  id: number;
  studentName: string;
  summary: string;
  internshipTitle: string;
  monthNumber: number;
  presignedUrl?: string;
  hrValidated: boolean;
  status: string;
  createdAt: string;
}

export interface InternshipReportDetailResponse {
  id: number;
  internshipId: number;
  studentId: number;
  studentName: string;
  internshipTitle: string;
  summary: string;
  monthNumber: number;
  status: string;
  hrScore: number | null;
  hrFeedback: string | null;
  hrValidated: boolean | null;
  supervisorScore: number | null;
  supervisorFeedback: string | null;
  supervisorValidated: boolean | null;
  presignedUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

export const useSupervisorReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<InternshipReportResponse[]>([]);
  const [pagination, setPagination] = useState<{
    totalPages: number;
    totalElements: number;
    page: number;
    size: number;
  } | null>(null);

  const fetchReports = useCallback(
    async (
      page: number = 0,
      size: number = 10,
      expirySeconds: number = 3600,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/internship-reports", {
          params: { page, size, expirySeconds },
        });

        // Backend returns SuccessResponse<PaginatedResponse<InternshipReportResponse>>
        // response.data is SuccessResponse. response.data.data is PaginatedResponse
        const successResponse = response.data;
        const paginatedData = successResponse?.data || {
          data: [],
          totalPages: 0,
          totalElements: 0,
          page: 0,
          size: 10,
        };

        setReports(paginatedData.data || []);
        setPagination({
          totalPages: paginatedData.totalPages || 0,
          totalElements: paginatedData.totalElements || 0,
          page: paginatedData.page || 0,
          size: paginatedData.size || 10,
        });
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch reports";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchReportDetails = useCallback(
    async (
      reportId: number,
      expirySeconds: number = 3600,
    ): Promise<InternshipReportDetailResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/internship-reports/${reportId}`, {
          params: { expirySeconds },
        });
        // Backend returns SuccessResponse<InternshipReportDetailResponse>
        return response.data?.data || null;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch report details";
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Placeholder for review submission if needed
  const submitReview = useCallback(
    async (
      reportId: number,
      score: number,
      feedback: string,
      status:
        | "APPROVED"
        | "REJECTED"
        | "SUPERVISOR_VALIDATED" = "SUPERVISOR_VALIDATED",
    ) => {
      setLoading(true);
      try {
        // This endpoint is hypothetical based on typical patterns.
        // If the backend for this isn't provided, this might need adjustment.
        // However, to "finish review", we likely need to PUT/PATCH somewhere.
        // For now, I'll assume an endpoint or just log it.
        // If the user didn't provide it, maybe they just want the fetch part working for now.
        // But I'll add a structured call assuming a standard update endpoint.
        const response = await api.patch(
          `/internship-reports/${reportId}/supervisor-review`,
          {
            score,
            feedback,
            status, // or valid boolean
          },
        );
        toast.success("Review submitted successfully");
        return response.data;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to submit review";
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    reports,
    pagination,
    loading,
    error,
    fetchReports,
    fetchReportDetails,
    submitReview,
  };
};
