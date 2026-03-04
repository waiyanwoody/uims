import { useState } from "react";
import api from "@/lib/api";

export type ApplicationStatus =
  | "PENDING"
  | "INTERVIEWING"
  | "APPROVED"
  | "REJECTED";

export const useUpdateApplicationStatus = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Move application to the next step
   */
  const moveToNextStep = async (
    id: number,
    currentStatus: ApplicationStatus,
    interviewDate?: string
  ) => {
    try {
      setIsUpdating(true);
      console.log("Moving application", id, "from", currentStatus, "with interviewDate", interviewDate);
      if (currentStatus === "PENDING") {
        console.log("Moving to INTERVIEW ", id);
        // Move to INTERVIEW
        await api.post(`/companies/applications/${id}/interview`, {
          interviewDate: interviewDate ?? new Date().toISOString(),
        });
      } else if (currentStatus === "INTERVIEWING") {
        // Move to APPROVED
        await api.post(`/companies/applications/${id}/approve`);
      } else {
        throw new Error("Cannot move forward from this status");
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setIsUpdating(false);
    }
  };

  const rejectApplication = async (id: number) => {
    try {
      setIsUpdating(true);
      await api.post(`/companies/applications/${id}/reject`);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setIsUpdating(false);
    }
  };

  return { moveToNextStep, rejectApplication, isUpdating };
};
