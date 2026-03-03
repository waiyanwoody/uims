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
  Clock,
  Zap,
  BookOpen,
  Loader,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();

  // Hardcoded data
  const isLoading = false;
  const dashboardData = {
    stats: {
      assignedStudents: 12,
      activeInternships: 8,
      interviewing: 3,
      noInternship: 1,
    },
    students: [
      {
        id: "1",
        name: "John Doe",
        startDate: "2024-01-15",
        internship: "Software Engineer",
        company: "Tech Corp",
        progress: 75,
        status: "active",
      },
      {
        id: "2",
        name: "Jane Smith",
        startDate: "2024-02-01",
        internship: "Data Analyst",
        company: "Data Inc",
        progress: 40,
        status: "active",
      },
      {
        id: "3",
        name: "Alice Johnson",
        startDate: "2024-01-20",
        internship: "Product Manager",
        company: "Product Co",
        progress: 90,
        status: "completing",
      },
    ],
    departments: [
      { dept: "Computer Science", active: 5, total: 10, completed: 3 },
      { dept: "Information Technology", active: 3, total: 8, completed: 2 },
    ],
    pendingActions: [
      {
        action: "Approve Internship Proposal",
        priority: "high",
        href: "/supervisor/approvals",
      },
      {
        action: "Review Weekly Report",
        priority: "medium",
        href: "/supervisor/monitoring",
      },
    ],
  };

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
          icon: Clock,
          label: "Interviewing",
          value: dashboardData.stats.interviewing,
          href: "/supervisor/students",
          color: "from-purple-500/20",
          textColor: "text-purple-600",
        },
        {
          icon: AlertCircle,
          label: "No Internship",
          value: dashboardData.stats.noInternship,
          href: "/supervisor/students",
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
        return "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/20 text-blue-700 dark:text-blue-400";
      case "completing":
        return "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/20 text-emerald-700 dark:text-emerald-400";
      case "pending":
        return "bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/20 text-amber-700 dark:text-amber-400";
      default:
        return "bg-secondary border-border text-foreground";
    }
  };

  const departments = dashboardData?.departments || [];

  // Calculate top companies from active students
  const companyStats = (dashboardData?.students || []).reduce(
    (acc: Record<string, number>, student: any) => {
      acc[student.company] = (acc[student.company] || 0) + 1;
      return acc;
    },
    {},
  );

  const topCompanies = Object.entries(companyStats)
    .map(([name, count]) => ({ name, students: count }))
    .sort((a, b) => b.students - a.students)
    .slice(0, 5);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name || "Supervisor"}!
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
                        className="relative p-6 border border-border hover:border-primary/40 transition-all duration-300 bg-card overflow-hidden group cursor-pointer animate-slideInUp h-full"
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
                      <Link
                        key={student.id}
                        href={`/supervisor/students/${student.id}`}
                        className={`group block p-4 rounded-lg border-2 transition-all hover:shadow-md animate-slideInUp ${getStatusColor(student.status)}`}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold shadow-sm">
                            {student.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-foreground truncate">
                                {student.name}
                              </h3>
                              <span className="text-[10px] font-bold opacity-60 flex-shrink-0 uppercase tracking-tighter">
                                {student.startDate}
                              </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm font-medium text-foreground/80">
                              <div className="flex items-center gap-1.5 min-w-[140px]">
                                <Briefcase className="w-3.5 h-3.5 text-primary" />
                                <span className="truncate">
                                  {student.internship}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 align-middle">
                                <TrendingUp className="w-3.5 h-3.5 text-accent" />
                                <span className="truncate">
                                  {student.company}
                                </span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4 space-y-1.5">
                              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                                <span className="text-foreground/60">
                                  Current Progress
                                </span>
                                <span className="text-primary flex items-center gap-1">
                                  <Zap className="w-3 h-3 fill-primary" />
                                  {student.progress}%
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-background/50 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary via-primary to-accent rounded-full transition-all duration-700 ease-out"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="h-full flex items-center">
                            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0" />
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            </Card>

            {/* Departments Overview */}
            <Card className="p-6 border-border bg-card animate-slideInLeft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Department Performance
                </h3>
              </div>
              <div className="space-y-4">
                {departments.map((dept: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground leading-tight">
                          {dept.dept}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-medium">
                          {dept.active} Active Interns
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Users className="w-3 h-3 text-primary" />
                        <span className="text-xs font-bold text-foreground">
                          {dept.total} Total
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                        {dept.completed} Completed
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Partner Companies Highlights */}
            {topCompanies.length > 0 && (
              <Card className="p-6 border-border bg-card animate-slideInRight">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Top Partners
                </h3>
                <div className="space-y-3">
                  {topCompanies.map((company, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3 bg-white/40 dark:bg-white/5 rounded-lg border border-border/50 animate-slideInRight"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {company.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase">
                          {company.students} Active Students
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Card className="p-6 border-border bg-card animate-slideInRight">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Pending Actions
              </h3>
              <div className="space-y-2">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-secondary rounded animate-shimmer"
                    ></div>
                  ))
                ) : dashboardData!.pendingActions?.length > 0 ? (
                  dashboardData?.pendingActions.map((item, idx) => {
                    const colors =
                      item.priority === "high"
                        ? "border-red-200 dark:border-red-900/20 bg-red-50/50 dark:bg-red-900/10 hover:border-red-300 dark:hover:border-red-800"
                        : item.priority === "medium"
                          ? "border-amber-200 dark:border-amber-900/20 bg-amber-50/50 dark:bg-amber-900/10 hover:border-amber-300 dark:hover:border-amber-800"
                          : "border-blue-200 dark:border-blue-900/20 bg-blue-50/50 dark:bg-blue-900/10 hover:border-blue-300 dark:hover:border-blue-800";

                    const iconColor =
                      item.priority === "high"
                        ? "text-red-600 dark:text-red-400"
                        : item.priority === "medium"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-blue-600 dark:text-blue-400";

                    const Icon =
                      item.priority === "high"
                        ? AlertCircle
                        : item.priority === "medium"
                          ? CheckCircle
                          : Users;

                    return (
                      <Link key={idx} href={item.href}>
                        <div
                          className={`p-3 rounded-lg border ${colors} hover:shadow-md transition-all animate-slideInUp group cursor-pointer mb-2`}
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon
                                className={`w-4 h-4 flex-shrink-0 ${iconColor}`}
                              />
                              <span className="text-sm font-medium text-foreground">
                                {item.action}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground italic text-center py-4">
                    No pending actions
                  </p>
                )}
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
