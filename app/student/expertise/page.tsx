import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'

export default function MyExpertise() {
  const skills = [
    { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Figma'] }
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Expertise</h1>
        <p className="text-muted-foreground mt-2">Showcase your skills to attract companies</p>
      </div>

      <div className="space-y-6">
        {skills.map((skillGroup, index) => (
          <Card key={index} className="p-6 border border-border">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">{skillGroup.category}</h2>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-accent/10 text-accent border border-accent/30 px-3 py-2"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="border-border gap-2 bg-transparent">
                <Plus className="w-4 h-4" />
                Add Skill
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-border bg-transparent">Cancel</Button>
        <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
      </div>
    </div>
  )
}
