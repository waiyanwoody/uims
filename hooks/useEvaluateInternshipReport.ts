"use client";

import { useState } from "react";
import api from "@/lib/api";

export type EvaluationRole = "hr-evaluate" | "supervisor-evaluate";

interface EvaluatePayload {
  score: number;
  feedback: string;
}

interface EvaluateResponse {
  success: boolean;
  error?: string;
}

export const useEvaluateInternshipReport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const evaluateReport = async (
    reportId: number,
    role: EvaluationRole,
    payload: EvaluatePayload
  ): Promise<EvaluateResponse> => {
      console.log("Evaluating report", { reportId, role, payload });
    try {
      setIsLoading(true);

      await api.post(`/internship-reports/${reportId}/${role}`, payload);

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error?.response?.data?.message || "Evaluation failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    evaluateReport,
    isLoading,
  };
};
