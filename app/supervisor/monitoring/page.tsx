"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  FileText,
  Calendar,
  Clock,
  Search,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageSquare,
  User,
  Building2,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function InternshipMonitoring() {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 5 : 10;

  // Dialog states
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Mock data for weekly reports with status
  const [reportsData, setReportsData] = useState([
    {
      id: 1,
      student: "Alex Johnson",
      company: "Google",
      position: "Frontend Developer",
      weekNumber: 8,
      startDate: "2024-03-04",
      endDate: "2024-03-08",
      submittedDate: "2024-03-08",
      submissionTime: "16:45",
      status: "pending",
      description:
        "Implemented new navigation component and fixed several UI bugs in the dashboard. Started working on the API integration for the profile page.",
      attachmentName: "weekly_report_alex_w8.pdf",
    },
    {
      id: 2,
      student: "Sarah Chen",
      company: "Meta",
      position: "Backend Developer",
      weekNumber: 7,
      startDate: "2024-02-26",
      endDate: "2024-03-01",
      submittedDate: "2024-03-01",
      submissionTime: "17:30",
      status: "pending",
      description:
        "Assisted in setting up CI/CD pipelines for the staging environment. Monitored server logs and optimized AWS resource allocation.",
      attachmentName: "Sarah_Report_W7.docx",
    },
    {
      id: 4,
      student: "Michael Rodriguez",
      company: "Amazon",
      position: "UI/UX Designer",
      weekNumber: 8,
      startDate: "2024-03-04",
      endDate: "2024-03-08",
      submittedDate: "2024-03-09",
      submissionTime: "09:15",
      status: "pending",
      description:
        "Refactored the authentication service to use JWT. Optimized query performance for the analytics dashboard.",
      attachmentName: "Michael_Weekly_8.pdf",
    },
    {
      id: 5,
      student: "Emily Wilson",
      company: "Microsoft",
      position: "Software Engineer",
      weekNumber: 6,
      startDate: "2024-02-19",
      endDate: "2024-02-23",
      submittedDate: "2024-02-23",
      submissionTime: "17:10",
      status: "reviewed",
      description:
        "Configured Docker containers for the new microservice. Updated Kubernetes manifest files.",
      attachmentName: "Emily_W6.zip",
    },
    {
      id: 7,
      student: "David Kim",
      company: "Apple",
      position: "Mobile Developer",
      weekNumber: 8,
      startDate: "2024-03-04",
      endDate: "2024-03-08",
      submittedDate: "2024-03-08",
      submissionTime: "15:30",
      status: "pending",
      description:
        "Prepared social media content for the upcoming product launch. Analyzed campaign performance metrics.",
      attachmentName: "David_Mobile_W8.pdf",
    },
    {
      id: 9,
      student: "Jessica Lee",
      company: "Netflix",
      position: "Data Scientist",
      weekNumber: 7,
      startDate: "2024-02-26",
      endDate: "2024-03-01",
      submittedDate: "2024-03-02",
      submissionTime: "10:00",
      status: "reviewed",
      description:
        "Attended rehearsals for the new play. Assisted the stage manager with equipment setup.",
      attachmentName: "Jessica_W7.png",
    },
    {
      id: 10,
      student: "Thor Odinson",
      company: "Tesla",
      position: "QA Engineer",
      weekNumber: 7,
      startDate: "2024-02-26",
      endDate: "2024-03-01",
      submittedDate: "2024-03-01",
      submissionTime: "16:45",
      status: "pending",
      description:
        "Compiled quarterly transposition data. Performed data entry and verification tasks.",
      attachmentName: "Thor_W7_Data.xlsx",
    },
    {
      id: 11,
      student: "Wanda Maximoff",
      company: "Adobe",
      position: "Security Intern",
      weekNumber: 8,
      startDate: "2024-03-04",
      endDate: "2024-03-08",
      submittedDate: "2024-03-08",
      submissionTime: "22:00",
      status: "pending",
      description:
        "Managed the appetizer station during dinner service. Assisted in creating the new seasonal menu.",
      attachmentName: "Wanda_Sec_W8.pdf",
    },
    {
      id: 13,
      student: "Nick Fury",
      company: "Twitter",
      position: "Systems Architect",
      weekNumber: 8,
      startDate: "2024-03-04",
      endDate: "2024-03-08",
      submittedDate: "2024-03-09",
      submissionTime: "11:00",
      status: "pending",
      description:
        "Developed the user registration workflow. Implemented unit tests for the backend controllers.",
      attachmentName: "Nick_Summary_W8.pdf",
    },
    {
      id: 14,
      student: "Vision",
      company: "Intel",
      position: "AI Specialist",
      weekNumber: 8,
      startDate: "2024-03-04",
      endDate: "2024-03-08",
      submittedDate: "2024-03-09",
      submissionTime: "12:30",
      status: "pending",
      description:
        "Troubleshot network connectivity issues in the main office. Assisted in hardware upgrades for the server room.",
      attachmentName: "Vision_AI_W8.pdf",
    },
    {
      id: 15,
      student: "Jane Roe",
      company: "DataCorp",
      position: "Business Analyst",
      weekNumber: 8,
      startDate: "2024-03-04",
      endDate: "2024-03-08",
      submittedDate: "2024-03-09",
      submissionTime: "14:15",
      status: "pending",
      description:
        "Gathered requirements for the new reporting tool. Documented business processes for the operations department.",
      attachmentName: "JaneRoe_W8.pdf",
    },
    {
      id: 16,
      student: "Bob Builder",
      company: "InnoSoft",
      position: "QA Tester",
      weekNumber: 8,
      startDate: "2024-03-04",
      endDate: "2024-03-08",
      submittedDate: "2024-03-09",
      submissionTime: "16:00",
      status: "pending",
      description:
        "Executing automated test scripts for the web application. Identifying and reporting bugs in Jira.",
      attachmentName: "BobB_W8.pdf",
    },
  ]);

  const filteredReports = reportsData
    .filter((report) => report.status === "pending")
    .filter(
      (report) =>
        report.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.company.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const currentReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleReviewClick = (report: any) => {
    setSelectedReport(report);
    setIsDetailDialogOpen(true);
  };

  const handleFinishReviewed = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmReview = () => {
    if (selectedReport) {
      setReportsData((prev) =>
        prev.map((r) =>
          r.id === selectedReport.id
            ? { ...r, status: "reviewed", feedback }
            : r,
        ),
      );
    }
    setIsConfirmDialogOpen(false);
    setIsDetailDialogOpen(false);
    setSelectedReport(null);
    setFeedback("");
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Weekly Reports
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Pending review:{" "}
            <span className="text-foreground font-bold">
              {filteredReports.length}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search by student or company..."
              className="pl-9 h-9 w-[200px] md:w-[280px] bg-card border-border focus-visible:ring-primary/20 transition-all text-xs"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>
      </div>

      {/* Reports Grid - More Compact */}
      <div className="grid grid-cols-1 gap-2">
        {currentReports.length > 0 ? (
          currentReports.map((report, idx) => (
            <Card
              key={report.id}
              className="group relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-200 animate-slideInUp bg-card"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Week Number - Smaller and simpler */}
                    <div
                      className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center border transition-colors duration-300 ${
                        report.status === "pending"
                          ? "bg-primary/5 border-primary/10 group-hover:bg-primary group-hover:text-white"
                          : "bg-secondary/30 border-border group-hover:bg-secondary"
                      }`}
                    >
                      <span className="text-[8px] uppercase font-bold opacity-60">
                        Wk
                      </span>
                      <span className="text-sm font-bold leading-tight">
                        {report.weekNumber}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-foreground">
                        {report.student}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-accent" />
                          {report.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary" />
                          {report.startDate} - {report.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">
                        Submitted
                      </p>
                      <p className="text-[11px] font-semibold text-foreground">
                        {report.submittedDate} at {report.submissionTime}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      className="h-8 font-bold gap-2 text-xs"
                      onClick={() => handleReviewClick(report)}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Review
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                No reports found
              </h3>
              <p className="text-xs text-muted-foreground">
                Try adjusting your search or filter.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1 flex-wrap justify-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className={`h-8 w-8 p-0 text-xs ${currentPage === i + 1 ? "bg-primary text-white" : "hover:bg-primary/5"}`}
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Report Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="w-[92%] max-w-xl bg-card border-border px-6 md:px-8 rounded-2xl animate-in fade-in zoom-in duration-200">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Weekly Report Review - Week {selectedReport?.weekNumber}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-[10px] font-medium tracking-tight">
              Submitted on {selectedReport?.submittedDate} at{" "}
              {selectedReport?.submissionTime}
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-border/50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs font-semibold text-foreground truncate">
                      {selectedReport.student}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm">
                    <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[11px] font-medium text-foreground truncate">
                      {selectedReport.company}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[11px] font-medium text-foreground truncate">
                      {selectedReport.position}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[11px] font-medium text-foreground">
                      {selectedReport.startDate} — {selectedReport.endDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" />
                  Weekly Summary
                </p>
                <div className="p-3 rounded-xl bg-secondary/20 border border-border/50">
                  <p className="text-xs leading-relaxed text-foreground/90 italic">
                    "{selectedReport.description}"
                  </p>
                </div>
              </div>

              <div
                className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-secondary/10 hover:bg-secondary/20 hover:border-primary/30 transition-all cursor-pointer group/file"
                onClick={() =>
                  window.open(
                    `/files/${selectedReport.attachmentName}`,
                    "_blank",
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center group-hover/file:scale-110 transition-transform">
                    <FileText className="w-4.5 h-4.5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground truncate max-w-[180px]">
                      {selectedReport.attachmentName}
                    </p>
                    <p className="text-[9px] text-muted-foreground font-medium flex items-center gap-1.5">
                      PDF • 2.4 MB
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                      <span className="text-primary/70 font-bold">
                        Click to view
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Browser default for PDF download if href has download attribute
                      const link = document.createElement("a");
                      link.href = `/files/${selectedReport.attachmentName}`;
                      link.download = selectedReport.attachmentName;
                      link.click();
                    }}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Badge
                  variant="outline"
                  className="bg-primary/5 text-primary border-primary/20 font-bold uppercase tracking-widest text-[9px] px-1.5 py-0"
                >
                  {selectedReport.status}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={() => setIsDetailDialogOpen(false)}
              className="h-8 font-bold text-[10px] uppercase tracking-wider gap-2 flex-1 sm:flex-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Close
            </Button>
            <Button
              onClick={handleFinishReviewed}
              className="h-8 font-bold text-[10px] uppercase tracking-wider gap-2 shadow-lg shadow-primary/20 flex-1 sm:flex-none"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Finish Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation & Feedback Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="w-[90%] max-w-md bg-card border-border px-6 md:px-8 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Final Confirmation
            </DialogTitle>
            <DialogDescription className="text-sm">
              Please provide feedback for{" "}
              <span className="text-foreground font-bold">
                {selectedReport?.student}
              </span>{" "}
              before completing the review.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label
                htmlFor="feedback"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
              >
                Supervisor Feedback
              </Label>
              <Textarea
                id="feedback"
                placeholder="Write your feedback or comments here..."
                className="min-h-[120px] bg-secondary/10 border-border focus-visible:ring-primary/20 text-sm"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setIsConfirmDialogOpen(false)}
              className="font-bold text-xs uppercase tracking-tight"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmReview}
              className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-tight"
            >
              Confirm Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
