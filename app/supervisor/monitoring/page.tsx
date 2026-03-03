"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  FileText,
  Calendar,
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
  Loader2,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  useSupervisorReports,
  InternshipReportResponse,
  InternshipReportDetailResponse,
} from "@/hooks/SupervisorHook/useSupervisorReports";
import { toast } from "sonner";
import { format } from "date-fns"; // Make sure date-fns is installed or use native

export default function InternshipMonitoring() {
  const isMobile = useIsMobile();
  // const [searchTerm, setSearchTerm] = useState(""); // Backend search not implemented in provided code
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 5 : 10;

  const {
    reports,
    pagination,
    loading,
    fetchReports,
    fetchReportDetails,
    submitReview,
  } = useSupervisorReports();

  // Filter reports to only show HR_VALIDATED status
  const filteredReports = reports.filter(
    (report) => report.status === "HR_VALIDATED",
  );

  useEffect(() => {
    fetchReports(currentPage - 1, itemsPerPage);
  }, [fetchReports, currentPage, itemsPerPage]);

  // Dialog states
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [marks, setMarks] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to map backend status to UI status
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "HR_VALIDATED":
        return "HR Validated";
      case "HR_AND_SUPERVISOR_VALIDATED":
        return "Verified";
      default:
        // Fallback for other statuses to be readable
        return (
          status.charAt(0) + status.slice(1).toLowerCase().replace(/_/g, " ")
        );
    }
  };

  console.log("selectedReport", selectedReport);

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  const totalPages = pagination?.totalPages || 0;
  // const currentReports = filteredReports... // No longer needed, reports is current page data

  const handleReviewClick = async (report: InternshipReportResponse) => {
    setIsDetailDialogOpen(true);
    setSelectedReport(null);
    setIsFetchingDetails(true);

    try {
      const details = await fetchReportDetails(report.id);
      if (details) {
        console.log("Report Details:", details);
        // Merge details with report to ensure we have the URL if it's missing in details but present in report
        setSelectedReport({
          ...details,
          presignedUrl:
            details.reportFileUrl ||
            details.filePath ||
            details.file_path ||
            report.presignedUrl ||
            "",
        });
      } else {
        setIsDetailDialogOpen(false);
      }
    } catch (error) {
      console.error("Error fetching report details:", error);
      setIsDetailDialogOpen(false);
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleFinishReviewed = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmReview = async () => {
    if (selectedReport) {
      setIsSubmitting(true);
      try {
        await submitReview(selectedReport.id, marks, feedback);
        toast.success("Review submitted successfully");
        // Refresh list
        fetchReports(currentPage - 1, itemsPerPage);

        setIsConfirmDialogOpen(false);
        setIsDetailDialogOpen(false);
        setSelectedReport(null);
        setFeedback("");
        setMarks(0);
      } catch (error) {
        // Error handled in hook
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDownloadReport = async (
    reportUrl: string | undefined | null,
    fileName: string,
  ) => {
    if (!reportUrl) {
      toast.error("File URL not available");
      return;
    }

    try {
      // Show/open the backend PDF URL (presigned URL)
      window.open(reportUrl, "_blank", "noopener,noreferrer");

      // Also trigger direct download for better UX
      const response = await fetch(reportUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch file from URL");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${fileName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open backend URL only
      window.location.href = reportUrl;
    }
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
            Total reports:{" "}
            <span className="text-foreground font-bold">
              {pagination?.totalElements || 0}
            </span>
          </p>
        </div>

        {/* Search removed as backend search not implemented yet, or can be re-added if hook supports it */}
      </div>

      {/* Reports Grid - More Compact */}
      <div className="grid grid-cols-1 gap-2">
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredReports.length > 0 ? (
          filteredReports.map((report, idx) => (
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
                        report.status === "HR_VALIDATED"
                          ? "bg-primary/5 border-primary/10 group-hover:bg-primary group-hover:text-white"
                          : "bg-secondary/30 border-border group-hover:bg-secondary"
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-foreground">
                        {report.studentName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-muted-foreground">
                        <span className="flex items-center gap-1 font-bold text-primary">
                          MONTHLY REPORT
                        </span>
                        {/* Company removed as not in API */}
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                          {getStatusLabel(report.status)}
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
                        {new Date(report.createdAt).toLocaleDateString()}
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
                Try waiting for students or HR to submit reports.
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
              Monthly Report -{" "}
              {isFetchingDetails ? (
                <span className="animate-pulse w-24 h-4 bg-secondary rounded" />
              ) : (
                selectedReport && getMonthName(selectedReport.monthNumber)
              )}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-[10px] font-medium tracking-tight">
              Submitted on{" "}
              {isFetchingDetails ? (
                <span className="animate-pulse inline-block w-32 h-3 bg-secondary rounded ml-1" />
              ) : (
                selectedReport &&
                new Date(selectedReport.createdAt).toLocaleString()
              )}
            </DialogDescription>
          </DialogHeader>

          {isFetchingDetails ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            selectedReport && (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-border/50">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-sm">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-xs font-semibold text-foreground truncate">
                        {selectedReport.studentName}
                      </p>
                    </div>
                    {/* Company info removed from API */}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-sm">
                      <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-[11px] font-medium text-foreground truncate">
                        {selectedReport.internshipTitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-[11px] font-medium text-foreground">
                        {getMonthName(selectedReport.monthNumber)} Report
                      </p>
                    </div>
                  </div>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  defaultValue="student-summary"
                  className="w-full space-y-2"
                >
                  <AccordionItem
                    value="student-summary"
                    className="border-border/50 border rounded-xl px-0 overflow-hidden bg-secondary/5"
                  >
                    <AccordionTrigger className="hover:no-underline px-4 py-3 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground text-[10px] uppercase font-bold tracking-widest">
                          Monthly Summary
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-0 text-xs leading-relaxed text-muted-foreground italic">
                      "{selectedReport.summary}"
                    </AccordionContent>
                  </AccordionItem>

                  {(selectedReport.hrScore !== null ||
                    selectedReport.hrFeedback) && (
                    <AccordionItem
                      value="hr-feedback"
                      className="border-indigo-500/20 border rounded-xl px-0 overflow-hidden bg-indigo-500/5"
                    >
                      <AccordionTrigger className="hover:no-underline px-4 py-3 text-sm font-medium">
                        <div className="flex items-center justify-between w-full pr-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-indigo-500" />
                            <span className="text-foreground text-[10px] uppercase font-bold tracking-widest">
                              HR Evaluation
                            </span>
                          </div>
                          {selectedReport.hrScore !== null && (
                            <Badge
                              variant="outline"
                              className="text-[10px] h-5 font-bold border-indigo-500/20 bg-indigo-500/10 text-indigo-600 ml-2"
                            >
                              Score: {selectedReport.hrScore}/50
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-0 text-xs leading-relaxed text-muted-foreground italic">
                        "
                        {selectedReport.hrFeedback ||
                          "No written feedback provided."}
                        "
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
                <div
                  className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-secondary/10 hover:bg-secondary/20 hover:border-primary/30 transition-all cursor-pointer group/file"
                  onClick={() =>
                    window.open(`${selectedReport.presignedUrl}`, "_blank")
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center group-hover/file:scale-110 transition-transform">
                      <FileText className="w-4.5 h-4.5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-foreground truncate max-w-[180px]">
                        Download Report
                      </p>
                      <p className="text-[9px] text-muted-foreground font-medium flex items-center gap-1.5">
                        Click to view document
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadReport(
                          selectedReport.presignedUrl ||
                            selectedReport.filePath ||
                            selectedReport.file_path,
                          `Report_${selectedReport.studentName}_${selectedReport.monthNumber}`,
                        );
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
                    {getStatusLabel(selectedReport.status)}
                  </Badge>
                </div>
              </div>
            )
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
                {selectedReport?.studentName}
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
                placeholder="1-50"
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
                    // Limit the number to 1-50
                    if (num >= 1 && num <= 50) {
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
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-tight"
            >
              {isSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
              ) : null}
              Confirm Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
