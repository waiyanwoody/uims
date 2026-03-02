"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useReport } from "@/hooks/StudentHook/useReport";
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
  MessageSquare,
  Building2,
  Plus,
  Send,
  Upload,
  X,
  Loader2,
  User,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useStudentApplications } from "@/hooks/StudentHook/useStudentApplications";
import { ApplicationWithDetails } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function StudentMonitoring() {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const {
    uploadReport,
    fetchReports,
    fetchReportDetails,
    reports,
    pagination,
    loading: isLoadingReports,
    loading: isSubmitting,
  } = useReport();

  const { applications, loading: isLoadingApps } = useStudentApplications(
    user?.id,
    1,
    100,
  );
  const [activeInternship, setActiveInternship] =
    useState<ApplicationWithDetails | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 5 : 10;

  useEffect(() => {
    fetchReports(currentPage - 1, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (applications) {
      const approvedApp = applications.find((app) => app.status === "APPROVED");
      setActiveInternship(approvedApp || null);

      if (approvedApp) {
        setNewReport((prev) => ({
          ...prev,
          company: approvedApp.internship.company.name,
          position: approvedApp.internship.title,
        }));
      } else {
        // Reset if no active internship found (though practically once approved it stays)
        setNewReport((prev) => ({
          ...prev,
          company: "",
          position: "",
        }));
      }
    }
  }, [applications]);

  // Dialog states
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  // New report form state
  const [newReport, setNewReport] = useState({
    student: user?.name || "",
    company: "Google",
    position: "Software Engineer Intern",
    month: "", // This will now represent monthNumber
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredReports = Array.isArray(reports)
    ? reports.filter(
        (report) =>
          monthNames[report?.monthNumber - 1]
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          report?.internshipTitle
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
    : [];

  const totalPages = pagination?.totalPages || 1;

  const handleViewClick = async (report: any) => {
    // Set basic info to open dialog immediately
    setSelectedReport(report);
    setIsDetailDialogOpen(true);

    // Fetch full details
    const details = await fetchReportDetails(report.id);
    if (details) {
      // Merge assuming details has more info
      setSelectedReport(details);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    setIsUploading(false);
  };

  const handleSubmitNewReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    if (!activeInternship) {
      return;
    }

    // Prefer internship.id if available (from populated relation), fallback to internship_id or internshipId
    const internshipId =
      activeInternship.internship?.id ||
      activeInternship.internship_id ||
      (activeInternship as any).internshipId;
    const monthNumber = parseInt(newReport.month);

    if (isNaN(monthNumber)) {
      return;
    }

    const result = await uploadReport(
      internshipId,
      monthNumber,
      selectedFile,
      newReport.description,
      300, // default expirySeconds from backend
    );

    if (result) {
      fetchReports(currentPage - 1, itemsPerPage);

      setIsSubmitDialogOpen(false);
      setNewReport({
        student: user?.name || "",
        company: "Google",
        position: "Software Engineer Intern",
        month: "",
        description: "",
      });
      setSelectedFile(null);
      setUploadProgress(0);
    }
  };

  const getStatusBadge = (status: string | undefined | null) => {
    switch (status) {
      case "HR_AND_SUPERVISOR_VALIDATED":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20 font-bold uppercase tracking-widest text-[10px] px-3 py-1">
            Verified
          </Badge>
        );
      case "HR_VALIDATED":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20 font-bold uppercase tracking-widest text-[10px] px-3 py-1">
            HR Validated
          </Badge>
        );
      case "PENDING":
      default:
        return (
          <Badge className="bg-orange-500/10 text-orange-600 border-orange-200 hover:bg-orange-500/20 font-bold uppercase tracking-widest text-[10px] px-3 py-1">
            Pending
          </Badge>
        );
    }
  };

  const parseOptionalNumber = (value: unknown) => {
    if (value === null || value === undefined || value === "") return null;
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const getStringIfPresent = (value: unknown) => {
    if (value === null || value === undefined) return null;
    const str = String(value).trim();
    return str.length > 0 ? str : null;
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            My Monthly Reports
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Track your monthly report submissions and feedback
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isLoadingApps ? (
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Checking internship status...</span>
            </div>
          ) : activeInternship ? (
            <Dialog
              open={isSubmitDialogOpen}
              onOpenChange={setIsSubmitDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="h-9 font-bold gap-2 text-xs shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4" />
                  Submit New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl no-scrollbar">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    Submit Monthly Report
                  </DialogTitle>
                  <DialogDescription className="text-xs">
                    Provide your work summary and attach the report document.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmitNewReport}
                  className="space-y-4 py-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="student"
                        className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="student"
                        value={newReport.student}
                        disabled
                        className="bg-secondary/20 focus-visible:ring-primary/20 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="month"
                        className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider"
                      >
                        Report Month
                      </Label>
                      <select
                        id="month"
                        value={newReport.month}
                        onChange={(e) =>
                          setNewReport({ ...newReport, month: e.target.value })
                        }
                        className="w-full h-9 rounded-md border border-input bg-secondary/20 px-3 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select Month</option>
                        <option value="1">1 (January)</option>
                        <option value="2">2 (February)</option>
                        <option value="3">3 (March)</option>
                        <option value="4">4 (April)</option>
                        <option value="5">5 (May)</option>
                        <option value="6">6 (June)</option>
                        <option value="7">7 (July)</option>
                        <option value="8">8 (August)</option>
                        <option value="9">9 (September)</option>
                        <option value="10">10 (October)</option>
                        <option value="11">11 (November)</option>
                        <option value="12">12 (December)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="company"
                        className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider"
                      >
                        Company
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input
                          id="company"
                          value={newReport.company}
                          readOnly
                          className="pl-9 bg-secondary/20 focus-visible:ring-primary/20 text-xs text-muted-foreground cursor-not-allowed"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="position"
                        className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider"
                      >
                        Position
                      </Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input
                          id="position"
                          value={newReport.position}
                          readOnly
                          className="pl-9 bg-secondary/20 focus-visible:ring-primary/20 text-xs text-muted-foreground cursor-not-allowed"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider"
                    >
                      Summary of Activities
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Briefly describe your key achievements this month..."
                      className="min-h-[100px] bg-secondary/20 focus-visible:ring-primary/20 resize-none text-xs"
                      value={newReport.description}
                      onChange={(e) =>
                        setNewReport({
                          ...newReport,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      Attachment
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                        selectedFile
                          ? "border-primary/40 bg-primary/5"
                          : "border-border hover:border-primary/20 hover:bg-secondary/10"
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      {selectedFile ? (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-left">
                            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold truncate max-w-[180px]">
                                {selectedFile.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mx-auto text-primary">
                            <Upload className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-medium">
                            Click or drag to upload report
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            PDF, DOCX (Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {isUploading && (
                    <div className="space-y-2 animate-fadeIn">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-primary flex items-center gap-2">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Uploading...
                        </span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-1.5" />
                    </div>
                  )}

                  <DialogFooter className="pt-4">
                    <Button
                      type="submit"
                      className="w-full gap-2 font-bold uppercase tracking-wider text-xs h-10 shadow-lg shadow-primary/20"
                      disabled={!selectedFile || isSubmitting}
                    >
                      {!isSubmitting && <Send className="w-4 h-4" />}
                      {isSubmitting ? "Submitting..." : "Submit Monthly Report"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              disabled
              className="h-9 font-bold gap-2 text-xs shadow-lg shadow-primary/20 bg-muted text-muted-foreground cursor-not-allowed opacity-70"
            >
              <AlertCircle className="w-4 h-4" />
              Internship Required
            </Button>
          )}

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search reports..."
              className="pl-9 h-9 w-[180px] md:w-[240px] bg-card border-border transition-all text-xs"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 gap-4">
        {isLoadingReports ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredReports.length > 0 ? (
          filteredReports.map((report, idx) => (
            <Card
              key={report.id}
              className="group relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-slideInUp bg-card"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
                  {/* Left Section: Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-foreground">
                        {monthNames[report.monthNumber - 1]}
                      </h3>
                      <div className="flex flex-col gap-1 text-[11px] text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5 font-bold text-primary/70">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {report.internshipTitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section: Status (Centered) */}
                  <div className="flex justify-center md:justify-center items-center">
                    <div className="flex flex-col items-center gap-2">
                      {getStatusBadge(report.status)}
                      <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Created at:{" "}
                        {new Date(report.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Right Section: Actions & Marks */}
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-4 md:pt-0">
                    <Button
                      variant="ghost"
                      className="h-9 font-bold gap-2 text-xs px-5 border border-transparent hover:border-primary/20 hover:bg-primary/5 text-primary transition-all group/btn"
                      onClick={() => handleViewClick(report)}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/2 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500"></div>
            </Card>
          ))
        ) : (
          <Card className="p-16 text-center border-dashed border-2 bg-secondary/10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center border border-border">
              <FileText className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                No Monthly Reports
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                Your successfully submitted reports will appear here for
                tracking and feedback.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 h-10 px-8 font-bold text-xs uppercase tracking-wider border-primary/20 text-primary hover:bg-primary/5"
              onClick={() => setIsSubmitDialogOpen(true)}
            >
              Submit Your First Report
            </Button>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="h-9 w-9 p-0 border-border hover:bg-secondary"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-secondary/50 rounded-full border border-border">
            <span className="text-xs font-bold text-foreground">
              Page {currentPage}
            </span>
            <span className="text-xs text-muted-foreground">
              of {totalPages}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="h-9 w-9 p-0 border-border hover:bg-secondary"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Report Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="w-[92%] max-w-md rounded-3xl bg-card p-0 overflow-hidden shadow-2xl border-none">
          <div className="bg-primary/5 p-6 border-b border-primary/10">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-3 text-lg">
                  <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold leading-none">
                      {monthNames[selectedReport?.monthNumber - 1]}
                    </span>
                    <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest">
                      Monthly Evaluation
                    </span>
                  </div>
                </DialogTitle>
                {selectedReport && getStatusBadge(selectedReport.status)}
              </div>
            </DialogHeader>
          </div>

          {selectedReport && (
            <div className="p-5 md:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-secondary/20 border border-border/50">
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    Submitted On
                  </p>
                  <p className="text-xs font-bold flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary/60" />
                    {new Date(selectedReport.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-secondary/20 border border-border/50">
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    At
                  </p>
                  <p className="text-xs font-bold flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary/60" />
                    {new Date(selectedReport.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Summary + Feedbacks */}
              {(() => {
                const hrScore = parseOptionalNumber(
                  selectedReport?.hrScore ??
                    selectedReport?.HR_Score ??
                    selectedReport?.hr_score,
                );
                const supervisorScore = parseOptionalNumber(
                  selectedReport?.supervisorScore ??
                    selectedReport?.supervisor_score,
                );
                const hrFeedback = getStringIfPresent(
                  selectedReport?.hrFeedback ??
                    selectedReport?.HR_Feedback ??
                    selectedReport?.hr_feedback,
                );
                const supervisorFeedback = getStringIfPresent(
                  selectedReport?.supervisorFeedback ??
                    selectedReport?.supervisor_feedback,
                );

                const hasAnyFeedback =
                  hrScore !== null ||
                  supervisorScore !== null ||
                  !!hrFeedback ||
                  !!supervisorFeedback;

                const hasAnyScore =
                  hrScore !== null || supervisorScore !== null;
                const totalMarks = hasAnyScore
                  ? (hrScore ?? 0) + (supervisorScore ?? 0)
                  : null;

                return (
                  <>
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="summary"
                      className="w-full"
                    >
                      <AccordionItem
                        value="summary"
                        className="border-border/50"
                      >
                        <AccordionTrigger className="py-3 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-3.5 h-3.5 text-primary" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                              Summary
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-4 rounded-xl bg-card border shadow-sm text-xs leading-relaxed text-muted-foreground relative">
                            <div className="absolute left-0 top-3 w-0.5 h-6 bg-primary rounded-full"></div>
                            {getStringIfPresent(selectedReport.summary) ? (
                              <>"{selectedReport.summary}"</>
                            ) : (
                              <span className="italic">
                                No summary provided.
                              </span>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem
                        value="feedbacks"
                        className="border-border/50"
                      >
                        <AccordionTrigger className="py-3 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-primary" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                              Feedbacks
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {!hasAnyFeedback ? (
                            <div className="p-4 rounded-xl bg-secondary/20 border border-border/50 text-xs text-muted-foreground italic">
                              No feedback available yet.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {(hrScore !== null || hrFeedback) && (
                                <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                                      HR
                                    </p>
                                    {hrScore !== null && (
                                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 font-bold text-[10px] px-3 py-1">
                                        Score: {hrScore}
                                      </Badge>
                                    )}
                                  </div>
                                  {hrFeedback && (
                                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                                      {hrFeedback}
                                    </p>
                                  )}
                                </div>
                              )}

                              {(supervisorScore !== null ||
                                supervisorFeedback) && (
                                <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                                      Supervisor
                                    </p>
                                    {supervisorScore !== null && (
                                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 font-bold text-[10px] px-3 py-1">
                                        Score: {supervisorScore}
                                      </Badge>
                                    )}
                                  </div>
                                  {supervisorFeedback && (
                                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                                      {supervisorFeedback}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="pt-1">
                      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                          Total Marks
                        </p>
                        {totalMarks !== null ? (
                          <p className="text-sm font-extrabold text-primary">
                            {totalMarks}
                          </p>
                        ) : (
                          <p className="text-xs font-bold text-muted-foreground">
                            —
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          <div className="p-4 bg-primary/5 border-t border-primary/10 mt-auto">
            <Button
              onClick={() => setIsDetailDialogOpen(false)}
              className="w-full h-10 font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
            >
              Close Detail
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Star(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
