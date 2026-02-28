import { useState } from "react";
import api from "@/lib/api";
import { CV, CvFormRequest } from "@/types/types";

const mapApiCvToCV = (cv: any): CV => ({
  id: cv.id,
  student_id: cv.student_id ?? cv.studentId,
  title: cv.title,
  file_path: cv.file_path ?? cv.filePath,
  uploadedDate: cv.uploadedDate ?? cv.createdAt,
  updated_at: cv.updated_at ?? cv.updatedAt,
});

export const useCvs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload CV
  const createCv = async (request: CvFormRequest, file: File): Promise<CV> => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      const normalizedStudentId = request.studentId ?? request.student_id;
      const requestPayload = {
        title: request.title,
        studentId: normalizedStudentId,
        student_id: normalizedStudentId,
      };

      // Blob JSON for @RequestPart
      const cvRequestBlob = new Blob([JSON.stringify(requestPayload)], {
        type: "application/json",
      });

      // Support both legacy and current request-part names from backend implementations
      formData.append("cvRequest", cvRequestBlob);
      formData.append("cvFormUploadRequest", cvRequestBlob);
      formData.append("cvForm", file);

      const res = await api.post("/cv-forms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // backend commonly returns { data: {...cv} }
      const uploadedCv = res.data?.data;
      return mapApiCvToCV(uploadedCv);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to upload CV";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch CVs for current user (JWT-based)
  const fetchCvs = async (page = 1, size = 10): Promise<CV[]> => {
    try {
      setLoading(true);

      const res = await api.get(`/cv-forms?page=${page}&size=${size}`);

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to fetch CVs");
      }

      const payload = res.data?.data;

      // Support multiple pagination formats: {data: [...]}, {content: [...]}, or direct []
      const rawList: any[] = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.content)
            ? payload.content
            : [];

      const cvs: CV[] = rawList.map(mapApiCvToCV);

      return cvs;
    } catch (err: any) {
      setError(err.message || "Failed to fetch CVs");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Delete CV by id
  const deleteCv = async (cvId: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.delete(`/cv-forms?cvId=${cvId}`);

      if (res.data && res.data.success === false) {
        throw new Error(res.data.message || "Failed to delete CV");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete CV";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCv,
    fetchCvs,
    deleteCv,
    loading,
    error,
  };
};

