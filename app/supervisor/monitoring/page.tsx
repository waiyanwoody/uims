import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function InternshipMonitoring() {
  const internships = [
    {
      id: 1,
      student: 'Sarah Johnson',
      company: 'Tech Corp',
      position: 'Frontend Developer',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      progress: 75,
      status: 'On Track'
    },
    {
      id: 2,
      student: 'Michael Chen',
      company: 'CloudTech',
      position: 'Backend Developer',
      startDate: '2024-01-20',
      endDate: '2024-04-20',
      progress: 60,
      status: 'On Track'
    },
    {
      id: 3,
      student: 'James Wilson',
      company: 'Tech Corp',
      position: 'Frontend Developer',
      startDate: '2024-01-10',
      endDate: '2024-04-10',
      progress: 45,
      status: 'Needs Attention'
    },
    {
      id: 4,
      student: 'David Martinez',
      company: 'CloudTech',
      position: 'DevOps Engineer',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      progress: 30,
      status: 'On Track'
    }
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Internship Monitoring</h1>
        <p className="text-muted-foreground mt-2">Track student progress and internship status</p>
      </div>

      <div className="space-y-4">
        {internships.map((internship) => (
          <Card key={internship.id} className="p-6 border border-border hover:shadow-md">
            <div className="grid md:grid-cols-6 gap-6 items-center">
              <div>
                <p className="font-semibold text-foreground">{internship.student}</p>
                <p className="text-sm text-accent font-medium">{internship.position}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Company</p>
                <p className="font-medium text-foreground">{internship.company}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm text-foreground">
                  {new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Progress</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div
                      className="bg-accent rounded-full h-2"
                      style={{ width: `${internship.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium">{internship.progress}%</span>
                </div>
              </div>
              <div>
                {internship.status === 'On Track'
                  ? <Badge className="bg-emerald-100 text-emerald-800 gap-1"><CheckCircle className="w-3 h-3" />On Track</Badge>
                  : <Badge className="bg-yellow-100 text-yellow-800 gap-1"><AlertCircle className="w-3 h-3" />Needs Attention</Badge>
                }
              </div>
              <div className="text-right">
                <Button variant="ghost" size="sm">Provide Feedback</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
