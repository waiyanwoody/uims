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
  const [marks, setMarks] = useState(0);

  // Mock data for monthly reports with status: Pending (waiting HR), Verify (ready for supervisor), Review (done)
  const [reportsData, setReportsData] = useState([
    {
      id: 1,
      student: "Alex Johnson",
      company: "Google",
      position: "Frontend Developer",
      month: "February",
      submittedDate: "2024-03-01",
      submissionTime: "16:45",
      status: "Verify",
      description:
        "Completed the frontend integration of the new dashboard widgets. Focused on performance optimization and accessibility.",
      attachmentName: "monthly_report_alex_feb.pdf",
    },
    {
      id: 2,
      student: "Sarah Chen",
      company: "Meta",
      position: "Backend Developer",
      month: "February",
      submittedDate: "2024-03-01",
      submissionTime: "17:30",
      status: "Verify",
      description:
        "Managed database migrations for the user profile service. Implemented rate limiting for API endpoints.",
      attachmentName: "Sarah_Report_Feb.docx",
    },
    {
      id: 3,
      student: "Michael Rodriguez",
      company: "Amazon",
      position: "UI/UX Designer",
      month: "February",
      submittedDate: "2024-03-02",
      submissionTime: "09:15",
      status: "Verify",
      description:
        "Redesigned the checkout workflow. Conducted user testing sessions and incorporated feedback into high-fidelity prototypes.",
      attachmentName: "Michael_Monthly_Feb.pdf",
    },
    {
      id: 4,
      student: "Emily Wilson",
      company: "Microsoft",
      position: "Software Engineer",
      month: "January",
      submittedDate: "2024-02-01",
      submissionTime: "17:10",
      status: "Review",
      description:
        "Set up the initial development environment and started exploring the microservices architecture.",
      attachmentName: "Emily_Jan.zip",
      marks: 85,
      feedback: "Good initial progress, keep it up!",
    },
    {
      id: 5,
      student: "Thor Odinson",
      company: "Tesla",
      position: "QA Engineer",
      month: "February",
      submittedDate: "2024-03-01",
      submissionTime: "16:45",
      status: "Pending",
      description:
        "Working on automotive testing procedures. Reports ready for HR verification.",
      attachmentName: "Thor_Feb_Data.xlsx",
    },
  ]);

  const filteredReports = reportsData
    .filter((report) => report.status === "Verify")
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
            ? { ...r, status: "Review", feedback, marks }
            : r,
        ),
      );
    }
    setIsConfirmDialogOpen(false);
    setIsDetailDialogOpen(false);
    setSelectedReport(null);
    setFeedback("");
    setMarks(0);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Monthly Reports
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Waiting for supervisor review:{" "}
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
                    {/* Report Icon - Simpler */}
                    <div
                      className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center border transition-colors duration-300 ${
                        report.status === "Verify"
                          ? "bg-primary/5 border-primary/10 group-hover:bg-primary group-hover:text-white"
                          : "bg-secondary/30 border-border group-hover:bg-secondary"
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-foreground">
                        {report.student}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-muted-foreground">
                        <span className="flex items-center gap-1 font-bold text-primary">
                          MONTHLY REPORT
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-accent" />
                          {report.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                          {report.status}
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
              Monthly Report Review - {selectedReport?.month}
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
                      {selectedReport.month} Report
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" />
                  Monthly Summary
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
              Please provide feedback and marks for{" "}
              <span className="text-foreground font-bold">
                {selectedReport?.student}
              </span>{" "}
              before completing the review.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label
                htmlFor="marks"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
              >
                Marks (0-50)
              </Label>
              <Input
                id="marks"
                type="text"
                placeholder="0-50"
                className="bg-secondary/10 border-border focus-visible:ring-primary/20 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={marks || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setMarks(0);
                    return;
                  }
                  const num = parseInt(val);
                  if (!isNaN(num)) {
                    // Limit the number to 0-50
                    if (num >= 0 && num <= 50) {
                      setMarks(num);
                    }
                  }
                }}
              />
            </div>

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
