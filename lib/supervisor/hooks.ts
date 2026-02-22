import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./api";

export const useSupervisorDashboard = () => {
  return useQuery({
    queryKey: ["supervisor-dashboard"],
    queryFn: async () => {
      try {
        return await api.getDashboard();
      } catch (e) {
        console.warn("Dashboard endpoint not found, fetching individual data", e);
        const [students, internships, applications] = await Promise.all([
          api.getStudents(1, 100),
          api.getInternships(undefined, 1, 100),
          api.getApplications(1, 100),
        ]);

        return {
          stats: {
            assignedStudents: students?.totalElements || 0,
            activeInternships: internships?.data?.filter((i: any) => i.status === "OPEN").length || 0,
            interviewing: applications?.data?.filter((a: any) => a.status === "PENDING").length || 0,
            noInternship: (students?.totalElements || 0) - (internships?.data?.filter((i: any) => i.status === "OPEN").length || 0),
          },
          students: students?.data?.slice(0, 5).map((s: any) => ({
            id: s.id,
            name: s.name,
            progress: 0, 
            status: "active",
            startDate: "N/A",
            internship: "N/A",
            company: "N/A"
          })) || [],
          departments: [],
          pendingActions: [
            {
              action: `Review ${applications?.totalElements || 0} applications`,
              priority: "high",
              href: "/supervisor/approvals"
            }
          ]
        };
      }
    },
  });
};

export const useSupervisorStudents = (page = 1, size = 10) =>
  useQuery({
    queryKey: ["supervisor-students", page, size],
    queryFn: () => api.getStudents(page, size),
  });

export const useStudentProfile = (studentId: number) =>
  useQuery({
    queryKey: ["student-profile", studentId],
    queryFn: () => api.getStudentProfile(studentId),
    enabled: !!studentId,
  });

export const useApplications = (page = 1, size = 10) =>
  useQuery({
    queryKey: ["applications", page, size],
    queryFn: () => api.getApplications(page, size),
  });

export const useInternships = (status?: string, page = 1, size = 10) =>
  useQuery({
    queryKey: ["internships", status, page, size],
    queryFn: () => api.getInternships(status, page, size),
  });

export const useCompanies = (page = 1, size = 10) =>
  useQuery({
    queryKey: ["companies",  page, size],
    queryFn: () => api.getCompanies( page, size),
  });

export const useCreateSupervisor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createSupervisor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supervisor-students"] }); // refresh data
    },
  });
};
