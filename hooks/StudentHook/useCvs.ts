import { useState } from "react";
import api from "@/lib/api";
import { CV, CvFormRequest } from "@/types/types";

export const useCvs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCv = async (request: CvFormRequest, file: File): Promise<CV> => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      // The backend expects @RequestPart("cvRequest") and @RequestPart("cvForm")
      // To send a JSON object as a RequestPart in FormData, we blob it with application/json
      const cvRequestBlob = new Blob([JSON.stringify(request)], {
        type: "application/json",
      });

      formData.append("cvRequest", cvRequestBlob);
      formData.append("cvForm", file);

      const res = await api.post("/cv-forms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Based on SuccessResponse structure in backend
      return res.data.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to upload CV";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentCvs = async (studentId: number): Promise<CV[]> => {
    try {
      setLoading(true);
      const res = await api.get(`/students/${studentId}/cvs`);
      return res.data.data || res.data;
    } catch (err: any) {
      setError(err.message || "Failed to fetch CVs");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    createCv,
    fetchStudentCvs,
    loading,
    error,
  };
};
