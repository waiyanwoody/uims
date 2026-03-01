"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Download,
  Trash2,
  Plus,
  FileText,
  Upload,
  X,
  File,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileX,
} from "lucide-react";
import { useCvs } from "@/hooks/StudentHook/useCvs";
import { CvFormRequest } from "@/types/types";
import { useAuth } from "@/contexts/AuthContext";
import type { CV } from "@/types/types";

export default function MyCVs() {
  const [cvs, setCvs] = useState<CV[]>([]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cvTitle, setCvTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    createCv,
    fetchCvs,
    deleteCv,
    loading: isUploading,
    error: uploadError,
  } = useCvs();
  const { user } = useAuth();

  // Fetch CVs when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const cvData = await fetchCvs(1, 10);
      setCvs(cvData);
    };

    fetchData();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF only)
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

      setSelectedFile(file);

      // Auto-fill title from filename
      if (!cvTitle) {
        const nameWithoutExt = file.name.replace(".pdf", "");
        setCvTitle(nameWithoutExt);
      }

      setError(null);
    }
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

      setSelectedFile(file);

      if (!cvTitle) {
        const nameWithoutExt = file.name.replace(".pdf", "");
        setCvTitle(nameWithoutExt);
      }

      setError(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById(
      "cv-file-input",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };



  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    if (!cvTitle.trim()) {
      setError("Please enter a CV title");
      return;
    }

    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    try {
      const cvRequest: CvFormRequest = {
        studentId: user.id,
        title: cvTitle,
      };

      const uploadedCv = await createCv(cvRequest, selectedFile);

      // Add new CV to list
      const newCV: CV = {
        id: uploadedCv.id,
        student_id: uploadedCv.student_id,
        title: uploadedCv.title,
        uploadedDate: uploadedCv.uploadedDate,
        file_path: uploadedCv.file_path,
        updated_at: uploadedCv.updated_at,
      };

      setCvs([newCV, ...cvs]);

      // Reset and close
      setSelectedFile(null);
      setCvTitle("");
      setError(null);
      setIsUploadModalOpen(false);
      setSuccess("CV uploaded successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(uploadError || err.message || "Failed to upload CV");
    }
  };

  const handleDelete = (id: number) => {
    setCvToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (cvToDelete === null) return;

    try {
      await deleteCv(cvToDelete);

      // Update local state to remove deleted CV
      setCvs((prevCvs) => prevCvs.filter((cv) => cv.id !== cvToDelete));
      setSuccess("CV deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
      setIsDeleteDialogOpen(false);
      setCvToDelete(null);
    } catch (err: any) {
      setError(uploadError || err.response?.data?.message || err.message || "Failed to delete CV");
    }
  };
  const handleDownload = async (cv: CV) => {
    const fileUrl = cv.file_path;

    if (!fileUrl) {
      setError(`Cannot download ${cv.title}`);
      return;
    }

    try {
      // Show/open the backend PDF URL (presigned URL)
      window.open(fileUrl, "_blank", "noopener,noreferrer");

      // Also trigger direct download for better UX
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch file from URL");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${cv.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open backend URL only
      window.location.href = fileUrl;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My CVs</h1>
          <p className="text-muted-foreground mt-2">
            Manage your CV documents for applications
          </p>
        </div>
        <Button
          className="gap-2 bg-primary hover:bg-primary/90"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Upload CV</span>
        </Button>
      </div>

      {/* CV List */}
      <div className="space-y-4">
        {cvs.length > 0 ? (
          cvs.map((cv) => (
            <Card
              key={cv.id}
              className="p-6 border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{cv.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded {new Date(cv.uploadedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border gap-1 bg-transparent"
                    onClick={() => handleDownload(cv)}
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-1 fill-destructive-foreground"
                    onClick={() => handleDelete(cv.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-secondary/10 rounded-2xl border-2 border-dashed border-border">
            <div className="p-4 bg-background rounded-full mb-4 shadow-sm">
              <FileX className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No CVs found
            </h3>
            <p className="text-muted-foreground max-w-xs mx-auto mb-6">
              You haven't uploaded any CVs yet. Upload your first CV to start
              applying for internships.
            </p>
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Upload your first CV
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your CV
              document from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCvToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl p-0 border border-border shadow-2xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-primary">
              Upload New CV
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Upload a PDF file (max 5MB) to add to your CV library
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {/* CV Title Input */}
            <div className="space-y-2">
              <Label htmlFor="cvTitle" className="text-sm font-semibold">
                CV Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cvTitle"
                placeholder="e.g., Software Engineer Resume 2024"
                value={cvTitle}
                onChange={(e) => setCvTitle(e.target.value)}
                className="border-border focus-visible:ring-primary"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                CV File <span className="text-red-500">*</span>
              </Label>

              {!selectedFile ? (
                <div
                  className="group border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/50 transition-all duration-200 cursor-pointer bg-secondary/5"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("cv-file-input")?.click()
                  }
                >
                  <input
                    id="cv-file-input"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-200">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-foreground mb-1">
                        Drop your CV here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF format only • Maximum 5MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Choose File
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border border-primary/20 rounded-xl p-5 bg-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <File className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          <DialogFooter className="p-6 pt-0 flex flex-col-reverse sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              className="sm:flex-1"
              onClick={() => {
                setIsUploadModalOpen(false);
                setSelectedFile(null);
                setCvTitle("");
                setError(null);
              }}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="sm:flex-1 gap-2"
              onClick={handleUpload}
              disabled={!selectedFile || !cvTitle.trim() || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload CV
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bottom-Left Notifications */}
      {success && (
        <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{success}</p>
          </div>
        </div>
      )}

      {error && !isUploadModalOpen && (
        <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
