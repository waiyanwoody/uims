"use client";

import { useState } from "react";

export type ReportStatus = "Pending" | "Verify" | "Review";

export interface DashboardReport {
  id: number;
  student: string;
  company: string;
  position: string;
  month: string;
  submittedDate: string;
  submissionTime: string;
  status: ReportStatus;
  description: string;
  attachmentName: string;
  marks?: number;
  feedback?: string;
}

// Mock data shared across roles
const INITIAL_REPORTS: DashboardReport[] = [
  {
    id: 1,
    student: "John Smith",
    company: "Google",
    position: "Software Engineer Intern",
    month: "February",
    submittedDate: "2024-03-01",
    submissionTime: "16:45",
    status: "Review",
    description: "Successfully integrated the new dashboard widgets and optimized API calls. Implemented better error handling for the auth flow.",
    attachmentName: "monthly_report_john_feb.pdf",
    marks: 45,
    feedback: "Excellent work on the integration. The performance improvements are noticeable. Keep focusing on the documentation of the new modules.",
  },
  {
    id: 2,
    student: "John Smith",
    company: "Google",
    position: "Software Engineer Intern",
    month: "January",
    submittedDate: "2024-02-01",
    submissionTime: "10:30",
    status: "Review",
    description: "Initial setup of the development environment. Started working on the core UI components.",
    attachmentName: "monthly_report_john_jan.pdf",
    marks: 40,
    feedback: "Good start. Make sure to follow the internal styling guidelines for the new components.",
  },
  {
    id: 3,
    student: "John Smith",
    company: "Google",
    position: "Software Engineer Intern",
    month: "March",
    submittedDate: "2024-04-02",
    submissionTime: "09:15",
    status: "Verify",
    description: "Refactored the data layer and implemented a more robust caching strategy using TanStack Query.",
    attachmentName: "monthly_report_john_mar.pdf",
  },
  {
    id: 4,
    student: "John Smith",
    company: "Google",
    position: "Software Engineer Intern",
    month: "April",
    submittedDate: "2024-05-01",
    submissionTime: "17:10",
    status: "Pending",
    description: "Working on the unit tests for the caching layer and preparing for the final project presentation.",
    attachmentName: "monthly_report_john_apr.pdf",
  }
];

export function useMonitoring() {
  const [reports, setReports] = useState<DashboardReport[]>(INITIAL_REPORTS);

  const getStudentReports = (studentName: string) => {
    return reports.filter(r => r.student === studentName);
  };

  const submitReport = (report: Omit<DashboardReport, "id" | "status">) => {
    const newReport: DashboardReport = {
      ...report,
      id: reports.length + 1,
      status: "Pending",
    };
    setReports([newReport, ...reports]);
  };

  return {
    reports,
    getStudentReports,
    submitReport,
    setReports
  };
}
