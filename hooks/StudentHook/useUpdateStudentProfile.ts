import { useState } from "react";
import api from "@/lib/api";

export const useUpdateStudentProfile = (id: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const updateProfile = async (data: any, profileImage?: File) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      const requestBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      formData.append("profile", requestBlob);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await api.put(`/students/${id}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Update student profile response:", res);

      return res.data.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    loading,
    error,
  };
};
