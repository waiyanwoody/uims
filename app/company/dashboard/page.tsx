"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Clock,
  Zap,
  Target,
  Plus,
  User,
  Star,
  Loader,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useCompanyDashboard } from "@/hooks/CompanyHook/useCompanyDashboard";

export default function CompanyDashboard() {
  const { data, isLoading, error } = useCompanyDashboard();
  console.log(data);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "pending":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "reviewing":
        return "bg-amber-50 border-amber-200 text-amber-700";
      default:
        return "bg-secondary border-border text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/20 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Company Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your internship and candidates
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="p-6 border border-border rounded-2xl">
                  <div className="space-y-3">
                    <div className="h-5 bg-secondary rounded animate-shimmer"></div>
                    <div className="h-8 bg-secondary rounded animate-shimmer"></div>
                  </div>
                </Card>
              ))
            ) : (
              <>
                {/* Total Internships */}
                {[
                  {
                    icon: Briefcase,
                    label: "Active Interns",
                    value: data?.activeInterns,
                    color: "from-blue-500/20",
                    textColor: "text-blue-600",
                  },
                  {
                    icon: Clock,
                    label: "Pending Applications",
                    value: data?.pendingApplications,
                    color: "from-emerald-500/20",
                    textColor: "text-emerald-600",
                  },
                  {
                    icon: FileText,
                    label: "Reports Awaiting Evaluation",
                    value: data?.reportsAwaitingEvaluation,
                    color: "from-amber-500/20",
                    textColor: "text-amber-600",
                  },
                  {
                    icon: Users,
                    label: "Total Applications",
                    value: data?.totalApplications,
                    color: "from-red-500/20",
                    textColor: "text-red-600",
                  },
                  {
                    icon: UserCheck,
                    label: "Total Internships",
                    value: data?.totalInternships,
                    color: "from-purple-500/20",
                    textColor: "text-purple-600",
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
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Applications */}
            <Card className="p-6 border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Applications
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Latest submissions from candidates
                  </p>
                </div>
                <Link href="/company/applications">
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
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Actions
            </p>
            <div className="space-y-2">
              <Link href="/company/manage-internships">
                <Button
                  variant="outline"
                  className="w-full justify-start border-border hover:bg-primary/5 bg-transparent"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Internships
                </Button>
              </Link>
              <Link href="/company/applications">
                <Button
                  variant="outline"
                  className="w-full justify-start border-border hover:bg-primary/5 bg-transparent"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Review Applications
                </Button>
              </Link>
              <Link href="/company/profile">
                <Button
                  variant="outline"
                  className="w-full justify-start border-border hover:bg-primary/5 bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Company Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
