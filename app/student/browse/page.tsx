'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react'

export default function BrowseInternships() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['All', 'Engineering', 'Design', 'Business', 'Marketing', 'Data Science']

  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Internship',
      company: 'Tech Corp',
      category: 'Engineering',
      location: 'San Francisco, CA',
      duration: '3 months',
      stipend: '$5,000/month',
      deadline: '2024-03-15',
      status: 'OPEN',
      description: 'We are looking for talented frontend developers to join our team.',
      requirements: ['React', 'TypeScript', 'Tailwind CSS']
    },
    {
      id: 2,
      title: 'Data Science Internship',
      company: 'Data Solutions Inc.',
      category: 'Data Science',
      location: 'New York, NY',
      duration: '4 months',
      stipend: '$6,000/month',
      deadline: '2024-02-28',
      status: 'OPEN',
      description: 'Join our data science team and work on real-world projects.',
      requirements: ['Python', 'Machine Learning', 'SQL']
    },
    {
      id: 3,
      title: 'UX Design Internship',
      company: 'Design Studio',
      category: 'Design',
      location: 'Los Angeles, CA',
      duration: '3 months',
      stipend: '$4,500/month',
      deadline: '2024-02-20',
      status: 'CLOSED',
      description: 'Create beautiful and functional user experiences.',
      requirements: ['Figma', 'UI/UX', 'Prototyping']
    },
    {
      id: 4,
      title: 'Backend Developer Internship',
      company: 'CloudTech',
      category: 'Engineering',
      location: 'Seattle, WA',
      duration: '4 months',
      stipend: '$5,500/month',
      deadline: '2024-03-10',
      status: 'OPEN',
      description: 'Build scalable backend systems using modern technologies.',
      requirements: ['Node.js', 'PostgreSQL', 'Docker']
    },
    {
      id: 5,
      title: 'Product Manager Internship',
      company: 'InnovateCo',
      category: 'Business',
      location: 'Boston, MA',
      duration: '3 months',
      stipend: '$5,000/month',
      deadline: '2024-03-05',
      status: 'OPEN',
      description: 'Help shape the future of our product strategy.',
      requirements: ['Communication', 'Analytics', 'Leadership']
    },
    {
      id: 6,
      title: 'Marketing Specialist Internship',
      company: 'Brand Agency',
      category: 'Marketing',
      location: 'Chicago, IL',
      duration: '2 months',
      stipend: '$3,500/month',
      deadline: '2024-03-20',
      status: 'PENDING',
      description: 'Execute marketing campaigns and support brand development.',
      requirements: ['Social Media', 'Content Creation', 'Analytics']
    }
  ]

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           internship.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-emerald-100 text-emerald-800'
      case 'CLOSED':
        return 'bg-red-100 text-red-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Browse Internships</h1>
        <p className="text-muted-foreground mt-2">Find and apply to internship opportunities</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category.toLowerCase() ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={selectedCategory === category.toLowerCase() 
                ? 'bg-primary hover:bg-primary/90' 
                : 'border-border hover:bg-secondary'}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredInternships.length} internships
      </div>

      {/* Internship Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((internship) => (
          <Card
            key={internship.id}
            className="p-6 border border-border hover:shadow-lg hover:border-accent/50 transition-all duration-300 flex flex-col h-full"
          >
            <div className="space-y-4 flex-1">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {internship.title}
                  </h3>
                  <Badge className={getStatusColor(internship.status)}>
                    {internship.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-accent">{internship.company}</p>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {internship.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {internship.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  {internship.stipend}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {internship.description}
              </p>

              {/* Requirements */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-foreground">Key Requirements:</p>
                <div className="flex flex-wrap gap-1">
                  {internship.requirements.slice(0, 2).map((req, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-xs bg-secondary/70 text-foreground"
                    >
                      {req}
                    </Badge>
                  ))}
                  {internship.requirements.length > 2 && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-secondary/70 text-foreground"
                    >
                      +{internship.requirements.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Deadline */}
              <p className="text-xs text-muted-foreground">
                Deadline: {new Date(internship.deadline).toLocaleDateString()}
              </p>
            </div>

            {/* Apply Button */}
            <Button
              className="w-full mt-6 bg-primary hover:bg-primary/90"
              disabled={internship.status === 'CLOSED'}
            >
              {internship.status === 'CLOSED' ? 'Applications Closed' : 'Apply Now'}
            </Button>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredInternships.length === 0 && (
        <Card className="p-12 border border-border text-center">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No internships found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </Card>
      )}
    </div>
  )
}
