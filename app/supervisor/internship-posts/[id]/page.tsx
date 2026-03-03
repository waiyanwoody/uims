"use client";

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
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useInternshipDetails } from "@/hooks/StudentHook/useInternshipDetails";

export default function InternshipPostDetails() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { internship, loading, error } = useInternshipDetails(id);

  const parseRequirements = (requirements: string) => {
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
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{internship.title}</h1>
              <p className="text-muted-foreground">{internship.company.name}</p>
            </div>
            {(internship.company.contact_email ||
              internship.company.email ||
              internship.company.hrEmail) && (
              <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/20">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${
                    internship.company.contact_email ||
                    internship.company.email ||
                    internship.company.hrEmail
                  }`}
                  className="font-medium hover:underline"
                >
                  {internship.company.contact_email ||
                    internship.company.email ||
                    internship.company.hrEmail}
                </a>
              </div>
            )}
          </div>
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
                    {new Date(internship.createdAt).toLocaleDateString()}
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
            {parseRequirements(internship.requirements || "[]").map(
              (req: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="px-3 py-1">
                  {req}
                </Badge>
              ),
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
