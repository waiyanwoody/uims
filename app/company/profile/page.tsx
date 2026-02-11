'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function CompanyProfile() {
  const [profileData, setProfileData] = useState({
    companyName: 'Tech Corp',
    email: 'hr@techcorp.com',
    phone: '+1 (555) 123-4567',
    website: 'https://techcorp.com',
    address: '123 Tech Street, San Francisco, CA 94105',
    bio: 'Leading technology company focusing on innovative solutions for businesses worldwide.',
    industry: 'Technology',
    employeeCount: '500-1000',
    yearFounded: '2010'
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Company Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your company information</p>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <Card className="p-8 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium text-foreground">Company Name</Label>
              <Input
                id="companyName"
                value={profileData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
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
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium text-foreground">Website</Label>
              <Input
                id="website"
                value={profileData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
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
              <Label htmlFor="bio" className="text-sm font-medium text-foreground">Company Description</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-secondary/50 border-border min-h-32"
              />
            </div>
          </div>
        </Card>

        {/* Company Details */}
        <Card className="p-8 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Company Details</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-medium text-foreground">Industry</Label>
              <Input
                id="industry"
                value={profileData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeCount" className="text-sm font-medium text-foreground">Employee Count</Label>
              <Input
                id="employeeCount"
                value={profileData.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearFounded" className="text-sm font-medium text-foreground">Year Founded</Label>
              <Input
                id="yearFounded"
                value={profileData.yearFounded}
                onChange={(e) => handleInputChange('yearFounded', e.target.value)}
                className="bg-secondary/50 border-border"
              />
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
