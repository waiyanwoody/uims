import { useState } from "react";
import api from "@/lib/api";

export const useUpdateStudentProfile = (id: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const updateProfile = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.put(`/students/${id}/profile`, data);
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
