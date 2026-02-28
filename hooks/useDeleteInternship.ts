import api from "@/lib/api";
import { useState } from "react";

export const useDeleteInternship = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteInternship = async (id: number) => {
    setIsDeleting(true);
    try {
      // Backend expects DELETE /api/internships/{id}
      await api.delete(`/internships/${id}`);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || "Failed to delete internship",
      };
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteInternship, isDeleting };
};
