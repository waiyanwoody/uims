'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, CheckCircle, XCircle } from 'lucide-react'

export default function CompanyApplications() {
  const applications = [
    {
      id: 1,
      student: 'Sarah Johnson',
      position: 'Frontend Developer',
      appliedDate: '2024-02-10',
      status: 'approved',
      email: 'sarah@university.edu',
      cv: 'Sarah_CV.pdf',
      rating: 4.5
    },
    {
      id: 2,
      student: 'Michael Chen',
      position: 'Backend Developer',
      appliedDate: '2024-02-08',
      status: 'pending',
      email: 'michael@university.edu',
      cv: 'Michael_CV.pdf',
      rating: 4
    },
    {
      id: 3,
      student: 'Emma Davis',
      position: 'Frontend Developer',
      appliedDate: '2024-02-05',
      status: 'rejected',
      email: 'emma@university.edu',
      cv: 'Emma_CV.pdf',
      rating: 3
    },
    {
      id: 4,
      student: 'James Wilson',
      position: 'Data Science',
      appliedDate: '2024-02-03',
      status: 'approved',
      email: 'james@university.edu',
      cv: 'James_CV.pdf',
      rating: 5
    }
  ]

  const filterByStatus = (statusFilter: string) => {
    if (statusFilter === 'all') return applications
    return applications.filter(app => app.status === statusFilter)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Review Applications</h1>
        <p className="text-muted-foreground mt-2">Review and manage student applications</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-secondary/50 border border-border">
          <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({applications.filter(a => a.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({applications.filter(a => a.status === 'approved').length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({applications.filter(a => a.status === 'rejected').length})</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'approved', 'rejected'].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-4 mt-6">
            {filterByStatus(tabValue).length > 0 ? (
              <div className="space-y-4">
                {filterByStatus(tabValue).map((app) => (
                  <Card
                    key={app.id}
                    className="p-6 border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="grid md:grid-cols-5 gap-6 items-start">
                      {/* Student Info */}
                      <div className="md:col-span-2 space-y-2">
                        <h3 className="font-semibold text-foreground text-lg">
                          {app.student}
                        </h3>
                        <p className="text-sm text-accent font-medium">{app.position}</p>
                        <p className="text-xs text-muted-foreground">{app.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Applied {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Rating</p>
                        <p className="text-2xl font-bold text-primary">{app.rating}</p>
                        <p className="text-xs text-muted-foreground">out of 5</p>
                      </div>

                      {/* Status */}
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Status</p>
                        <Badge className={getStatusColor(app.status)}>
                          {getStatusLabel(app.status)}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border hover:bg-secondary gap-1 bg-transparent"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">CV</span>
                        </Button>
                        {app.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span className="hidden sm:inline">Approve</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-destructive text-destructive hover:bg-destructive/10 gap-1 bg-transparent"
                            >
                              <XCircle className="w-4 h-4" />
                              <span className="hidden sm:inline">Reject</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 border border-border text-center">
                <p className="text-muted-foreground">No applications in this category</p>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
