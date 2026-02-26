import { useState } from "react";
import api from "@/lib/api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type UserType = "student" | "company" | "supervisor";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<any>(null);

  const login = async (type: UserType, data: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint =
        type === "student"
          ? "students"
          : type === "company"
          ? "companies"
          : "supervisor";
      const res = await api.post(`/${endpoint}/login`, data);

      return res.data.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};
