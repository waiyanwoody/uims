import { useState } from "react";
import api from "@/lib/api";

export type CompanyRegisterRequest = {
  companyName: string;
  industry: string;
  location: string;
  hrName: string;
  hrEmail: string;
  hrPhone: string;
  hrPassword: string;
};

export const useRegisterCompany = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const registerCompany = async (data: CompanyRegisterRequest) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post("/companies", data);

      return res.data.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerCompany,
    loading,
    error,
  };
};
