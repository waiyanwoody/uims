'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  Loader
} from 'lucide-react'
import Link from 'next/link'
import { useStudentDashboard } from '@/lib/api-hooks'

export default function StudentDashboard() {
  const { data: dashboardData, isLoading } = useStudentDashboard()

  const applicationStats = dashboardData?.stats || {
    total: 12,
    approved: 3,
    pending: 5,
    rejected: 4
  }

  const recentApplications = dashboardData?.applications || []
  const upcomingDeadlines = dashboardData?.deadlines || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-secondary text-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'rejected':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/20 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Welcome back, John!</h1>
            <p className="text-muted-foreground mt-1">Track your internship journey in real-time</p>
          </div>

          {/* Abstract Stats - Creative Layout */}
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
              [
                { icon: Briefcase, label: 'Applications', value: applicationStats.total, color: 'from-blue-500/20', textColor: 'text-blue-600' },
                { icon: CheckCircle, label: 'Approved', value: applicationStats.approved, color: 'from-emerald-500/20', textColor: 'text-emerald-600' },
                { icon: Clock, label: 'Pending', value: applicationStats.pending, color: 'from-amber-500/20', textColor: 'text-amber-600' },
                { icon: AlertCircle, label: 'Rejected', value: applicationStats.rejected, color: 'from-red-500/20', textColor: 'text-red-600' }
              ].map((stat, index) => {
                const Icon = stat.icon
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
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                      <h3 className="text-4xl font-bold text-foreground mt-2">{stat.value}</h3>
                    </div>
                  </Card>
                )
              })
            )}
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
                  <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
                  <p className="text-xs text-muted-foreground mt-1">Your application timeline</p>
                </div>
                <Link href="/student/applications">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
                    View All
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-lg bg-secondary animate-shimmer"></div>
                  ))
                ) : (
                  recentApplications.map((app, index) => (
                    <div
                      key={app.id}
                      className={`group p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md cursor-pointer animate-slideInUp ${getStatusColor(app.status)}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(app.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-foreground">{app.company}</h3>
                            <span className="text-xs font-semibold opacity-70">{app.appliedDate}</span>
                          </div>
                          <p className="text-sm font-medium text-foreground/80">{app.position}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-foreground/60">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {app.location}
                            </span>
                            <span className="font-bold text-primary">{app.salary}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Suggested Next Steps */}
            <Card className="p-6 border-border bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-slideInLeft">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Recommendations
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Target, text: 'Apply to at least 3 more companies this week' },
                  { icon: Zap, text: 'Update your profile skills section (60% complete)' },
                  { icon: Calendar, text: 'Set reminders for upcoming application deadlines' }
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors animate-slideInUp" style={{ animationDelay: `${idx * 50}ms` }}>
                      <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Deadline Widget */}
            <Card className="p-6 border-border animate-slideInRight">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Deadlines
              </h3>
              <div className="space-y-2">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-14 bg-secondary rounded animate-shimmer"></div>
                  ))
                ) : (
                  upcomingDeadlines.map((deadline, index) => {
                    const isUrgent = deadline.status === 'urgent'
                    const colors = isUrgent 
                      ? 'from-red-500/20 to-transparent border-red-200' 
                      : deadline.status === 'upcoming'
                      ? 'from-amber-500/20 to-transparent border-amber-200'
                      : 'from-emerald-500/20 to-transparent border-emerald-200'
                    
                  return (
                    <div key={index} className={`p-3 rounded-lg bg-gradient-to-r ${colors} border transition-all hover:shadow-md animate-slideInRight`} style={{ animationDelay: `${index * 50}ms` }}>
                        <p className="font-semibold text-foreground text-sm">{deadline.company}</p>
                        <p className={`text-xs mt-1 font-medium ${
                          isUrgent ? 'text-red-600' :
                          deadline.status === 'upcoming' ? 'text-amber-600' :
                          'text-emerald-600'
                        }`}>
                          {deadline.deadline}
                      </p>
                    </div>
                    )
                  })
                )}
              </div>
            </Card>

            {/* Profile Score Card */}
            <Card className="p-6 border-border bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 animate-slideInRight">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Profile Score
              </h3>
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="text-4xl font-bold text-blue-600">65%</div>
                  <p className="text-xs text-muted-foreground mt-1">8/10 sections complete</p>
                </div>
                <div className="w-full h-3 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                </div>
                <Link href="/student/profile">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary/90 text-white">
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Quick Access */}
            <div className="space-y-2 animate-slideInRight">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Access</p>
              <div className="space-y-2">
                <Link href="/student/browse">
                  <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/5 bg-transparent animate-slideInUp">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Browse Internships
                  </Button>
                </Link>
                <Link href="/student/expertise">
                  <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/5 bg-transparent">
                    <Target className="w-4 h-4 mr-2" />
                    My Expertise
                  </Button>
                </Link>
                <Link href="/student/cvs">
                  <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/5 bg-transparent">
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
  )
}
