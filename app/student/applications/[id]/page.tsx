"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Users,
  ChevronLeft,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Loader2,
} from "lucide-react";
import { useApplicationDetails } from "@/hooks/StudentHook/useApplicationDetails";

export default function ApplicationViewDetails() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { application, loading, error } = useApplicationDetails(id);

  const getStatusColor = (status: string | undefined) => {
    if (!status) return "bg-secondary text-foreground";
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

  const getStatusIcon = (status: string | undefined) => {
    if (!status) return null;
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

  const parseRequirements = (requirements: string | any): string[] => {
    if (!requirements) return [];
    if (Array.isArray(requirements)) return requirements;
    try {
      return JSON.parse(requirements);
    } catch {
      return requirements.split(",").map((r: string) => r.trim());
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading application details...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-red-500 font-medium">
          {error || "Application not found"}
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const internship =
    application.internship ||
    (application as any).internshipPost ||
    (application as any).internship_post;
  const company =
    internship?.company ||
    (internship as any)?.companyProfile ||
    (application as any)?.company;

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
          <h1 className="text-2xl font-bold">
            {internship?.title ||
              (application as any).internshipTitle ||
              (application as any).title ||
              "Internship Details"}
          </h1>
          <p className="text-muted-foreground">
            {company?.name ||
              (application as any).companyName ||
              "Company Name"}
          </p>
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
                    (internship?.status ||
                      (application as any).internshipStatus) === "OPEN"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }
                >
                  {internship?.status ||
                    (application as any).internshipStatus ||
                    "N/A"}
                </Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 whitespace-pre-wrap leading-relaxed">
                {internship?.description ||
                  (application as any).internshipDescription ||
                  (application as any).description ||
                  "No description available."}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3 min-w-[200px]">
              <Badge
                variant="outline"
                className={`${getStatusColor(
                  application.status,
                )} px-4 py-2 flex items-center gap-2 font-semibold text-sm shadow-sm border-2`}
              >
                {getStatusIcon(application.status)}
                {(application.status || "PENDING").toUpperCase()}
              </Badge>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg border border-border">
                <FileText className="w-4 h-4 text-primary" />
                <span>
                  Submitted CV:{" "}
                  <span className="text-foreground font-semibold">
                    {application.cvForm?.title ||
                      application.cv?.title ||
                      (application as any).cv_form?.title ||
                      (application as any).cvTitle ||
                      "Assessment CV"}
                  </span>
                </span>
              </div>
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
                  <p className="font-medium">
                    {company?.name || (application as any).companyName || "N/A"}
                  </p>
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
                  <p className="font-medium">
                    {company?.location ||
                      internship?.location ||
                      (application as any).location ||
                      "Yangon"}
                  </p>
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
                  <p className="font-medium">
                    {internship?.category ||
                      (application as any).category ||
                      (application as any).internshipCategory ||
                      "N/A"}
                  </p>
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
                  <p className="font-medium">
                    {internship?.slots ||
                      (application as any).slots ||
                      (application as any).internshipSlots ||
                      0}{" "}
                    Positions
                  </p>
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
                    {internship?.deadline ||
                    (application as any).deadline ||
                    (application as any).internshipDeadline
                      ? new Date(
                          internship?.deadline ||
                            (application as any).deadline ||
                            (application as any).internshipDeadline,
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Applied On
                  </p>
                  <p className="font-medium">
                    {application.appliedAt || (application as any).applied_at
                      ? new Date(
                          application.appliedAt ||
                            (application as any).applied_at,
                        ).toLocaleDateString()
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
            {parseRequirements(
              internship?.requirements ||
                (application as any).requirements ||
                (application as any).internshipRequirements,
            ).map((req, index) => (
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
            <h3 className="font-bold text-lg">
              {company?.name || (application as any).companyName}
            </h3>
            <p className="text-muted-foreground">
              {company?.description ||
                (internship as any)?.companyDescription ||
                (application as any).companyDescription ||
                "No company information provided."}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
