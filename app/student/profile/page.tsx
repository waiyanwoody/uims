'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, X } from 'lucide-react'
import Image from 'next/image'

export default function StudentProfile() {
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'Tailwind CSS'])
  const [newSkill, setNewSkill] = useState('')
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@university.edu',
    major: 'Computer Science',
    bio: 'Passionate developer interested in full-stack development and cloud technologies.',
    address: '123 Main St, City, State 12345',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    dateOfBirth: '2002-05-15'
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your personal information and skills</p>
      </div>

      <form className="space-y-6">
        {/* Profile Picture Section */}
        <Card className="p-8 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center">
              <div className="text-4xl">👤</div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Upload a new profile picture</p>
              <Button type="button" variant="outline" className="border-border bg-transparent">
                Choose File
              </Button>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-8 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="major" className="text-sm font-medium text-foreground">Major</Label>
              <Input
                id="major"
                value={profileData.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-sm font-medium text-foreground">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium text-foreground">Address</Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio" className="text-sm font-medium text-foreground">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-secondary/50 border-border min-h-32"
              />
            </div>
          </div>
        </Card>

        {/* Social Links */}
        <Card className="p-8 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Social Links</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="github" className="text-sm font-medium text-foreground">GitHub URL</Label>
              <Input
                id="github"
                value={profileData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                className="bg-secondary/50 border-border"
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-medium text-foreground">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={profileData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="bg-secondary/50 border-border"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-8 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Skills & Expertise</h2>
          <div className="space-y-6">
            {/* Skills Display */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  className="bg-accent/10 text-accent border border-accent/30 px-3 py-2 flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-accent/60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Badge>
              ))}
            </div>

            {/* Add Skill Input */}
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add a new skill..."
                className="bg-secondary/50 border-border"
              />
              <Button
                type="button"
                onClick={addSkill}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-border bg-transparent">
            Cancel
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
