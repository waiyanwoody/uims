import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Internship } from "@/types/types";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Fetching from internships endpoint to derive categories
      // Using a larger size to capture all unique categories
      const res = await api.get("/internships", {
        params: {
          page: 1,
          size: 100,
        },
      });

      const internships = res.data.data.data;

      if (Array.isArray(internships)) {
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(internships.map((i: Internship) => i.category)),
        ).sort() as string[];

        setCategories(uniqueCategories);
      } else {
        console.error("Internship data is not an array:", internships);
        setCategories([]);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error };
};
