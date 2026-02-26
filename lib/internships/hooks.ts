import api from "@/lib/api";

export interface CreateInternshipPayload {
  companyId: number;
  title: string;
  description: string;
  category: string;
  requirements: string;
  slots: number;
  deadline: string;
}

/**
 * Get internships list
 */

export const getInternships = async (page: number = 1, size: number = 10) => {
  const res = await api.get("/internships", {
    params: { page, size },
  });

  return res.data.data.data;
};


/**
 * Create internship
 */

export const createInternship = async (
  data: CreateInternshipPayload
) => {

  const res = await api.post(
    "/api/v1/internships",
    data
  );

  return res.data;

};