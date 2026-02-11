'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash2, Eye, Plus } from 'lucide-react'
import Link from 'next/link'

export default function ManageInternships() {
  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Internship',
      category: 'Engineering',
      slots: 5,
      applications: 12,
      deadline: '2024-03-15',
      status: 'OPEN',
      applicants: '12 received, 3 approved'
    },
    {
      id: 2,
      title: 'Backend Developer Internship',
      category: 'Engineering',
      slots: 3,
      applications: 8,
      deadline: '2024-03-10',
      status: 'OPEN',
      applicants: '8 received, 2 approved'
    },
    {
      id: 3,
      title: 'Data Science Internship',
      category: 'Data Science',
      slots: 4,
      applications: 15,
      deadline: '2024-02-28',
      status: 'CLOSED',
      applicants: '15 received, 4 approved'
    },
    {
      id: 4,
      title: 'UI/UX Design Internship',
      category: 'Design',
      slots: 2,
      applications: 6,
      deadline: '2024-03-20',
      status: 'OPEN',
      applicants: '6 received, 1 approved'
    }
  ]

  const getStatusColor = (status: string) => {
    return status === 'OPEN' 
      ? 'bg-emerald-100 text-emerald-800' 
      : 'bg-red-100 text-red-800'
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Internships</h1>
          <p className="text-muted-foreground mt-2">View and edit your internship postings</p>
        </div>
        <Link href="/company/post-internship">
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Internship</span>
          </Button>
        </Link>
      </div>

      {/* Internships Table */}
      <Card className="border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="font-semibold text-foreground">Position</TableHead>
                <TableHead className="font-semibold text-foreground">Category</TableHead>
                <TableHead className="font-semibold text-foreground">Slots</TableHead>
                <TableHead className="font-semibold text-foreground">Applications</TableHead>
                <TableHead className="font-semibold text-foreground">Deadline</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internships.map((internship) => (
                <TableRow key={internship.id} className="border-border hover:bg-secondary/30 transition-colors">
                  <TableCell className="font-medium text-foreground">
                    <div className="space-y-1">
                      <p>{internship.title}</p>
                      <p className="text-xs text-muted-foreground">{internship.applicants}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{internship.category}</TableCell>
                  <TableCell className="text-foreground">{internship.slots}</TableCell>
                  <TableCell className="text-foreground font-medium">{internship.applications}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(internship.deadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(internship.status)}>
                      {internship.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
