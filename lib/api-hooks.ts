import { useQuery } from "@tanstack/react-query";
import api from "./api";

// Mock delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Student Dashboard Data
export const useStudentDashboard = () => {
  return useQuery({
    queryKey: ["student-dashboard"],
    queryFn: async () => {
      const { data } = await api.get("/student/dashboard");
      return data;
    },
  });
};

// Company/HR Dashboard Data
export const useCompanyDashboard = () => {
  return useQuery({
    queryKey: ["company-dashboard"],
    queryFn: async () => {
      const { data } = await api.get("/company/dashboard");
      return data;
    },
  });
};

// Supervisor Dashboard Data
export const useSupervisorDashboard = () => {
  return useQuery({
    queryKey: ["supervisor-dashboard"],
    queryFn: async () => {
      const { data } = await api.get("/supervisor/dashboard");
      return data;
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
          status: "ACTIVE",
          logo: "S",
          hr_name: "Virginia 'Pepper' Potts",
          phone: "+1 (212) 555-0199",
          registered_at: "2024-03-24",
          internships: [
            {
              id: 101,
              title: "Hardware Engineer",
              type: "Full-time",
              location: "NYC",
              stipend: "$4500/mo",
              category: "Engineering",
              description:
                "Design and develop advanced hardware systems for various applications. You will be working with cutting-edge technology and a world-class team of engineers.",
              requirements: [
                "B.S. in Electrical Engineering or related field",
                "Proficiency in CAD software",
                "Strong analytical skills",
              ],
              status: "OPEN",
              slots: 3,
              deadline: "2024-12-01",
            },
            {
              id: 102,
              title: "AI Researcher",
              type: "Part-time",
              location: "Remote",
              stipend: "$3800/mo",
              category: "Artificial Intelligence",
              description:
                "Conduct research in the field of AI and machine learning. Develop algorithms and models that push the boundaries of current technology.",
              requirements: [
                "M.S. or PhD in Computer Science or related field",
                "Strong foundation in mathematics and statistics",
                "Experience with AI frameworks like TensorFlow or PyTorch",
              ],
              status: "OPEN",
              slots: 2,
              deadline: "2024-11-15",
            },
          ],
        },
        {
          id: 2,
          name: "Wayne Enterprises",
          industry: "Technology & Defense",
          location: "Gotham City",
          contact_email: "contact@wayne.com",
          status: "ACTIVE",
          logo: "W",
          hr_name: "Lucius Fox",
          phone: "+1 (312) 555-0142",
          registered_at: "2024-03-23",
          internships: [
            {
              id: 201,
              title: "Applied Sciences Intern",
              type: "Full-time",
              location: "Gotham",
              stipend: "$4200/mo",
              category: "Science",
              description:
                "Join our Applied Sciences division to help solve real-world problems through scientific experimentation and research in various fields.",
              requirements: [
                "B.S. in Physics or related science field",
                "Strong analytical skills",
                "Experience with laboratory equipment",
              ],
              status: "OPEN",
              slots: 1,
              deadline: "2024-11-30",
            },
          ],
        },
        {
          id: 3,
          name: "Oscorp",
          industry: "Biotechnology",
          location: "New York, USA",
          contact_email: "career@oscorp.com",
          status: "PENDING",
          logo: "O",
          hr_name: "Norman Osborn",
          phone: "+1 (212) 555-0100",
          registered_at: "2024-03-22",
          internships: [
            {
              id: 301,
              title: "Bio-Genetics Intern",
              type: "Full-time",
              location: "New York",
              stipend: "$4000/mo",
              category: "Biotechnology",
              description:
                "Contribute to our bio-genetics research projects. You will be helping to develop new treatments and technologies that improve human health.",
              requirements: [
                "B.S. in Biology or related field",
                "Experience with molecular biology techniques",
                "Strong attention to detail",
              ],
              status: "OPEN",
              slots: 2,
              deadline: "2024-12-10",
            },
          ],
        },
        {
          id: 4,
          name: "Pied Piper",
          industry: "Data Compression",
          location: "Palo Alto, CA",
          contact_email: "richard@piedpiper.com",
          status: "PENDING",
          logo: "P",
          hr_name: "Richard Hendricks",
          phone: "+1 (650) 555-0155",
          registered_at: "2024-03-21",
          internships: [
            {
              id: 401,
              title: "Algorithm Intern",
              type: "Full-time",
              location: "Palo Alto",
              stipend: "$3500/mo",
              category: "Software Engineering",
              description:
                "Develop and optimize data compression algorithms using our patented middle-out technology. You will be working with a highly skilled and eccentric team.",
              requirements: [
                "B.S. in Computer Science or related field",
                "Strong background in mathematics and algorithms",
                "Proficiency in C++ or Java",
              ],
              status: "OPEN",
              slots: 2,
              deadline: "2024-11-20",
            },
          ],
        },
        {
          id: 5,
          name: "LexCorp",
          industry: "Diversified Conglomerate",
          location: "Metropolis",
          contact_email: "admin@lexcorp.com",
          status: "PENDING",
          logo: "L",
          hr_name: "Lex Luthor",
          phone: "+1 (312) 555-0111",
          registered_at: "2024-03-20",
          internships: [
            {
              id: 501,
              title: "Strategy Intern",
              type: "Full-time",
              location: "Metropolis",
              stipend: "$3900/mo",
              category: "Business Strategy",
              description:
                "Assist our strategy team in analyzing market trends and developing business strategies. You will be helping LexCorp maintain its competitive edge in various industries.",
              requirements: [
                "B.S. in Business Administration or related field",
                "Strong analytical and problem-solving skills",
                "Excellent communication and presentation skills",
              ],
              status: "OPEN",
              slots: 3,
              deadline: "2024-12-05",
            },
          ],
        },
        {
          id: 6,
          name: "Hooli",
          industry: "Cloud Computing",
          location: "Mountain View, CA",
          contact_email: "recruitment@hooli.com",
          status: "PENDING",
          logo: "H",
          hr_name: "Gavin Belson",
          phone: "+1 (650) 555-0122",
          registered_at: "2024-03-19",
          internships: [
            {
              id: 601,
              title: "Cloud Architect Intern",
              type: "Full-time",
              location: "Mountain View",
              stipend: "$3600/mo",
              category: "Cloud Computing",
              description:
                "Assist in the design and implementation of our cloud infrastructure and services. You will be working with a team of cloud experts on our Hooli Cloud initiative.",
              requirements: [
                "B.S. in Computer Science or related field",
                "Experience with cloud technologies like AWS or Google Cloud",
                "Knowledge of network architecture",
              ],
              status: "OPEN",
              slots: 2,
              deadline: "2024-11-25",
            },
          ],
        },
        {
          id: 7,
          name: "Gringotts",
          industry: "Financial Services",
          location: "Diagon Alley",
          contact_email: "vaults@gringotts.com",
          status: "PENDING",
          logo: "G",
          hr_name: "Griphook",
          phone: "+44 (020) 555-0133",
          registered_at: "2024-03-18",
          internships: [
            {
              id: 701,
              title: "Vault Auditor",
              type: "Part-time",
              location: "Diagon Alley",
              stipend: "$3000/mo",
              category: "Finance",
              description:
                "Audit our secure vaults and assist in managing financial transactions. You will be working with our team of elite goblin bankers to ensure the security and integrity of our vaults.",
              requirements: [
                "B.S. in Accounting or Finance field",
                "Strong attention to detail and accuracy",
                "Ethical and trustworthy character",
              ],
              status: "OPEN",
              slots: 2,
              deadline: "2024-12-15",
            },
          ],
        },
        {
          id: 8,
          name: "Cyberdyne Systems",
          industry: "Robotics",
          location: "Sunnyvale, CA",
          contact_email: "skynet@cyberdyne.com",
          status: "PENDING",
          logo: "C",
          hr_name: "Miles Dyson",
          phone: "+1 (408) 555-0144",
          registered_at: "2024-03-17",
          internships: [
            {
              id: 801,
              title: "Robotics Engineer",
              type: "Full-time",
              location: "Sunnyvale",
              stipend: "$4100/mo",
              category: "Robotics",
              description:
                "Design and build robotic systems and components. You will be working on our next-generation robotics platforms and technologies.",
              requirements: [
                "B.S. in Mechanical Engineering or Robotics related field",
                "Experience with robotics programming and software",
                "Strong analytical and problem-solving skills",
              ],
              status: "OPEN",
              slots: 2,
              deadline: "2024-11-28",
            },
          ],
        },
        {
          id: 9,
          name: "Umbrella Corp",
          industry: "Pharmaceuticals",
          location: "Racoon City",
          contact_email: "research@umbrella.com",
          status: "PENDING",
          logo: "U",
          hr_name: "Albert Wesker",
          phone: "+1 (212) 555-0188",
          registered_at: "2024-03-16",
          internships: [
            {
              id: 901,
              title: "Viral Researcher",
              type: "Full-time",
              location: "Racoon City",
              stipend: "$4800/mo",
              category: "Biotechnology",
              description:
                "Research viral pathogens and develop new treatments. You will be working with a team of top scientists in our secure research facilities.",
              requirements: [
                "B.S. in Biology, Biochemistry or related field",
                "Experience with molecular biology techniques",
                "Ability to work in a high-security environment",
              ],
              status: "OPEN",
              slots: 2,
              deadline: "2024-12-05",
            },
          ],
        },
        {
          id: 10,
          name: "Aperture Science",
          industry: "Experimental Physics",
          location: "Cleveland, Ohio",
          contact_email: "glados@aperture.com",
          status: "PENDING",
          logo: "A",
          hr_name: "Cave Johnson",
          phone: "+1 (216) 555-0101",
          registered_at: "2024-03-15",
          internships: [
            {
              id: 1001,
              title: "Test Subject",
              type: "Part-time",
              location: "Cleveland",
              stipend: "$2500/mo",
              category: "Experimental Physics",
              description:
                "Participate in various experimental tests and research projects. We offer competitive stipend and as much cake as you want (cake is not guaranteed).",
              requirements: [
                "Willingness to participate in advanced research",
                "Ability to follow complex instructions",
                "Good overall health and fitness",
              ],
              status: "OPEN",
              slots: 10,
              deadline: "2024-12-31",
            },
          ],
        },
        {
          id: 11,
          name: "Vought International",
          industry: "Entertainment & Security",
          location: "New York City",
          contact_email: "super@vought.com",
          status: "PENDING",
          logo: "V",
          hr_name: "Ashley Barrett",
          phone: "+1 (212) 555-0707",
          registered_at: "2024-03-14",
          internships: [
            {
              id: 1101,
              title: "Publicity Intern",
              type: "Full-time",
              location: "NYC",
              stipend: "$3200/mo",
              category: "Public Relations",
              description:
                "Assist our publicity team in managing media relations and marketing campaigns. You will be helping to shape the public image of Vought International and our team of supes.",
              requirements: [
                "B.S. in Communications, PR or related field",
                "Strong writing and communication skills",
                "Experience with social media marketing",
              ],
              status: "OPEN",
              slots: 4,
              deadline: "2024-12-01",
            },
          ],
        },
        {
          id: 12,
          name: "Nakamura Trading",
          industry: "Trading & Logistics",
          location: "Tokyo, Japan",
          contact_email: "hiro@nakamura.jp",
          status: "PENDING",
          logo: "N",
          hr_name: "Hiro Nakamura",
          phone: "+81 3-555-0123",
          registered_at: "2024-03-13",
          internships: [
            {
              id: 1201,
              title: "Logistics Assistant",
              type: "Full-time",
              location: "Tokyo",
              stipend: "$2800",
              category: "Logistics",
              description:
                "Assist in managing trading and logistics operations in Tokyo. You will be helping with data entry, office tasks, and tracking shipping movements correctly.",
              requirements: [
                "B.S. in Business or related logistics field",
                "Strong attention to detail and accuracy",
                "Fluency in English and Japanese",
              ],
              status: "OPEN",
              slots: 2,
              deadline: "2024-11-20",
            },
          ],
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
