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
    // duration: '',
    deadline: '',
    description: '',
    requirements: '',
    slots: ''
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
                className="bg-background border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-foreground">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="bg-background border-border">
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
              <Label htmlFor="duration" className="text-sm font-medium text-foreground">Slots</Label>
              <Input
                id="slots"
                placeholder="e.g., 3"
                value={formData.slots}
                onChange={(e) => handleInputChange('slots', e.target.value)}
              className="bg-background border-border"
              type='number'
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-medium text-foreground">Application Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                className="bg-background border-border"
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
                className="bg-background border-border min-h-32"
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
                className="bg-background border-border min-h-32"
                required
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button className="bg-primary hover:bg-primary/90">
            Publish Internship
          </Button>
        </div>
      </form>
    </div>
  )
}
