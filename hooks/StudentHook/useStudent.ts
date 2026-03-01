import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Student } from "@/types/types";

export const useStudent = (id: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [student, setStudent] = useState<Student | null>(null);

  const fetchStudent = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      // Changing from /students/${id} to /students/${id}/profile to see if student number is there
      // or if there is another endpoint we should use.
      const res = await api.get(`/students/${id}/profile`);
      setStudent(res.data.data);
    } catch (err) {
      console.error("Error fetching student:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  return {
    student,
    loading,
    error,
    refetch: fetchStudent,
  };
};
