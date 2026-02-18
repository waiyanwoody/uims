import { apiClient } from "../api-client";

const PREFIX = "/api/v1";

export const getDashboard = async () => {
  const res = await apiClient.get(`${PREFIX}/supervisor/dashboard`);
  return res.data.data;
};

export const getStudents = async (page = 1, size = 10) => {
  const res = await apiClient.get(`${PREFIX}/students`, {
    params: { page, size },
  });
  return res.data.data;
};

export const getStudentProfile = async (studentId: number) => {
  const res = await apiClient.get(`${PREFIX}/students/${studentId}/profile`);
  return res.data.data;
};

export const getApplications = async (page = 1, size = 10) => {
  const res = await apiClient.get(`${PREFIX}/applications`, {
    params: { page, size },
  });
  return res.data.data;
};

export const createSupervisor = async (payload: {
  name: string;
  email: string;
  password?: string;
  department?: string;
  phone?: string;
}) => {
  const res = await apiClient.post(`${PREFIX}/supervisor`, payload);
  return res.data.data;
};

export const getInternships = async (status?: string, page = 1, size = 10) => {
  const res = await apiClient.get(`${PREFIX}/internships`, {
    params: { status, page, size },
  });
  return res.data.data;
};
