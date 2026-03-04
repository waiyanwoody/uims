import { useState, useEffect } from "react";
import api from "@/lib/api";
import { StudentFullDetailResponse, SuccessResponse } from "@/types/types";
import { toast } from "sonner";

export const useStudentFullDetail = (studentId: number) => {
  const [data, setData] = useState<StudentFullDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<
          SuccessResponse<StudentFullDetailResponse>
        >(`/students/${studentId}/full-detail`);
        setData(response.data.data);
      } catch (err: any) {
        console.error("Error fetching student details:", err);
        const errorMessage =
          err.response?.data?.message || "Failed to fetch student details";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  return { studentFullDetail: data, isLoading, error };
};
