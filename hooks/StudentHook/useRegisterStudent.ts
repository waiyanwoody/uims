import { useState } from "react";
import api from "@/lib/api";

export type StudentRegisterRequest = {
  name: string;
  gender: "MALE" | "FEMALE";
  address: string;
  studentNumber: string;
  email: string;
  password: string;
  major: string;
};

export const useRegisterStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const registerStudent = async (data: StudentRegisterRequest) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post("/students", data);
      console.log("Register student response:", res);

      return res.data.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerStudent,
    loading,
    error,
  };
};
