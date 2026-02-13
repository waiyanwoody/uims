import { useQuery } from "@tanstack/react-query";

// Mock delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Student Dashboard Data
export const useStudentDashboard = () => {
  return useQuery({
    queryKey: ["student-dashboard"],
    queryFn: async () => {
      await delay(600);
      return {
        stats: {
          total: 12,
          approved: 3,
          pending: 5,
          rejected: 4,
        },
        applications: [
          {
            id: 1,
            company: "Google",
            position: "Software Engineer Intern",
            location: "Mountain View, CA",
            appliedDate: "2 days ago",
            status: "pending",
            salary: "$25/hour",
          },
          {
            id: 2,
            company: "Apple",
            position: "Product Design Intern",
            location: "Cupertino, CA",
            appliedDate: "5 days ago",
            status: "approved",
            salary: "$28/hour",
          },
          {
            id: 3,
            company: "Meta",
            position: "Data Science Intern",
            location: "Menlo Park, CA",
            appliedDate: "1 week ago",
            status: "rejected",
            salary: "$26/hour",
          },
        ],
        deadlines: [
          { company: "Microsoft", deadline: "In 3 days", status: "urgent" },
          { company: "Tesla", deadline: "In 7 days", status: "upcoming" },
          { company: "Netflix", deadline: "In 14 days", status: "safe" },
        ],
      };
    },
  });
};

// Company/HR Dashboard Data
export const useCompanyDashboard = () => {
  return useQuery({
    queryKey: ["company-dashboard"],
    queryFn: async () => {
      await delay(600);
      return {
        stats: {
          activeInternships: 8,
          openPositions: 5,
          totalApplications: 47,
          pendingApprovals: 12,
        },
        pipeline: [
          {
            id: 1,
            name: "Sarah Johnson",
            position: "Frontend Developer",
            applied: "3 days ago",
            status: "reviewing",
            rating: 4.5,
            skills: ["React", "TypeScript", "Tailwind"],
          },
          {
            id: 2,
            name: "Michael Chen",
            position: "Backend Developer",
            applied: "2 days ago",
            status: "reviewing",
            rating: 4.8,
            skills: ["Node.js", "PostgreSQL", "AWS"],
          },
          {
            id: 3,
            name: "Emma Davis",
            position: "Product Manager",
            applied: "1 day ago",
            status: "shortlisted",
            rating: 4.2,
            skills: ["Strategy", "Analytics", "Leadership"],
          },
        ],
        openPositions: [
          {
            title: "Frontend Developer",
            applications: 24,
            salary: "$20-25/hr",
          },
          { title: "Backend Developer", applications: 18, salary: "$23-28/hr" },
          { title: "Product Manager", applications: 5, salary: "$22-27/hr" },
        ],
      };
    },
  });
};

// Supervisor Dashboard Data
export const useSupervisorDashboard = () => {
  return useQuery({
    queryKey: ["supervisor-dashboard"],
    queryFn: async () => {
      await delay(600);
      return {
        stats: {
          assignedStudents: 24,
          activeInternships: 18,
          approved: 16,
          pendingApproval: 2,
        },
        students: [
          {
            id: 1,
            name: "Alice Wong",
            company: "Google",
            internship: "Software Engineer",
            progress: 65,
            status: "active",
            startDate: "2 months ago",
          },
          {
            id: 2,
            name: "Bob Martinez",
            company: "Apple",
            internship: "Product Manager",
            progress: 45,
            status: "active",
            startDate: "1 month ago",
          },
          {
            id: 4,
            name: "Carol Davis",
            company: "Meta",
            internship: "Data Science",
            progress: 85,
            status: "completing",
            startDate: "3 months ago",
          },
          {
            id: 3,
            name: "Carl Davis",
            company: "Huawei",
            internship: "Data Science",
            progress: 100,
            status: "completing",
            startDate: "6 months ago",
          },
          {
            id: 5,
            name: "Carl Davis",
            company: "Huawei",
            internship: "Data Science",
            progress: 90,
            status: "completing",
            startDate: "6 months ago",
          },
        ],
        departments: [
          { dept: "Computer Science", total: 12, active: 10, completed: 8 },
          { dept: "Business Admin", total: 8, active: 6, completed: 5 },
          { dept: "Engineering", total: 4, active: 2, completed: 3 },
        ],
      };
    },
  });
};

// Internship Browse Data
export const useInternships = () => {
  return useQuery({
    queryKey: ["internships"],
    queryFn: async () => {
      await delay(500);
      return [
        {
          id: 1,
          company: "Google",
          position: "Software Engineer Intern",
          location: "Mountain View, CA",
          salary: "$25/hour",
          duration: "3 months",
          skills: ["JavaScript", "React", "Python"],
        },
        {
          id: 2,
          company: "Apple",
          position: "Product Design Intern",
          location: "Cupertino, CA",
          salary: "$28/hour",
          duration: "4 months",
          skills: ["UI/UX Design", "Figma", "Prototyping"],
        },
        {
          id: 3,
          company: "Meta",
          position: "Data Science Intern",
          location: "Menlo Park, CA",
          salary: "$26/hour",
          duration: "3 months",
          skills: ["Python", "SQL", "Machine Learning"],
        },
      ];
    },
  });
};

// Student Profile Data
export const useStudentProfile = () => {
  return useQuery({
    queryKey: ["student-profile"],
    queryFn: async () => {
      await delay(400);
      return {
        name: "John Smith",
        email: "john@university.edu",
        university: "MIT",
        major: "Computer Science",
        gpa: 3.8,
        skills: ["React", "Node.js", "Python", "TypeScript"],
        bio: "Passionate about building scalable web applications",
      };
    },
  });
};
