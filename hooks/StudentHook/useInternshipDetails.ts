import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Internship } from "@/types/types";

export const useInternshipDetails = (id: string | number) => {
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchInternshipDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/internships/${id}`);
        setInternship(res.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternshipDetails();
  }, [id]);

  return { internship, loading, error };
};
