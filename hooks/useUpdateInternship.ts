import api from "@/lib/api";
import { useState } from "react";

export const useUpdateInternship = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateInternship = async (id: number, data: any) => {
    setIsUpdating(true);
    try {
      // Backend expects PUT /api/internships/{id}
        // Note: We format the date to local string before sending if necessary
        const res = await api.put(`/internships/${id}`, data);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || "Update failed",
      };
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateInternship, isUpdating };
};
