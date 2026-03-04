import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { ApplicationWithDetails } from "@/types/types";

export const useApplicationDetails = (applicationId: number | undefined) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<ApplicationWithDetails | null>(
    null
  );

  const fetchApplication = useCallback(async () => {
    if (!applicationId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/applications/${applicationId}`);

      // Based on your JSON: { success: true, data: { ... }, message: "..." }
      const responseData = res.data.data;

      if (responseData) {
        setApplication(responseData);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to load application";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  return { application, loading, error, refetch: fetchApplication };
};
