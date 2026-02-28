import { useState } from "react";
import api from "@/lib/api";

export type InternshipCreateRequest = {
  companyId: number;
  title: string;
  description: string;
  category: string;
  requirements: string;
  slots: number;
  deadline: string; // format: YYYY-MM-DD
};

export const useCreateInternship = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const createInternship = async (data: InternshipCreateRequest) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post("/internships", data);

      return res.data.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createInternship,
    loading,
    error,
  };
};
