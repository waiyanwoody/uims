// types.ts - Type definitions for the application system
export interface CV {
  id: number;
  student_id: number;
  title: string;
  file_path: string;
  uploadedDate: Date | string;
  updated_at: Date | string;
}

export interface CvFormRequest {
  studentId?: number;
  student_id?: number;
  title: string;
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  status: string;
  createdAt: string;
  contact_email?: string; // These might be redundant if we have separate HR list, but keeping for compatibility
  email?: string;
  hrEmail?: string;
  description?: string;
  logo?: string;
  website?: string; // Add website if it's common
}

export interface CompanyHr {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

export interface CompanyDetailResponse extends Company {
  hrList: CompanyHr[];
}

export interface Internship {
  id: number;
  company: Company;
  title: string;
  description: string;
  category: string;
  requirements: string;
  status: string;
  slots: number;
  deadline: string;
  createdAt: string;
}

export interface StudentProfile {
  id: number;
  student_id: number;
  profile_image_url?: string;
  address?: string;
  bio?: string;
  github_url?: string;
  linkedin_url?: string;
  date_of_birth?: Date | string;
}

export interface Student {
  student_id: number;
  id: number;
  name: string;
  gender: "MALE" | "FEMALE";
  studentNumber: string;
  email: string;
  major: string;
  created_at: Date;
  profile?: StudentProfile;
}

export interface StudentResponse {
  id: number;
  name: string;
  gender: string;
  studentNumber: string;
  email: string;
  major: string;
  companyName?: string;
  internshipTitle?: string;
  enrollmentStatus?: string;
  createdAt: string;
}

export interface StudentExpertise {
  id: number;
  student_id: number;
  skill_name: string;
}

export interface CreateApplicationRequest {
  studentId: number;
  internshipId: number;
  cvId: number;
}

export interface Application {
  id: number;
  student_id: number;
  internship_id: number;
  cv_id: number;
  status: "PENDING" | "INTERVIEWING" | "APPROVED" | "REJECTED";
  appliedAt: Date;
  student?: Student;
  internship?: Internship;
  cv?: CV;
}

export interface CreateApplicationDTO {
  internship_id: number;
  cv_id: number;
  cover_letter?: string;
}

export interface ApplicationWithDetails extends Application {
  cvForm: any;
  student: Student & {
    profile?: StudentProfile;
    expertise?: StudentExpertise[];
  };
  internship: Internship & {
    company: Company;
  };
  cv: CV;
}

export interface Review {
  id: number;
  reviewer: string;
  role: "Supervisor" | "HR";
  feedback: string;
  rating: number;
  date: string;
}

export interface StudentDashboardStats {
  openInternships: number;
  totalApplications: number;
  pendingApplications: number;
  weeklyReports: number;
}

export interface MonthlyApplication {
  month: string;
  applications: number;
}

export interface StudentDashboardResponse {
  stats: StudentDashboardStats;
  applications: ApplicationWithDetails[];
  reviews: Review[];
  monthlyApplications: MonthlyApplication[];
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface SuccessResponse<T> {
  data: T;
  message: string;
}

export interface InternshipReportResponse {
  id: number;
  weekNumber: number;
  startDate: string;
  endDate: string;
  tasksCompleted: string;
  skillsLearned: string;
  challengesFaced: string;
  supervisorFeedback?: string;
  supervisorRating?: number;
  status: string;
}

export interface InternshipResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  requirements: string;

  status: string;
  slots: number;
  deadline: string;
  createdAt: string;
  applicationCount: number;
}

export interface InternshipMonthlyReport {
  id: number;
  internshipId: number;
  studentId: number;
  studentName: string;
  internshipTitle: string;
  summary: string;
  monthNumber: number;
  reportFilePath: string;
  hrScore: number | null;
  hrFeedback: string | null;
  hrValidated: boolean;
  supervisorScore: number | null;
  supervisorFeedback: string | null;
  supervisorValidated: boolean;
  status: string;
  createdAt: string;
}

export interface StudentFullDetailProfile {
  studentId: number;
  name: string;
  email: string;
  major: string;
  studentNumber: string;
  profileImageUrl: string | null;
  address: string | null;
  bio: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  dateOfBirth: string | null;
  skills: string[] | null;
}

export interface StudentFullDetailResponse {
  id: number;
  name: string;
  gender: string;
  studentNumber: string;
  email: string;
  major: string;
  skills: string[];
  profile: StudentFullDetailProfile;
  reports: InternshipMonthlyReport[];
}
