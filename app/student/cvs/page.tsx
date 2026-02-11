import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Edit, Trash2, Plus, FileText } from 'lucide-react'

export default function MyCVs() {
  const cvs = [
    {
      id: 1,
      name: 'John_Doe_CV_2024.pdf',
      uploadedDate: '2024-01-15',
      status: 'Active',
      downloads: 12
    },
    {
      id: 2,
      name: 'John_Doe_CV_Tech.pdf',
      uploadedDate: '2024-02-01',
      status: 'Archived',
      downloads: 3
    }
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My CVs</h1>
          <p className="text-muted-foreground mt-2">Manage your CV documents for applications</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Upload CV</span>
        </Button>
      </div>

      <div className="space-y-4">
        {cvs.map((cv) => (
          <Card key={cv.id} className="p-6 border border-border hover:shadow-md transition-shadow">
            <div className="grid md:grid-cols-5 gap-6 items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{cv.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Uploaded {new Date(cv.uploadedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div>
                <Badge className={cv.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}>
                  {cv.status}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">{cv.downloads} downloads</p>
              </div>

              <div></div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" className="border-border gap-1 bg-transparent">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
