"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  File,
  FileText,
  Paperclip,
  Briefcase,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import {
  Internship,
  Student,
  CV,
  CreateApplicationRequest,
  CvFormRequest,
} from "@/types/types";
import { useApplication } from "@/hooks/StudentHook/useApplication";
import { useCvs } from "@/hooks/StudentHook/useCvs";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: Internship;
  student: Student;
  useSampleData?: boolean;
}

export function ApplyModal({
  isOpen,
  onClose,
  internship,
  student,
  useSampleData = true,
}: ApplyModalProps) {
  useEffect(() => {
    console.log("ApplyModal student input details:", {
      id: student.id,
      name: student.name,
      student_number: student.studentNumber,
      studentNumber: (student as any).studentNumber,
    });
  }, [student]);

  const [cvList, setCvList] = useState<CV[]>([]);
  const [selectedCvId, setSelectedCvId] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [cvTitle, setCvTitle] = useState("");
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCvs, setLoadingCvs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { createApplication, loading: applicationLoading } = useApplication();

  const { createCv: uploadCvToBackend, fetchCvs, error: cvError } = useCvs();

  useEffect(() => {
    if (isOpen) {
      loadCVs();
      // Reset states when modal opens
      setUseFileUpload(false);
      setUploadedFile(null);
      setCvTitle("");
      setSelectedCvId("");
      setCoverLetter("");
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  const loadCVs = async () => {
    setLoadingCvs(true);
    try {
      const data = await fetchCvs();
      setCvList(data || []);
    } catch (err) {
      console.error("Failed to load CVs:", err);
    } finally {
      setLoadingCvs(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("File size must be less than 5MB");
        return;
      }

      setUploadedFile(file);
      setCvTitle(file.name.replace(".pdf", ""));
      setError(null);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setCvTitle("");
    const fileInput = document.getElementById(
      "file-upload",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("File size must be less than 5MB");
        return;
      }

      setUploadedFile(file);
      setCvTitle(file.name.replace(".pdf", ""));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation - At least one CV source is required
    if (!useFileUpload && !selectedCvId) {
      setError("Please select a CV from your library or attach a new file");
      return;
    }

    setIsLoading(true);

    try {
      let finalCvId: number | null = null;

      // Handle CV Upload if a new file is provided
      if (useFileUpload && uploadedFile) {
        const cvRequest: CvFormRequest = {
          studentId: student.id,
          title: cvTitle || uploadedFile.name.replace(".pdf", ""),
        };
        const uploadedCv = await uploadCvToBackend(cvRequest, uploadedFile);
        finalCvId = uploadedCv.id;
      } else if (!useFileUpload && selectedCvId) {
        finalCvId = parseInt(selectedCvId);
      }

      if (!finalCvId) {
        throw new Error("No CV provided for application");
      }

      const request: CreateApplicationRequest = {
        studentId: student.student_id || student.id,
        internshipId: internship.id,
        cvId: finalCvId,
      };

      await createApplication(request);

      // Get CV title for local display
      let displayCvTitle = "CV attached";
      if (useFileUpload && uploadedFile) {
        displayCvTitle = uploadedFile.name;
      } else if (!useFileUpload && selectedCvId) {
        const selectedCV = cvList.find(
          (cv) => cv.id.toString() === selectedCvId,
        );
        displayCvTitle = selectedCV?.title || "CV";
      }

      // Dispatch custom event
      const newApplicationEvent = new CustomEvent("newApplication", {
        detail: {
          internshipTitle: internship.title,
          companyName: internship.company?.name || "Company",
          location: internship.company?.location || "",
          category: internship.category,
          deadline: internship.deadline,
          cvTitle: displayCvTitle,
          coverLetter: coverLetter,
          appliedDate: new Date().toISOString(),
        },
      });
      window.dispatchEvent(newApplicationEvent);

      setSuccess(true);
      // Removed automatic close timeout to keep success message visible
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    // Valid if:
    // 1. Using file upload mode (file is optional)
    // 2. Using select mode and a CV is selected
    if (useFileUpload) {
      return true; // File is optional in this mode
    } else {
      return selectedCvId !== ""; // CV must be selected in select mode
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[95vh] overflow-y-auto no-scrollbar rounded-2xl p-0 border border-border shadow-2xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-primary">
            Apply for Internship
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Submit your application for this position to start your professional
            journey
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-12 px-6 flex flex-col items-center justify-center gap-6">
            <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-bold">
                Application Submitted Successfully!
              </p>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {useSampleData
                  ? "Your application has been added! Check 'My Applications' to track your status."
                  : "Your application has been sent to the company. You will be notified of any updates via email."}
              </p>
            </div>
            {useSampleData && (
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Button
                  onClick={() =>
                    (window.location.href = "/student/applications")
                  }
                  className="bg-primary hover:bg-primary/90 min-w-[160px]"
                >
                  View My Applications
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="min-w-[160px]"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-6">
            {/* Internship Details */}
            <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                Internship Details
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground leading-tight">
                  {internship.title}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {internship.company?.name || "Company"}
                </p>
              </div>
              <div className="flex gap-4 text-xs font-medium text-muted-foreground flex-wrap pt-1 border-t border-primary/10 mt-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {internship.company?.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Deadline: {new Date(internship.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Student Information */}
            <div className="space-y-4">
              <Label className="text-base font-bold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Your Information
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-secondary/30 p-4 rounded-xl border border-border/50">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                    Name
                  </p>
                  <p className="font-semibold text-sm">{student.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                    Email
                  </p>
                  <p className="font-semibold text-sm truncate">
                    {student.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                    Student ID
                  </p>
                  <p className="font-semibold text-sm">
                    {student.studentNumber ||
                      (student as any).studentNumber ||
                      "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                    Major
                  </p>
                  <p className="font-semibold text-sm">
                    {student.major || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* CV Selection or Upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Resume/CV <span className="text-red-500">*</span>
              </Label>

              {/* Select from My CVs */}
              {!useFileUpload && (
                <div className="space-y-2">
                  {loadingCvs ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="ml-2">Loading your CVs...</span>
                    </div>
                  ) : cvList.length === 0 ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-3">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        You don't have any saved CVs yet
                      </p>
                    </div>
                  ) : (
                    <Select
                      value={selectedCvId}
                      onValueChange={setSelectedCvId}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a CV from your library" />
                      </SelectTrigger>
                      <SelectContent className="w-[calc(100vw-4rem)] sm:max-w-md">
                        {cvList.map((cv) => (
                          <SelectItem key={cv.id} value={cv.id.toString()}>
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 shrink-0 text-primary" />
                              <span className="font-medium truncate text-sm sm:text-base">
                                {cv.title}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}

              {/* Upload New File */}
              {useFileUpload && (
                <div className="space-y-3">
                  {!uploadedFile ? (
                    <div
                      className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <input
                        id="file-upload"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-3"
                      >
                        <div className="p-4 bg-primary/10 rounded-full">
                          <Upload className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <p className="text-base font-medium mb-1">
                            Drop your CV here or click to browse
                          </p>
                          <p className="text-sm text-muted-foreground">
                            PDF format only • Maximum 5MB • Optional
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <div className="border-2 border-primary/20 rounded-lg p-4 bg-primary/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <File className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {uploadedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                              • PDF
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveFile}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    💡 You can submit without attaching a file if you prefer
                  </p>
                </div>
              )}
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-base font-semibold">
                Cover Letter{" "}
                <span className="text-muted-foreground text-sm">
                  (Optional)
                </span>
              </Label>
              <Textarea
                id="coverLetter"
                placeholder="Tell the company why you're interested in this position and what makes you a great fit..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={6}
                className="resize-none"
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground">
                {coverLetter.length} / 1000 characters
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Footer Actions */}
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !isFormValid()}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
