"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Clock,
  Zap,
  BookOpen,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { useSupervisorDashboard } from "@/lib/api-hooks";

function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <>{count}</>;
}

export default function SupervisorDashboard() {
  const { data: dashboardData, isLoading } = useSupervisorDashboard();

  const stats = dashboardData?.stats
    ? [
        {
          icon: Users,
          label: "Assigned Students",
          value: dashboardData.stats.assignedStudents,
          href: "/supervisor/students",
          color: "from-blue-500/20",
          textColor: "text-blue-600",
        },
        {
          icon: Briefcase,
          label: "Active Internships",
          value: dashboardData.stats.activeInternships,
          href: "/supervisor/monitoring",
          color: "from-emerald-500/20",
          textColor: "text-emerald-600",
        },
        {
          icon: CheckCircle,
          label: "Approved",
          value: dashboardData.stats.approved,
          href: "/supervisor/approvals",
          color: "from-purple-500/20",
          textColor: "text-purple-600",
        },
        {
          icon: AlertCircle,
          label: "Pending Approval",
          value: dashboardData.stats.pendingApproval,
          href: "/supervisor/approvals",
          color: "from-amber-500/20",
          textColor: "text-amber-600",
        },
      ]
    : [];

  const topStudents = [...(dashboardData?.students || [])]
    .filter((s) => s.progress < 100)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "completing":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "pending":
        return "bg-amber-50 border-amber-200 text-amber-700";
      default:
        return "bg-secondary border-border text-foreground";
    }
  };

  const getDepartmentStats = dashboardData?.departments || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/20 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Supervisor Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor student internships and progress
            </p>
          </div>

          {/* Stats Grid */}
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
              : stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Link href={stat.href} key={index}>
                      <Card
                        className={`relative p-6 border border-border hover:border-primary/40 transition-all duration-300 bg-gradient-to-br ${stat.color} to-transparent overflow-hidden group cursor-pointer animate-slideInUp h-full`}
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
                            <CountUp end={stat.value} />
                          </h3>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Students List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Students Progress */}
            <Card className="p-6 border-border animate-slideInLeft">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Top Students Progress
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Top 3 students with highest progress (excluding completed)
                  </p>
                </div>
                <Link href="/supervisor/students">
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
                        className="p-4 rounded-lg bg-secondary animate-shimmer h-24"
                      ></div>
                    ))
                  : topStudents.map((student, idx) => (
                      <div
                        key={student.id}
                        className={`group p-4 rounded-lg border-2 transition-all hover:shadow-md cursor-pointer animate-slideInUp ${getStatusColor(student.status)}`}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                            {student.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-foreground">
                                {student.name}
                              </h3>
                              <span className="text-xs font-semibold opacity-70">
                                {student.startDate}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-foreground/80">
                              {student.internship} • {student.company}
                            </p>

                            {/* Progress Bar */}
                            <div className="mt-2 space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-foreground/60">
                                  Progress
                                </span>
                                <span className="font-semibold text-primary">
                                  {student.progress}%
                                </span>
                              </div>
                              <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                      </div>
                    ))}
              </div>
            </Card>

            {/* Department Overview */}
            <Card className="p-6 border-border bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-slideInLeft">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Department Overview
              </h3>
              <div className="space-y-3">
                {getDepartmentStats.map((dept, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors animate-slideInUp"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-foreground text-sm">
                        {dept.dept}
                      </p>
                      <span className="text-xs font-bold text-primary">
                        {dept.total} students
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <div className="flex-1">
                        <p className="text-muted-foreground mb-1">Active</p>
                        <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${(dept.active / dept.total) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-muted-foreground mb-1">Completed</p>
                        <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500"
                            style={{
                              width: `${(dept.completed / dept.total) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Performance Summary */}
            <Card className="p-6 border-border bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 animate-slideInRight">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Performance
              </h3>
              <div className="space-y-3">
                {[
                  {
                    metric: "Avg Performance",
                    value: "8.5/10",
                    color: "text-emerald-600",
                  },
                  {
                    metric: "Completion Rate",
                    value: "87%",
                    color: "text-blue-600",
                  },
                  {
                    metric: "Satisfaction",
                    value: "92%",
                    color: "text-purple-600",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 bg-white/50 rounded-lg animate-slideInRight"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <p className="text-sm text-foreground">{item.metric}</p>
                    <p className={`font-bold text-lg ${item.color}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pending Actions */}
            <Card className="p-6 border-border animate-slideInRight">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Pending Actions
              </h3>
              <div className="space-y-2">
                {[
                  {
                    action: "Review 2 new internships",
                    priority: "high",
                    icon: AlertCircle,
                  },
                  {
                    action: "Approve 1 application",
                    priority: "medium",
                    icon: CheckCircle,
                  },
                  {
                    action: "Follow-up with 3 students",
                    priority: "low",
                    icon: Users,
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const colors =
                    item.priority === "high"
                      ? "border-red-200 bg-red-50"
                      : item.priority === "medium"
                        ? "border-amber-200 bg-amber-50"
                        : "border-blue-200 bg-blue-50";

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border ${colors} hover:shadow-md transition-all animate-slideInUp`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">
                          {item.action}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Access */}
            <div className="space-y-2 animate-slideInRight">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Tools
              </p>
              <div className="space-y-2">
                <Link href="/supervisor/monitoring">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-primary/5 bg-transparent"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Monitoring
                  </Button>
                </Link>
                <Link href="/supervisor/approvals">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-primary/5 bg-transparent"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approvals
                  </Button>
                </Link>
                <Link href="/supervisor/students">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-primary/5 bg-transparent"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Student List
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
