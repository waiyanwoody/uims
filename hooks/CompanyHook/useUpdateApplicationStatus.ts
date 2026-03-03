import { useState } from "react";
import api from "@/lib/api";

export const useUpdateApplicationStatus = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (
    id: number,

    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      setIsUpdating(true);

      await api.put(
        `/applications/${id}/status`,

        { status }
      );

      return { success: true };
    } catch (err: any) {
      return {
        success: false,

        error: err.message,
      };
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateStatus,

    isUpdating,
  };
};
