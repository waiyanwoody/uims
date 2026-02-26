'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Plus, X, Upload, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { set } from 'date-fns'
import { useStudentProfile } from '@/hooks/useStudentProfile'

export interface StudentProfile {
  studentId: number;
  name: string;
  email: string;
  major: string;
  profileImageUrl: string | null;
  address: string | null;
  bio: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  dateOfBirth: string | null; // Usually an ISO string from APIs
}

export default function StudentProfile() {
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'Tailwind CSS'])
  const [newSkill, setNewSkill] = useState('')
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  
  const { user } = useAuth();
  // 1. Move the hook to the top level
  const { profile, isLoading } = useStudentProfile(user?.id || 0);

  // 2. Initialize state with the Interface
  const [profileData, setProfileData] = useState<StudentProfile>({
    name: '',
    email: '',
    major: '',
    dateOfBirth: '',
    address: '',
    bio: '',
    github: '',
    linkedin: '',
    gender: '',
  });

  // 3. Sync state when the profile data is fetched
  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]); // Runs whenever 'profile' updates from the hook

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        setTimeout(() => setError(null), 3000)
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        setTimeout(() => setError(null), 3000)
        return
      }

      // Read and display image
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setSuccess('Profile picture uploaded successfully!')
        setTimeout(() => setSuccess(null), 3000)
      }
      reader.readAsDataURL(file)
    }
  }

  const addSkill = () => {
    if (!newSkill.trim()) {
      setError('Please enter a skill name')
      return
    }

    // Check if skill already exists
    if (skills.some(skill => skill.toLowerCase() === newSkill.trim().toLowerCase())) {
      setError('This skill already exists')
      return
    }

    // Add skill to list
    setSkills([...skills, newSkill.trim()])
    setNewSkill('')
    setError(null)
    setIsAddSkillModalOpen(false)
    setSuccess('Skill added successfully!')
    setTimeout(() => setSuccess(null), 3000)
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove))
    setError('Skill removed successfully!')
    setTimeout(() => setError(null), 3000)
  }

  const handleSaveChanges = () => {
    setSuccess('Profile changes saved successfully!')
    setTimeout(() => setSuccess(null), 3000)
  }

  // Skill color variants
  const skillColors = [
    'bg-blue-100 text-blue-700 border-blue-300',
    'bg-green-100 text-green-700 border-green-300',
    'bg-purple-100 text-purple-700 border-purple-300',
    'bg-orange-100 text-orange-700 border-orange-300',
    'bg-pink-100 text-pink-700 border-pink-300',
    'bg-indigo-100 text-indigo-700 border-indigo-300',
    'bg-cyan-100 text-cyan-700 border-cyan-300',
    'bg-teal-100 text-teal-700 border-teal-300',
  ]

  const getSkillColor = (index: number) => {
    return skillColors[index % skillColors.length]
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
            <div className="w-24 h-24 rounded-lg border border-border overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  👤
                </div>
              )}
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Upload a new profile picture</p>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button 
                type="button" 
                variant="outline" 
                className="border-border bg-transparent gap-2"
                onClick={() => document.getElementById('profile-upload')?.click()}
              >
                <Upload className="w-4 h-4" />
                Choose File
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF • Max 5MB
              </p>
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
                className="bg-transparent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-transparent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="major" className="text-sm font-medium text-foreground">Major</Label>
              <Input
                id="major"
                value={profileData.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                className="bg-transparent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-sm font-medium text-foreground">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={profileData.dateOfBirth ? profileData.dateOfBirth.split('T')[0] : ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="bg-transparent border-border"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium text-foreground">Address</Label>
              <Input
                id="address"
                value={profileData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="bg-transparent border-border"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio" className="text-sm font-medium text-foreground">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-transparent border-border min-h-32"
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
                className="bg-transparent border-border"
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-medium text-foreground">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={profileData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="bg-transparent border-border"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </Card>

        {/* Skills */}
        {/* <Card className="p-8 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Skills & Expertise</h2>
            <Button
              type="button"
              onClick={() => setIsAddSkillModalOpen(true)}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Skills Display */}
            {/* {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className={`${getSkillColor(index)} px-4 py-2 flex items-center gap-2 border font-medium`}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:opacity-60 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground mb-4">No skills added yet</p>
                <Button
                  type="button"
                  onClick={() => setIsAddSkillModalOpen(true)}
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Skill
                </Button>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">
              💡 Add your technical and soft skills to showcase your expertise to potential employers
            </p>
          </div> */}
        {/* </Card>  */}

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" className="border-border bg-transparent">
            Cancel
          </Button>
          <Button 
            type="button" 
            className="bg-primary hover:bg-primary/90"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </form>

      {/* Add Skill Modal */}
      <Dialog open={isAddSkillModalOpen} onOpenChange={setIsAddSkillModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
            <DialogDescription>
              Enter a skill to add to your profile
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Skill Name Input */}
            <div className="space-y-2">
              <Label htmlFor="skillName">
                Skill Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="skillName"
                placeholder="e.g., React, Python, Leadership..."
                value={newSkill}
                onChange={(e) => {
                  setNewSkill(e.target.value)
                  setError(null)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSkill()
                  }
                }}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Enter the name of the skill you want to add
              </p>
            </div>

            {/* Error Message in Modal */}
            {error && isAddSkillModalOpen && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAddSkillModalOpen(false)
                setNewSkill('')
                setError(null)
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={addSkill}
              disabled={!newSkill.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bottom-Left Notifications */}
      {success && (
        <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{success}</p>
          </div>
        </div>
      )}

      {error && !isAddSkillModalOpen && (
        <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}