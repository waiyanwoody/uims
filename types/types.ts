// types.ts - Type definitions for the application system
export interface CV {
  id: number;
  student_id: number;
  title: string;
  file_path: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  status: string;
  createdAt: string;
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
  id: number;
  name: string;
  gender: 'MALE' | 'FEMALE';
  student_number: string;
  email: string;
  major: string;
  created_at: Date;
  profile?: StudentProfile;
}

export interface StudentExpertise {
  id: number;
  student_id: number;
  skill_name: string;
}

export interface Application {
  id: number;
  student_id: number;
  internship_id: number;
  cv_id: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  applied_at: Date;
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
  student: Student & {
    profile?: StudentProfile;
    expertise?: StudentExpertise[];
  };
  internship: Internship & {
    company: Company;
  };
  cv: CV;
}

