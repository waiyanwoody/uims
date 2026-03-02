"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Users,
  ChevronLeft,
  Calendar,
  Layers,
  Mail,
  Loader2,
  CheckCircle2,
  FileText,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/api";
import { Internship, Student, ApplicationWithDetails } from "@/types/types";
import { useAuth } from "@/contexts/AuthContext";
import { ApplyModal } from "@/components/apply-modal";
import { useStudentProfile } from "@/hooks/StudentHook/useStudentProfile";
import { useStudent } from "@/hooks/StudentHook/useStudent";
import { useStudentApplications } from "@/hooks/StudentHook/useStudentApplications";
import { useApplicationDetails } from "@/hooks/StudentHook/useApplicationDetails";

export default function InternshipPostDetails() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { user } = useAuth();

  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Fetch student profile for profile-specific data (bio, etc.)
  const { profile: studentProfile } = useStudentProfile(user?.id || 0);

  // Fetch full student entity for core data (student_number, name, email)
  const { student: fullStudentData } = useStudent(user?.id || 0);

  // Fetch student's applications to check if they already applied to this internship
  const { applications } = useStudentApplications(user?.id, 1, 100);
  const existingApplication = applications?.find(
    (app) => app.internship_id === id,
  );

  // Fetch specific application details if the user has applied
  const { application: fullApplicationDetails, loading: applicationLoading } =
    useApplicationDetails(existingApplication?.id);

  // Check if student has any active internship (APPROVED status)
  const hasActiveInternship = applications?.some(
    (app) => app.status === "APPROVED" || app.status === "approved",
  );

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/internships/${id}`);
        // Assuming the response structure is { data: { ... } } or { ... }
        // Looking at useInternship.ts, res.data.data had the paginated response.
        // For single item, it likely is res.data.data
        setInternship(res.data.data);
      } catch (err: any) {
        console.error("Error fetching internship details:", err);
        setError("Failed to load internship details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInternship();
    }
  }, [id]);

  const getApplicationStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-secondary text-foreground";
    }
  };

  const getApplicationStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const parseRequirements = (requirements: string): string[] => {
    try {
      return JSON.parse(requirements);
    } catch {
      return requirements.split(",").map((r) => r.trim());
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading details...</p>
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-red-500 font-medium">
          {error || "Internship not found"}
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{internship.title}</h1>
          <p className="text-muted-foreground">{internship.company.name}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Role Overview Card */}
        <Card className="p-6 relative">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold">Role Overview</h2>
                <Badge
                  className={
                    internship.status === "OPEN"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }
                >
                  {internship.status}
                </Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 whitespace-pre-wrap leading-relaxed">
                {internship.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-3 min-w-[200px]">
              {existingApplication || fullApplicationDetails ? (
                <>
                  <Badge
                    variant="outline"
                    className={`${getApplicationStatusColor(
                      fullApplicationDetails?.status ||
                        existingApplication?.status ||
                        "PENDING",
                    )} px-4 py-2 flex items-center gap-2 font-semibold text-sm shadow-sm border-2`}
                  >
                    {getApplicationStatusIcon(
                      fullApplicationDetails?.status ||
                        existingApplication?.status ||
                        "PENDING",
                    )}
                    {(
                      fullApplicationDetails?.status ||
                      existingApplication?.status ||
                      "PENDING"
                    ).toUpperCase()}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg border border-border transition-colors hover:bg-secondary/80">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>
                      Submitted CV:{" "}
                      <span className="text-foreground font-semibold">
                        {fullApplicationDetails?.cvForm?.title ||
                          existingApplication?.cvForm?.title ||
                          fullApplicationDetails?.cv?.title ||
                          existingApplication?.cv?.title ||
                          "Assessment CV"}
                      </span>
                    </span>
                  </div>
                </>
              ) : hasActiveInternship ? (
                <Button
                  disabled
                  className="w-full md:w-auto bg-muted text-muted-foreground px-8 py-6 text-base font-semibold shadow-none cursor-not-allowed"
                >
                  Active Internship Exists
                </Button>
              ) : (
                <Button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 px-8 py-6 text-base font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  disabled={internship.status !== "OPEN"}
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Company
                  </p>
                  <p className="font-medium">{internship.company.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Location
                  </p>
                  <p className="font-medium">{internship.company.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Category
                  </p>
                  <p className="font-medium">{internship.category}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Slots Available
                  </p>
                  <p className="font-medium">{internship.slots} Positions</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Deadline
                  </p>
                  <p className="font-medium">
                    {new Date(internship.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Posted On
                  </p>
                  <p className="font-medium">
                    {internship.createdAt
                      ? new Date(internship.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Key Requirements
          </h3>
          <div className="flex flex-wrap gap-2">
            {parseRequirements(internship.requirements).map((req, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {req}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Company Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            About Company
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{internship.company.name}</h3>
                <p className="text-muted-foreground">
                  {internship.company.industry || "Software & Technology"}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary"
              >
                Verified Company
              </Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A leading company in the industry, committed to providing
              excellent training and mentorship to aspiring professionals. We
              foster a culture of innovation, collaboration, and continuous
              learning.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary hover:underline cursor-pointer">
              <Mail className="w-4 h-4" />
              <span>
                contact@
                {internship.company.name.toLowerCase().replace(/ /g, "")}.com
              </span>
            </div>
          </div>
        </Card>

        {/* Mobile Apply Button or Status */}
        <div className="md:hidden pt-4 pb-20">
          {existingApplication ? (
            <div className="space-y-3">
              <Badge
                variant="outline"
                className={`w-full py-4 text-center flex items-center justify-center gap-2 text-lg ${getApplicationStatusColor(
                  existingApplication.status,
                )}`}
              >
                {getApplicationStatusIcon(existingApplication.status)}
                Application {existingApplication.status.toLowerCase()}
              </Badge>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border">
                <FileText className="w-4 h-4" />
                <span>
                  Submitted CV:{" "}
                  {existingApplication.cvForm?.title ||
                    existingApplication.cv?.title ||
                    "N/A"}
                </span>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
              disabled={internship.status !== "OPEN"}
            >
              Apply Now
            </Button>
          )}
        </div>
      </div>

      {isApplyModalOpen && (
        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          internship={internship}
          // Merge full student data (for student_number) with profile data
          student={
            {
              ...fullStudentData,
              ...studentProfile,
              id: user?.id || 0,
              name: fullStudentData?.name || user?.name || "Student",
              email: fullStudentData?.email || user?.email || "",
            } as any
          }
        />
      )}
    </div>
  );
}
