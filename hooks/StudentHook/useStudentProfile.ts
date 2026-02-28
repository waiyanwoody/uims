import { useState, useEffect } from "react";
import api from "@/lib/api";

export const useStudentProfile = (id: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);

        const res = await api.get(`/students/${id}/profile`);
        console.log("student profile", res);

        setProfile(res.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]); // Add id to dependency array

  return {
    profile,
    loading,
    error,
  };
};
