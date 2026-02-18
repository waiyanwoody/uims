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
          assignedStudents: 30,
          activeInternships: 17,
          interviewing: 8,
          noInternship: 5,
        },
        students: [
          {
            id: 1,
            name: "Sarah Johnson",
            company: "Tech Corp",
            internship: "Frontend Dev",
            progress: 65,
            status: "active",
            startDate: "2 months ago",
          },
          {
            id: 2,
            name: "Michael Chen",
            company: "CloudTech",
            internship: "Backend Dev",
            progress: 45,
            status: "active",
            startDate: "1 month ago",
          },
          {
            id: 3,
            name: "Emma Davis",
            company: "DataCorp",
            internship: "Data Science",
            progress: 0,
            status: "interviewing",
            startDate: "Pending",
          },
          {
            id: 4,
            name: "James Wilson",
            company: "Tech Corp",
            internship: "Frontend Dev",
            progress: 75,
            status: "active",
            startDate: "2 months ago",
          },
          {
            id: 6,
            name: "David Martinez",
            company: "CloudTech",
            internship: "DevOps",
            progress: 30,
            status: "active",
            startDate: "3 weeks ago",
          },
        ],
        departments: [
          { dept: "Computer Science", total: 15, active: 10, completed: 3 },
          { dept: "Business Admin", total: 10, active: 5, completed: 2 },
          { dept: "Engineering", total: 5, active: 2, completed: 0 },
        ],
        pendingActions: [
          {
            id: 1,
            action: "Review 2 new applications",
            count: 2,
            priority: "high",
            href: "/supervisor/approvals",
          },
          {
            id: 2,
            action: "Review 8 weekly reports",
            count: 8,
            priority: "medium",
            href: "/supervisor/monitoring",
          },
          {
            id: 3,
            action: "5 students without internship",
            count: 5,
            priority: "low",
            href: "/supervisor/students",
          },
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

// Company Approval Hook
export const useCompanyApprovals = () => {
  return useQuery({
    queryKey: ["company-approvals"],
    queryFn: async () => {
      await delay(600);
      return [
        {
          id: 1,
          name: "Stark Industries",
          industry: "Advanced Research",
          location: "New York, USA",
          contact_email: "hr@starkindustries.com",
          status: "PENDING",
          logo: "S",
        },
        {
          id: 2,
          name: "Wayne Enterprises",
          industry: "Technology & Defense",
          location: "Gotham City",
          contact_email: "contact@wayne.com",
          status: "PENDING",
          logo: "W",
        },
        {
          id: 3,
          name: "Oscorp",
          industry: "Biotechnology",
          location: "New York, USA",
          contact_email: "career@oscorp.com",
          status: "PENDING",
          logo: "O",
        },
        {
          id: 4,
          name: "Pied Piper",
          industry: "Data Compression",
          location: "Palo Alto, CA",
          contact_email: "richard@piedpiper.com",
          status: "PENDING",
          logo: "P",
        },
        {
          id: 5,
          name: "LexCorp",
          industry: "Diversified Conglomerate",
          location: "Metropolis",
          contact_email: "admin@lexcorp.com",
          status: "PENDING",
          logo: "L",
        },
        {
          id: 6,
          name: "Hooli",
          industry: "Cloud Computing",
          location: "Mountain View, CA",
          contact_email: "recruitment@hooli.com",
          status: "PENDING",
          logo: "H",
        },
        {
          id: 7,
          name: "Gringotts",
          industry: "Financial Services",
          location: "Diagon Alley",
          contact_email: "vaults@gringotts.com",
          status: "PENDING",
          logo: "G",
        },
        {
          id: 8,
          name: "Cyberdyne Systems",
          industry: "Robotics",
          location: "Sunnyvale, CA",
          contact_email: "skynet@cyberdyne.com",
          status: "PENDING",
          logo: "C",
        },
        {
          id: 9,
          name: "Umbrella Corp",
          industry: "Pharmaceuticals",
          location: "Racoon City",
          contact_email: "research@umbrella.com",
          status: "PENDING",
          logo: "U",
        },
        {
          id: 10,
          name: "Aperture Science",
          industry: "Experimental Physics",
          location: "Cleveland, Ohio",
          contact_email: "glados@aperture.com",
          status: "PENDING",
          logo: "A",
        },
        {
          id: 11,
          name: "Vought International",
          industry: "Entertainment & Security",
          location: "New York City",
          contact_email: "super@vought.com",
          status: "PENDING",
          logo: "V",
        },
        {
          id: 12,
          name: "Nakamura Trading",
          industry: "Trading & Logistics",
          location: "Tokyo, Japan",
          contact_email: "hiro@nakamura.jp",
          status: "PENDING",
          logo: "N",
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
