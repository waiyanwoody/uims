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
  Clock,
  Zap,
  BookOpen,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useSupervisorDashboard } from "@/hooks/SupervisorHook/useSupervisorDashboard"; // Adjust path as needed

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
  const { data, isLoading } = useSupervisorDashboard();

  // Keep existing UI structures, but map values from 'data'
  const stats = [
    {
      icon: Users,
      label: "Total Students",
      value: data?.totalStudents || 0,
      href: "/supervisor/students",
      color: "from-blue-500/20",
      textColor: "text-blue-600",
    },
    {
      icon: Briefcase,
      label: "In Internships",
      value: data?.studentsInInternship || 0,
      href: "/supervisor/monitoring",
      color: "from-emerald-500/20",
      textColor: "text-emerald-600",
    },
    {
      icon: Building2,
      label: "Partner Companies",
      value: data?.uniqueCompaniesCount || 0,
      href: "/supervisor/students",
      color: "from-purple-500/20",
      textColor: "text-purple-600",
    },
    {
      icon: AlertCircle,
      label: "Pending Grading",
      value: data?.pendingGradingCount || 0,
      href: "/supervisor/monitoring",
      color: "from-amber-500/20",
      textColor: "text-amber-600",
    },
  ];

  // Fallback data for UI sections not yet provided by the API summary
  const dashboardData = {
    students: [
      { id: "1", name: "John Doe", startDate: "2024-01-15", internship: "Software Engineer", company: "Tech Corp", progress: 75, status: "active" },
      { id: "2", name: "Jane Smith", startDate: "2024-02-01", internship: "Data Analyst", company: "Data Inc", progress: 40, status: "active" },
      { id: "3", name: "Alice Johnson", startDate: "2024-01-20", internship: "Product Manager", company: "Product Co", progress: 90, status: "completing" },
    ],
    departments: [
      { dept: "Computer Science", active: 5, total: 10, completed: 3 },
      { dept: "Information Technology", active: 3, total: 8, completed: 2 },
    ],
    pendingActions: [
      { action: "Review Pending Grades", priority: "high", href: "/supervisor/monitoring" },
      { action: "Approve Internship Proposal", priority: "medium", href: "/supervisor/approvals" },
    ],
  };

  const topStudents = dashboardData.students.slice(0, 3);
  const departments = dashboardData.departments;
  const topCompanies = [{ name: "Tech Corp", students: 12 }, { name: "Data Inc", students: 8 }];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/20 text-blue-700 dark:text-blue-400";
      case "completing": return "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/20 text-emerald-700 dark:text-emerald-400";
      default: return "bg-secondary border-border text-foreground";
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name || "Supervisor"}
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
                      <div className="h-5 bg-secondary rounded animate-pulse"></div>
                      <div className="h-8 bg-secondary rounded animate-pulse"></div>
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
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-border animate-slideInLeft">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Top Students Progress</h2>
                </div>
                <Link href="/supervisor/students">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
                    View All <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {topStudents.map((student, idx) => (
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
                          <h3 className="font-bold text-foreground truncate">{student.name}</h3>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm font-medium text-foreground/80">
                           <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-primary" /> {student.internship}</div>
                           <div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-accent" /> {student.company}</div>
                        </div>
                        <div className="mt-4 space-y-1.5">
                          <div className="w-full h-1.5 bg-background/50 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${student.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-border bg-card animate-slideInLeft">
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" /> Department Performance
              </h3>
              <div className="space-y-4">
                {departments.map((dept, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-secondary/10">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-bold">{dept.dept}</p>
                        <p className="text-[10px] text-muted-foreground">{dept.active} Active</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="text-xs font-bold">{dept.total} Total</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 border-border bg-card animate-slideInRight">
              <h3 className="text-lg font-bold text-foreground mb-4">Pending Actions</h3>
              <div className="space-y-2">
                {dashboardData.pendingActions.map((item, idx) => (
                  <Link key={idx} href={item.href}>
                    <div className="p-3 mb-2 rounded-lg border border-amber-200 dark:border-0 bg-amber-50/50 dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:shadow-md transition-all flex items-center justify-between">
                      <span className="text-sm font-medium">{item.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}