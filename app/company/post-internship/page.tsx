'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function PostInternship() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    duration: '',
    stipend: '',
    deadline: '',
    description: '',
    requirements: '',
    responsibilities: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Post New Internship</h1>
        <p className="text-muted-foreground mt-2">Create and publish a new internship opportunity</p>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <Card className="p-8 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-foreground">Position Title</Label>
              <Input
                id="title"
                placeholder="e.g., Frontend Developer Internship"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="bg-secondary/50 border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-foreground">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-foreground">Location</Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-secondary/50 border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-foreground">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 3 months"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="bg-secondary/50 border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stipend" className="text-sm font-medium text-foreground">Stipend (Optional)</Label>
              <Input
                id="stipend"
                placeholder="e.g., $5,000/month"
                value={formData.stipend}
                onChange={(e) => handleInputChange('stipend', e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-medium text-foreground">Application Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                className="bg-secondary/50 border-border"
                required
              />
            </div>
          </div>
        </Card>

        {/* Description & Details */}
        <Card className="p-8 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Description & Details</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the internship role and what the student will work on..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-secondary/50 border-border min-h-32"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements" className="text-sm font-medium text-foreground">Required Skills & Qualifications</Label>
              <Textarea
                id="requirements"
                placeholder="List the required skills and qualifications (one per line)"
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                className="bg-secondary/50 border-border min-h-32"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibilities" className="text-sm font-medium text-foreground">Key Responsibilities</Label>
              <Textarea
                id="responsibilities"
                placeholder="Outline the main responsibilities (one per line)"
                value={formData.responsibilities}
                onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                className="bg-secondary/50 border-border min-h-32"
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-border bg-transparent">
            Save as Draft
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Publish Internship
          </Button>
        </div>
      </form>
    </div>
  )
}
