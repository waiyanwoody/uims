"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  MapPin,
  Wrench,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Target,
  Download,
  Building2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Student {
  name: string;
  studentNumber: string;
  email: string;
  major: string;
  assignedInternship: string;
  address: string;
  skills: string[];
}

export default function StudentProfile() {
  const params = useParams();
  const id = Number(params.id);

  // Mock database of students to match the list in /students/page.tsx
  const studentsDB: Record<number, Student> = {
    1: {
      name: "Sarah Johnson",
      studentNumber: "2021CS001",
      email: "sarah@uni.edu",
      major: "CS",
      assignedInternship: "Frontend Dev - Tech Corp",
      address: "123 University Ave, Tech City",
      skills: ["React", "TypeScript", "Tailwind CSS", "UI/UX Design"],
    },
    2: {
      name: "Michael Chen",
      studentNumber: "2021CS042",
      email: "michael@uni.edu",
      major: "CS",
      assignedInternship: "Backend Dev - CloudTech",
      address: "456 Silicon Valley, Innovation Way",
      skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
    },
    3: {
      name: "Emma Davis",
      studentNumber: "2021DS012",
      email: "emma@uni.edu",
      major: "Data Science",
      assignedInternship: "Data Science - DataCorp",
      address: "789 Analytics Blvd, Data Center",
      skills: ["Python", "R", "SQL", "Machine Learning"],
    },
    4: {
      name: "James Wilson",
      studentNumber: "2021CS088",
      email: "james@uni.edu",
      major: "CS",
      assignedInternship: "Frontend Dev - Tech Corp",
      address: "101 Web Street, Browser Town",
      skills: ["Vue.js", "Javascript", "SCSS", "Jest"],
    },
    5: {
      name: "Lisa Anderson",
      studentNumber: "2021CS055",
      email: "lisa@uni.edu",
      major: "CS",
      assignedInternship: "Pending assignment",
      address: "202 Waiting Cir, Student Plaza",
      skills: ["Java", "C++", "Algorithms"],
    },
    6: {
      name: "David Martinez",
      studentNumber: "2021IT023",
      email: "david@uni.edu",
      major: "IT",
      assignedInternship: "DevOps - CloudTech",
      address: "303 Server Farm, Network City",
      skills: ["Linux", "Kubernetes", "Shell Scripting", "Azure"],
    },
  };

  const studentInfo: Student = studentsDB[id] || studentsDB[1]; // Fallback to Sarah if ID not found

  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [weeklyReports, setWeeklyReports] = useState([
    {
      weekNumber: 8,
      startDate: "2024-03-04",
      endDate: "2024-03-08",
      status: "pending",
      description:
        "Working on implementing the new dashboard design and integrating the student profile APIs.",
      attachmentName: "report_w8_sarah.pdf",
      feedback: null,
    },
    {
      weekNumber: 7,
      startDate: "2024-02-26",
      endDate: "2024-03-01",
      status: "reviewed",
      description:
        "Completed the authentication module and started the initial setup for the supervisor module.",
      attachmentName: "report_w7_sarah.pdf",
      feedback:
        "Great progress on the authentication module. Keep up the good work on the supervisor implementation!",
    },
    {
      weekNumber: 6,
      startDate: "2024-02-19",
      endDate: "2024-02-23",
      status: "reviewed",
      description:
        "Fixed various bugs reported in the beta testing phase. Optimized the database queries for better performance.",
      attachmentName: "report_w6_sarah.pdf",
      feedback:
        "Significant improvement in page load times after your optimizations. Well done.",
    },
    {
      weekNumber: 5,
      startDate: "2024-02-12",
      endDate: "2024-02-16",
      status: "reviewed",
      description:
        "Drafted the documentation for the API and finalized the UI wireframes for the mobile application.",
      attachmentName: "report_w5_sarah.pdf",
      feedback:
        "Documentation is clear. The UI wireframes meet all the requirements.",
    },
    {
      weekNumber: 4,
      startDate: "2024-02-05",
      endDate: "2024-02-09",
      status: "reviewed",
      description:
        "Conducted user research and gathered requirements for the upcoming features. Prepared the initial project roadmap.",
      attachmentName: "report_w4_sarah.pdf",
      feedback:
        "Project roadmap looks realistic. Research data is very helpful.",
    },
    {
      weekNumber: 3,
      startDate: "2024-01-29",
      endDate: "2024-02-02",
      status: "reviewed",
      description:
        "Explored different tech stacks and set up the development environment. Created the initial project repository.",
      attachmentName: "report_w3_sarah.pdf",
      feedback: "Good choice on the tech stack. Environment setup is solid.",
    },
    {
      weekNumber: 2,
      startDate: "2024-01-22",
      endDate: "2024-01-26",
      status: "reviewed",
      description:
        "Onboarding and initial orientation at the company. Met with the team and discussed project goals.",
      attachmentName: "report_w2_sarah.pdf",
      feedback: "Welcome to the team! Glad to see you've integrated well.",
    },
    {
      weekNumber: 1,
      startDate: "2024-01-15",
      endDate: "2024-01-19",
      status: "reviewed",
      description:
        "Company introduction and setting up the basic tools for communication and project management.",
      attachmentName: "report_w1_sarah.pdf",
      feedback: "Tools are all set. Ready for the next week's tasks.",
    },
  ]);

  const totalPages = Math.ceil(weeklyReports.length / reportsPerPage);
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = weeklyReports.slice(
    indexOfFirstReport,
    indexOfLastReport,
  );

  const handleReportClick = (report: any) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleFinishReviewed = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmReview = () => {
    if (selectedReport) {
      setWeeklyReports((prev) =>
        prev.map((r) =>
          r.weekNumber === selectedReport.weekNumber
            ? { ...r, status: "reviewed", feedback }
            : r,
        ),
      );
    }
    setIsConfirmDialogOpen(false);
    setIsDialogOpen(false);
    setSelectedReport(null);
    setFeedback("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "reviewed":
        return (
          <Badge className="bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/20 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Reviewed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/20 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
        {/* Header/Navigation */}
        <div className="flex items-center justify-between animate-fadeIn">
          <Link href="/supervisor/students">
            <Button
              variant="ghost"
              className="hover:bg-primary/5 -ml-2 text-sm"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Students
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Section - Student Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-5 sm:p-6 border-border animate-slideInLeft overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-border">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                    {studentInfo.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                      {studentInfo.name}
                    </h1>
                    <p className="text-primary font-medium text-xs sm:text-sm">
                      {studentInfo.studentNumber}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Email Address
                      </p>
                      <p className="text-foreground text-sm truncate">
                        {studentInfo.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Major
                      </p>
                      <p className="text-foreground text-sm">
                        {studentInfo.major}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Assigned Internship
                      </p>
                      <p className="text-foreground text-sm">
                        {studentInfo.assignedInternship}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Address
                      </p>
                      <p className="text-foreground text-sm">
                        {studentInfo.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">
                      Skills & Expertise
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {studentInfo.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-secondary/50 hover:bg-primary/10 transition-colors text-[9px] py-0"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-bold text-foreground">
                        Progression Point
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-primary">65%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-muted-foreground font-medium uppercase tracking-tighter">
                      <span>Week 01</span>
                      <span>Week 12</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Section - Weekly Reports Highlights */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5 sm:p-6 border-border animate-slideInRight">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Weekly Reports Highlights
                  </h2>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    Review student progress through weekly submissions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentReports.map((report, idx) => (
                  <div
                    key={report.weekNumber}
                    onClick={() => handleReportClick(report)}
                    className="group flex items-center justify-between p-3 sm:p-4 rounded-xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-md transition-all cursor-pointer animate-slideInUp"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-background flex flex-col items-center justify-center border border-border group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                        <span className="text-[8px] sm:text-[10px] uppercase font-bold opacity-60">
                          Week
                        </span>
                        <span className="text-base sm:text-lg font-bold leading-tight">
                          0{report.weekNumber}
                        </span>
                      </div>

                      <div className="space-y-0.5 sm:space-y-1">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {report.startDate} — {report.endDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                          <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>Report submitted</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="hidden xs:block">
                        {getStatusBadge(report.status)}
                      </div>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="h-8 px-3 text-xs hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                    Prev
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className={`h-8 w-8 text-xs ${
                          currentPage === i + 1
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "hover:bg-primary/5 hover:text-primary"
                        }`}
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
                    className="h-8 px-3 text-xs hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Report Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[92%] max-w-xl bg-card border-border px-6 md:px-8 rounded-2xl animate-in fade-in zoom-in duration-200">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              {selectedReport?.status === "pending"
                ? "Weekly Report Review"
                : `Week ${selectedReport?.weekNumber} Report`}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-[10px] font-medium tracking-tight">
              Period: {selectedReport?.startDate} — {selectedReport?.endDate}
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-border/50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs font-semibold text-foreground truncate">
                      {studentInfo.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm">
                    <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[11px] font-medium text-foreground truncate">
                      {studentInfo.assignedInternship.includes(" - ")
                        ? studentInfo.assignedInternship.split(" - ")[1]
                        : studentInfo.assignedInternship}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[11px] font-medium text-foreground truncate">
                      {studentInfo.assignedInternship.includes(" - ")
                        ? studentInfo.assignedInternship.split(" - ")[0]
                        : "Intern"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[11px] font-medium text-foreground">
                      Week 0{selectedReport.weekNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" />
                  Summary
                </p>
                <div className="p-3 rounded-xl bg-secondary/20 border border-border/50">
                  <p className="text-xs leading-relaxed text-foreground/90 italic">
                    "{selectedReport.description}"
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl border border-border bg-secondary/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground truncate max-w-[150px]">
                      {selectedReport.attachmentName}
                    </p>
                    <p className="text-[9px] text-muted-foreground font-medium">
                      PDF • 2.4 MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 border-border hover:bg-primary hover:text-white transition-colors"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>

              {selectedReport.status === "reviewed" &&
                selectedReport.feedback && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      Feedback
                    </p>
                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <p className="text-[11px] leading-relaxed text-foreground/90 font-medium">
                        {selectedReport.feedback}
                      </p>
                    </div>
                  </div>
                )}

              <div className="flex items-center justify-between pt-2">
                <Badge
                  variant="outline"
                  className={`${
                    selectedReport.status === "reviewed"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  } font-bold uppercase tracking-widest text-[9px] px-1.5 py-0`}
                >
                  {selectedReport.status}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
              className="h-8 font-bold text-[10px] uppercase tracking-wider gap-2 flex-1 sm:flex-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Close
            </Button>
            {selectedReport?.status === "pending" && (
              <Button
                onClick={handleFinishReviewed}
                className="h-8 font-bold text-[10px] uppercase tracking-wider gap-2 shadow-lg shadow-primary/20 flex-1 sm:flex-none"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Finish Review
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation & Feedback Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="w-[90%] max-w-md bg-card border-border px-6 md:px-8 rounded-2xl animate-in fade-in zoom-in duration-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Final Confirmation
            </DialogTitle>
            <DialogDescription className="text-sm">
              Please provide feedback for{" "}
              <span className="text-foreground font-bold">
                {studentInfo.name}
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
