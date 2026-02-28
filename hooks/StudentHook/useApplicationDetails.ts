import { useState, useEffect } from "react";
import api from "@/lib/api";
import { ApplicationWithDetails } from "@/types/types";

export const useApplicationDetails = (applicationId: number | undefined) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<ApplicationWithDetails | null>(
    null,
  );

  const fetchApplication = async () => {
    if (!applicationId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/applications/${applicationId}`);
      // Log the full response to help debug structure
      console.log("Application Details raw response:", res.data);

      const responseData = res.data.data || res.data;

      // Map potential property name variations (camelCase vs snake_case)
      const mappedApplication = {
        ...responseData,
        internship:
          responseData.internship ||
          responseData.internshipPost ||
          responseData.internship_post,
        cvForm: responseData.cvForm || responseData.cv_form || responseData.cv,
        studentId: responseData.studentId || responseData.student_id,
        appliedAt: responseData.appliedAt || responseData.applied_at,
      };

      setApplication(mappedApplication);
    } catch (err: any) {
      console.error("Error fetching application details:", err);
      // Attempt to extract error message from common response patterns
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to load application details";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  return { application, loading, error, refetch: fetchApplication };
};
