import { useState } from "react";
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
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

export const useReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<InternshipReportResponse[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse<any>, "data"> | null>(null);

  const fetchReports = async (page: number = 0, size: number = 10, expirySeconds: number = 3600) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/internship-reports", {
        params: { page, size, expirySeconds },
      });
      
      // Since backend returns SuccessResponse<PaginatedResponse<...>>
      // we need to access response.data.data
      const successResponse = response.data;
      const paginatedData = successResponse?.data || { data: [], totalPages: 0, totalElements: 0, page: 0, size: 10 };
      
      const reportList = paginatedData.data || [];
      setReports(reportList);
      setPagination({
        totalPages: paginatedData.totalPages || 0,
        totalElements: paginatedData.totalElements || 0,
        page: paginatedData.page || 0,
        size: paginatedData.size || 10,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch reports";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const uploadReport = async (
    internshipId: number,
    monthNumber: number,
    file: File,
    summary: string,
    expirySeconds: number = 300
  ): Promise<InternshipReportResponse | null> => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const params = {
      internshipId,
      monthNumber,
      summary,
      expirySeconds,
    };

    try {
      const response = await api.post<any>("/internship-reports", formData, {
        params,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // The backend returns a SuccessResponse<InternshipReportResponse>
      const responseData = response.data?.data;
      toast.success(response.data?.message || "Report submitted successfully!");
      return responseData;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to upload report";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadReport,
    fetchReports,
    reports,
    pagination,
    loading,
    error,
  };
};
