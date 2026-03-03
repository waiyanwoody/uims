import { useState } from "react";
import api from "@/lib/api";

export const useReviewApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviewApplication = async (
    id: number,

    data: any
  ) => {
    try {
      setIsSubmitting(true);

      await api.put(
        `/applications/${id}/review`,

        data
      );

      return { success: true };
    } catch (err: any) {
      return {
        success: false,

        error: err.message,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    reviewApplication,

    isSubmitting,
  };
};
