'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  Loader
} from 'lucide-react'
import Link from 'next/link'
import { useCompanyDashboard } from '@/lib/api-hooks'

export default function CompanyDashboard() {
  const { data: dashboardData, isLoading } = useCompanyDashboard()

  const stats = dashboardData?.stats ? [
    {
      icon: Briefcase,
      label: 'Active Internships',
      value: dashboardData.stats.activeInternships.toString(),
      color: 'from-blue-500/20',
      textColor: 'text-blue-600'
    },
    {
      icon: Users,
      label: 'Total Applications',
      value: dashboardData.stats.totalApplications.toString(),
      color: 'from-emerald-500/20',
      textColor: 'text-emerald-600'
    },
    {
      icon: CheckCircle,
      label: 'Open Positions',
      value: dashboardData.stats.openPositions.toString(),
      color: 'from-purple-500/20',
      textColor: 'text-purple-600'
    },
    {
      icon: Clock,
      label: 'Pending Approvals',
      value: dashboardData.stats.pendingApprovals.toString(),
      color: 'from-amber-500/20',
      textColor: 'text-amber-600'
    }
  ] : []

  const recentApplications = dashboardData?.pipeline || []

  const openPositions = dashboardData?.openPositions || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700'
      case 'pending':
        return 'bg-blue-50 border-blue-200 text-blue-700'
      case 'reviewing':
        return 'bg-amber-50 border-amber-200 text-amber-700'
      default:
        return 'bg-secondary border-border text-foreground'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/20 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Tech Corp Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your internship pipeline and candidates</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-6 border border-border">
                  <div className="space-y-3">
                    <div className="h-5 bg-secondary rounded animate-shimmer"></div>
                    <div className="h-8 bg-secondary rounded animate-shimmer"></div>
                  </div>
                </Card>
              ))
            ) : (
              stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={index}
                    className={`relative p-6 border border-border hover:border-primary/40 transition-all duration-300 bg-gradient-to-br ${stat.color} to-transparent overflow-hidden group cursor-pointer animate-slideInUp`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <Icon className={`w-5 h-5 ${stat.textColor}`} />
                        <TrendingUp className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                      <h3 className="text-4xl font-bold text-foreground mt-2">{stat.value}</h3>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Applications Pipeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Applications */}
            <Card className="p-6 border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Applications Pipeline</h2>
                  <p className="text-xs text-muted-foreground mt-1">Latest submissions from candidates</p>
                </div>
                <Link href="/company/applications">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
                    View All
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className={`group p-4 rounded-lg border-2 transition-all hover:shadow-md cursor-pointer ${getStatusColor(app.status)}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                        {app.student.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-foreground">{app.student}</h3>
                          <span className="text-xs font-semibold opacity-70">{app.appliedDate}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground/80">{app.position}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-foreground/60">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {app.email}
                          </span>
                          <span className="flex items-center gap-1">
                            {Array.from({ length: app.stars }).map((_, i) => (
                              <span key={i} className="text-amber-500">★</span>
                            ))}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-background/50">
                          {app.status}
                        </span>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Metrics Overview */}
            <Card className="p-6 border-border bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Hiring Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Avg Response Time', value: '2.3 days', icon: Clock },
                  { label: 'Application Rate', value: '8.2/day', icon: TrendingUp },
                  { label: 'Conversion Rate', value: '23%', icon: CheckCircle },
                  { label: 'Time to Hire', value: '15 days', icon: Zap }
                ].map((metric, idx) => {
                  const Icon = metric.icon
                  return (
                    <div key={idx} className="p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-primary" />
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                      </div>
                      <p className="text-lg font-bold text-foreground">{metric.value}</p>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Open Positions */}
            <Card className="p-6 border-border">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Open Positions
              </h3>
              <div className="space-y-2">
                {openPositions.map((pos, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-transparent border border-blue-200 hover:shadow-md transition-all">
                    <p className="font-semibold text-foreground text-sm">{pos.title}</p>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-primary font-medium">{pos.applications} applications</span>
                      <span className="text-muted-foreground">Due {pos.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/company/post-internship">
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Position
                </Button>
              </Link>
            </Card>

            {/* Candidate Rating Card */}
            <Card className="p-6 border-border bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Top Candidates
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Sarah Johnson', score: 98, role: 'Frontend' },
                  { name: 'Emma Davis', score: 95, role: 'Product' },
                  { name: 'Alex Kumar', score: 92, role: 'Backend' }
                ].map((candidate, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{candidate.name}</p>
                      <p className="text-xs text-muted-foreground">{candidate.role}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {candidate.score}%
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</p>
              <div className="space-y-2">
                <Link href="/company/manage-internships">
                  <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/5 bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Manage Internships
                  </Button>
                </Link>
                <Link href="/company/applications">
                  <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/5 bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Review Applications
                  </Button>
                </Link>
                <Link href="/company/profile">
                  <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/5 bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Company Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
