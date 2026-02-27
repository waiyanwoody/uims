import { useState } from "react";
import api from "@/lib/api";
import { CreateApplicationRequest, Application } from "@/types/types";

export const useApplication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createApplication = async (
    request: CreateApplicationRequest,
  ): Promise<Application> => {
    try {
      setLoading(true);
      setError(null);

      // Assuming the backend endpoint follows the pattern /applications
      const res = await api.post("/applications", request);

      // Assuming the backend returns the created application in res.data
      // Based on useUpdateStudentProfile, it might be in res.data.data
      return res.data.data || res.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create application";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createApplication,
    loading,
    error,
  };
};
