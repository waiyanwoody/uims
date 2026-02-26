import { useState, useEffect } from "react";
import api from "@/lib/api";

export const useStudentProfile = (id:number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get(`students/${id}/profile`);
        console.log("student profile", res);

        setProfile(res.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs only once on mount

  return {
    profile,
    loading,
    error,
  };
};
