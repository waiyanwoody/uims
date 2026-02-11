'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Download } from 'lucide-react'

export default function MyApplications() {
  const applications = [
    {
      id: 1,
      internship: 'Frontend Developer Internship',
      company: 'Tech Corp',
      appliedDate: '2024-02-10',
      status: 'approved',
      deadline: '2024-03-15',
      cv: 'John_Doe_CV_2024.pdf'
    },
    {
      id: 2,
      internship: 'Data Science Internship',
      company: 'Data Solutions Inc.',
      appliedDate: '2024-02-08',
      status: 'pending',
      deadline: '2024-02-28',
      cv: 'John_Doe_CV_2024.pdf'
    },
    {
      id: 3,
      internship: 'UX Design Internship',
      company: 'Design Studio',
      appliedDate: '2024-02-05',
      status: 'rejected',
      deadline: '2024-02-20',
      cv: 'John_Doe_CV_Tech.pdf'
    },
    {
      id: 4,
      internship: 'Backend Developer Internship',
      company: 'CloudTech',
      appliedDate: '2024-02-03',
      status: 'approved',
      deadline: '2024-03-10',
      cv: 'John_Doe_CV_2024.pdf'
    },
    {
      id: 5,
      internship: 'Product Manager Internship',
      company: 'InnovateCo',
      appliedDate: '2024-01-28',
      status: 'pending',
      deadline: '2024-03-05',
      cv: 'John_Doe_CV_2024.pdf'
    }
  ]

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

  const filterByStatus = (statusFilter: string) => {
    if (statusFilter === 'all') return applications
    return applications.filter(app => app.status === statusFilter)
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground mt-2">Track all your internship applications in one place</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-secondary/50 border border-border">
          <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({applications.filter(a => a.status === 'approved').length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({applications.filter(a => a.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({applications.filter(a => a.status === 'rejected').length})</TabsTrigger>
        </TabsList>

        {['all', 'approved', 'pending', 'rejected'].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-4 mt-6">
            {filterByStatus(tabValue).length > 0 ? (
              <div className="space-y-4">
                {filterByStatus(tabValue).map((app) => (
                  <Card
                    key={app.id}
                    className="p-6 border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="grid md:grid-cols-5 gap-6 items-start">
                      {/* Application Info */}
                      <div className="md:col-span-2 space-y-2">
                        <h3 className="font-semibold text-foreground text-lg">
                          {app.internship}
                        </h3>
                        <p className="text-sm text-accent font-medium">{app.company}</p>
                        <p className="text-xs text-muted-foreground">
                          Applied on {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Deadline */}
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Deadline</p>
                        <p className="text-sm font-semibold text-foreground">
                          {new Date(app.deadline).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">Status</p>
                        <Badge className={getStatusColor(app.status)}>
                          {getStatusLabel(app.status)}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 md:flex-row">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border hover:bg-secondary gap-1 bg-transparent"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">CV</span>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 gap-1"
                        >
                          <span>View</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Submitted CV Info */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Submitted CV: <span className="font-medium text-foreground">{app.cv}</span>
                      </p>
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
