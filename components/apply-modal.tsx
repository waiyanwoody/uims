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
import { Loader2, Upload, CheckCircle2, AlertCircle, X, File, FileText, Paperclip } from "lucide-react";
import { Internship, Student, CV } from "@/types/types";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: Internship;
  student: Student;
  useSampleData?: boolean;
}

export function ApplyModal({ isOpen, onClose, internship, student, useSampleData = true }: ApplyModalProps) {
  const [cvList, setCvList] = useState<CV[]>([]);
  const [selectedCvId, setSelectedCvId] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCvs, setLoadingCvs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Sample CVs data
  const sampleCVs: CV[] = [
    {
      id: 1,
      student_id: 1,
      title: "Software Engineer Resume 2024",
      file_path: "/uploads/cvs/john_doe_resume_2024.pdf",
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-02-10')
    },
    {
      id: 2,
      student_id: 1,
      title: "Full Stack Developer CV",
      file_path: "/uploads/cvs/john_doe_fullstack.pdf",
      created_at: new Date('2024-01-20'),
      updated_at: new Date('2024-02-05')
    },
    {
      id: 3,
      student_id: 1,
      title: "Technical Resume - Updated",
      file_path: "/uploads/cvs/john_doe_tech_resume.pdf",
      created_at: new Date('2024-02-01'),
      updated_at: new Date('2024-02-15')
    }
  ];

  useEffect(() => {
    if (isOpen) {
      if (useSampleData) {
        setCvList(sampleCVs);
      } else {
        fetchCVs();
      }
      // Reset states when modal opens
      setUseFileUpload(false);
      setUploadedFile(null);
      setSelectedCvId("");
      setCoverLetter("");
      setError(null);
      setSuccess(false);
    }
  }, [isOpen, useSampleData]);

  const fetchCVs = async () => {
    setLoadingCvs(true);
    try {
      const response = await fetch("/api/student/cvs");
      if (!response.ok) throw new Error("Failed to fetch CVs");
      const data = await response.json();
      setCvList(data.cvs || []);
    } catch (err) {
      setError("Failed to load your CVs. Please try again.");
    } finally {
      setLoadingCvs(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError('File size must be less than 5MB');
        return;
      }

      setUploadedFile(file);
      setError(null);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
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
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError('File size must be less than 5MB');
        return;
      }

      setUploadedFile(file);
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

    // If using file upload mode but no file, that's okay (optional)
    // If using select mode, CV must be selected

    setIsLoading(true);

    try {
      if (useSampleData) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get CV title
        let cvTitle = 'No CV attached';
        if (useFileUpload && uploadedFile) {
          cvTitle = uploadedFile.name;
        } else if (!useFileUpload && selectedCvId) {
          const selectedCV = cvList.find(cv => cv.id.toString() === selectedCvId);
          cvTitle = selectedCV?.title || 'CV';
        }
        
        // Dispatch custom event
        const newApplicationEvent = new CustomEvent('newApplication', {
          detail: {
            internshipTitle: internship.title,
            companyName: internship.company?.name || 'Company',
            location: internship.company?.location || '',
            category: internship.category,
            deadline: internship.deadline,
            cvTitle: cvTitle,
            coverLetter: coverLetter,
            appliedDate: new Date().toISOString()
          }
        });
        window.dispatchEvent(newApplicationEvent);
        
        console.log('Application submitted (sample mode):', {
          internship_id: internship.id,
          cv_type: useFileUpload ? (uploadedFile ? 'uploaded_file' : 'no_cv') : 'existing_cv',
          cv_id: !useFileUpload && selectedCvId ? parseInt(selectedCvId) : null,
          cv_file: useFileUpload && uploadedFile ? uploadedFile.name : null,
          cover_letter: coverLetter,
          student_id: student.id
        });

        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSelectedCvId("");
          setUploadedFile(null);
          setUseFileUpload(false);
          setCoverLetter("");
          setSuccess(false);
        }, 2000);
      } else {
        // Real API call
        const formData = new FormData();
        formData.append('internship_id', internship.id.toString());
        formData.append('cover_letter', coverLetter);
        
        if (useFileUpload && uploadedFile) {
          formData.append('cv_file', uploadedFile);
        } else if (!useFileUpload && selectedCvId) {
          formData.append('cv_id', selectedCvId);
        }

        const response = await fetch("/api/applications", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to submit application");
        }

        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSelectedCvId("");
          setUploadedFile(null);
          setUseFileUpload(false);
          setCoverLetter("");
          setSuccess(false);
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for Internship</DialogTitle>
          <DialogDescription>
            Submit your application for this position
            {useSampleData}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <p className="text-lg font-semibold">Application Submitted Successfully!</p>
            <p className="text-muted-foreground text-center">
              {useSampleData 
                ? "Your application has been added! Check 'My Applications' to see it."
                : "Your application has been sent to the company. You can track its status in your applications page."}
            </p>
            {useSampleData && (
              <Button
                onClick={() => window.location.href = '/student/applications'}
                className="mt-2"
              >
                View My Applications
              </Button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Internship Details */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-lg">{internship.title}</h3>
              <p className="text-sm text-muted-foreground">
                {internship.company?.name || "Company"}
              </p>
              <div className="flex gap-4 text-sm flex-wrap">
                <span className="flex items-center gap-1">
                  📍 {internship.company?.location}
                </span>
                <span className="flex items-center gap-1">
                  ⏰ Deadline: {new Date(internship.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Student Information */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Your Information</Label>
              <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{student.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Student Number</p>
                  <p className="font-medium">{student.student_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Major</p>
                  <p className="font-medium">{student.major}</p>
                </div>
              </div>
            </div>

            {/* CV Selection or Upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Resume/CV <span className="text-red-500">*</span>
              </Label>

              {/* Toggle Buttons */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={!useFileUpload ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUseFileUpload(false);
                    setUploadedFile(null);
                    setError(null);
                  }}
                  className={!useFileUpload ? "bg-primary" : ""}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Select from My CVs
                </Button>
                <Button
                  type="button"
                  variant={useFileUpload ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUseFileUpload(true);
                    setSelectedCvId("");
                    setError(null);
                  }}
                  className={useFileUpload ? "bg-primary" : ""}
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach New File
                </Button>
              </div>

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
                      <p className="text-xs text-muted-foreground">
                        Switch to "Attach New File" to upload one now
                      </p>
                    </div>
                  ) : (
                    <Select value={selectedCvId} onValueChange={setSelectedCvId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a CV from your library" />
                      </SelectTrigger>
                      <SelectContent>
                        {cvList.map((cv) => (
                          <SelectItem key={cv.id} value={cv.id.toString()}>
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span className="font-medium">{cv.title}</span>
                              <span className="text-xs text-muted-foreground">
                                • Updated {new Date(cv.updated_at).toLocaleDateString()}
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
                        <Button type="button" variant="outline" size="sm" className="mt-2">
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
                            <p className="font-medium text-sm truncate">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
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
                Cover Letter <span className="text-muted-foreground text-sm">(Optional)</span>
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
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
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