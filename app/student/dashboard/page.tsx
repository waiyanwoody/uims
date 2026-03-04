"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Briefcase,
  ArrowRight,
  Target,
  Zap,
  Sparkles,
  Loader,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  ApplicationSummary,
  useStudentDashboard,
} from "@/hooks/StudentHook/useStudentDashboard";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: dashboardData, isLoading } = useStudentDashboard();

  const applicationStats: ApplicationSummary =
    dashboardData?.applicationSummary || {
      TOTAL: 0,
      INTERVIEWING: 0,
      PENDING: 0,
      APPROVED: 0,
      REJECTED: 0,
    };

  const recentApplications: any[] = dashboardData?.latestApplications || [];
  const reviews: any[] = dashboardData?.reviews || [];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "interviewing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-secondary text-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      case "interviewing":
        return <Calendar className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/20 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Welcome back, {user?.name || "Student"}
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your internship journey in real-time
            </p>
          </div>

          {/* Abstract Stats - Creative Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="p-6 border border-border">
                    <div className="space-y-3">
                      <div className="h-5 bg-secondary rounded animate-shimmer"></div>
                      <div className="h-8 bg-secondary rounded animate-shimmer"></div>
                    </div>
                  </Card>
                ))
              : [
                  {
                    icon: Briefcase,
                    label: "My Applications",
                    value: applicationStats.TOTAL,
                    color: "from-blue-500/20",
                    textColor: "text-blue-600",
                  },
                  {
                    icon: CheckCircle,
                    label: "Approved Applications",
                    value: applicationStats.APPROVED,
                    color: "from-emerald-500/20",
                    textColor: "text-emerald-600",
                  },
                  {
                    icon: Clock,
                    label: "Pending Applications",
                    value: applicationStats.PENDING,
                    color: "from-amber-500/20",
                    textColor: "text-amber-600",
                  },
                  {
                    icon: AlertCircle,
                    label: "Interviewing Applications",
                    value: applicationStats.INTERVIEWING,
                    color: "from-red-500/20",
                    textColor: "text-red-600",
                  },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card
                      key={index}
                      className={`relative p-6 border border-border hover:border-primary/40 transition-all duration-300 bg-gradient-to-br ${stat.color} to-transparent overflow-hidden group animate-slideInUp`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <Icon className={`w-5 h-5 ${stat.textColor}`} />
                          <TrendingUp className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                          {stat.label}
                        </p>
                        <h3 className="text-4xl font-bold text-foreground mt-2">
                          {stat.value}
                        </h3>
                      </div>
                    </Card>
                  );
                })}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Applications Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applications Stream */}
            <Card className="p-6 border-border animate-slideInLeft">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Last 3 Applications
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your recent application timeline
                  </p>
                </div>
                <Link href="/student/applications">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/5"
                  >
                    View All
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-lg bg-secondary animate-shimmer"
                      ></div>
                    ))
                  : recentApplications.map((app, index) => (
                      <Link
                        key={app.id}
                        href={`/student/applications/${app.id}`}
                        className="block w-full"
                      >
                        <div
                          className={`group p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md cursor-pointer animate-slideInUp ${getStatusColor(
                            app.status,
                          )}`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              {getStatusIcon(app.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="font-bold text-foreground">
                                    {app.internship?.company?.name ||
                                      "Company Name"}
                                  </h3>
                                  <p className="text-sm font-medium text-foreground/80">
                                    {app.internship?.title ||
                                      "Internship Title"}
                                  </p>
                                </div>
                                <span className="text-xs font-semibold opacity-70  px-2 py-1 rounded">
                                  {app.appliedAt
                                    ? new Date(
                                        app.appliedAt,
                                      ).toLocaleDateString()
                                    : "Date"}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-foreground/60">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {app.internship?.company?.location ||
                                    "Location"}
                                </span>
                              </div>
                            </div>

                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 self-center" />
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Review Feedback Widget */}
            <Card className="p-6 border-border animate-slideInRight">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                CV Form
              </h3>
              <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-14 bg-secondary rounded animate-shimmer"
                    ></div>
                  ))
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {dashboardData?.cvUploaded ? (
                      /* Success State: Clean, subtle, and reassuring */
                      <div className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-5 dark:bg-emerald-950/10">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                            <CheckCircle className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-emerald-900 dark:text-emerald-400">
                              CV Verified
                            </h3>
                            <p className="text-sm text-emerald-700/80 dark:text-emerald-500/80">
                              Your profile is complete and ready for
                              applications.
                            </p>
                          </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -right-4 -top-4 h-16 w-16 rotate-12 bg-emerald-500/5 transition-transform group-hover:scale-110" />
                      </div>
                    ) : (
                      /* Empty/Warning State: Encouraging and Action-Oriented */
                      <div className="rounded-xl border border-dashed border-muted-foreground/20 bg-card p-8 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-900/20">
                          <AlertCircle className="h-7 w-7" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold tracking-tight">
                          Boost your chances!
                        </h3>
                        <p className="mx-auto max-w-[280px] text-sm text-muted-foreground mb-6">
                          No CV uploaded yet. Upload your resume to unlock
                          personalized feedback and start applying.
                        </p>
                        <Link href="/student/cvs">
                          <Button className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload CV Now
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Access */}
            <div className="space-y-2 animate-slideInRight">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Access
              </p>
              <div className="space-y-2">
                <Link href="/student/browse">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-primary/5 bg-transparent animate-slideInUp"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Browse Internships
                  </Button>
                </Link>
                <Link href="/student/expertise">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-primary/5 bg-transparent"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    My Expertise
                  </Button>
                </Link>
                <Link href="/student/cvs">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-primary/5 bg-transparent"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Manage CVs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
