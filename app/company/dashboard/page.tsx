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
  Badge,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useCompanyDashboard } from "@/hooks/CompanyHook/useCompanyDashboard";
import { useRouter } from "next/navigation";

export default function CompanyDashboard() {
  const { data, isLoading, error } = useCompanyDashboard();
  console.log("data", data);
  console.log(data);
  const router = useRouter();

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

  const getStatusBadge = (status: string) => {
    const s = status.toUpperCase();
    const badgeClass =
      s === "APPROVED"
        ? "bg-green-500 text-white"
        : s === "PENDING"
        ? "bg-yellow-500 text-white"
        : s === "INTERVIEWING"
        ? "bg-blue-500 text-white"
        : s === "REJECTED"
        ? "bg-red-500 text-white"
        : "bg-gray-500 text-white";

    return <span className={`px-2 py-1 rounded text-xs font-semibold ${badgeClass}`}>{status}</span>;
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-6 border border-border rounded-2xl">
                  <div className="space-y-3">
                    <div className="h-5 bg-secondary rounded animate-shimmer"></div>
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
                    label: "Active Postings",
                    value: data?.activePostings,
                    color: "from-blue-500/20",
                    textColor: "text-blue-600",
                  },
                  {
                    icon: Clock,
                    label: "New Applications",
                    value: data?.newApplicationsCount,
                    color: "from-emerald-500/20",
                    textColor: "text-emerald-600",
                  },
                  {
                    icon: FileText,
                    label: "Reports Awaiting Evaluation",
                    value: data?.pendingEvaluationsCount,
                    color: "from-amber-500/20",
                    textColor: "text-amber-600",
                  },
                  {
                    icon: UserCheck,
                    label: "Active Internships",
                    value: data?.activeInternsCount,
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Table Section */}
          <div className="lg:col-span-3">
            <Card className="bg-zinc-900 border-zinc-800 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800 pb-6">
                <div>
                  <CardTitle className="text-xl font-bold text-white">Recent Applications</CardTitle>
                  <p className="text-sm text-zinc-500 mt-1">Review your most recent candidate submissions.</p>
                </div>
                <Link href="/company/applications">
                  <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800 gap-2">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-zinc-950/50">
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                      <TableHead className="text-zinc-400">Application ID</TableHead>
                      <TableHead className="text-zinc-400">Applied Date</TableHead>
                      <TableHead className="text-zinc-400">Status</TableHead>
                      <TableHead className="text-zinc-400">CV</TableHead>
                      <TableHead className="text-right text-zinc-400">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(data?.recentApplications ?? []).length > 0 ? (
                      data?.recentApplications.map((app: any) => (
                        <TableRow key={app.id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                          <TableCell className="font-medium text-zinc-200">#{app.id}</TableCell>
                          <TableCell className="text-zinc-400 text-xs">
                            {new Date(app.appliedAt).toLocaleDateString(undefined, {
                              month: 'short', day: 'numeric', year: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell>
                            <a href={app.presignedCvUrl} target="_blank" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs">
                              <FileText className="w-3 h-3" /> CV Link
                            </a>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-indigo-400 hover:text-white hover:bg-indigo-600 transition-all gap-2"
                              onClick={() => router.push(`/company/applications/${app.id}`)}
                            >
                              <Eye className="w-4 h-4" /> Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                          No recent applications found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Management</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Manage Postings", icon: Briefcase, href: "/company/manage-internships" },
                { label: "Evaluate Reports", icon: MessageSquare, href: "/company/applications" },
                { label: "Company Profile", icon: Users, href: "/company/profile" },
              ].map((action, i) => (
                <Link key={i} href={action.href}>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-zinc-800 bg-zinc-900/50 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all group h-12"
                  >
                    <action.icon className="w-4 h-4 mr-3 text-zinc-500 group-hover:text-white" />
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
            
            <div className="p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-400 uppercase">Hiring Tip</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Applications with a &quot;Pending&quot; status for more than 3 days usually see a 40% higher candidate drop-off. Review them today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
