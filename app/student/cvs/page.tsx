'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Download, Edit, Trash2, Plus, FileText, Upload, X, File, CheckCircle2, AlertCircle } from 'lucide-react'

interface CV {
  id: number
  name: string
  uploadedDate: string
  status: 'Active' | 'Archived'
  downloads: number
  file?: File
}

export default function MyCVs() {
  const [cvs, setCvs] = useState<CV[]>([
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
  ])

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cvTitle, setCvTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type (PDF only)
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed')
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        setError('File size must be less than 5MB')
        return
      }

      setSelectedFile(file)
      
      // Auto-fill title from filename
      if (!cvTitle) {
        const nameWithoutExt = file.name.replace('.pdf', '')
        setCvTitle(nameWithoutExt)
      }
      
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed')
        return
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        setError('File size must be less than 5MB')
        return
      }

      setSelectedFile(file)
      
      if (!cvTitle) {
        const nameWithoutExt = file.name.replace('.pdf', '')
        setCvTitle(nameWithoutExt)
      }
      
      setError(null)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    const fileInput = document.getElementById('cv-file-input') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleUpload = () => {
    if (!selectedFile) {
      setError('Please select a file to upload')
      return
    }

    if (!cvTitle.trim()) {
      setError('Please enter a CV title')
      return
    }

    // Add new CV to list
    const newCV: CV = {
      id: Date.now(),
      name: selectedFile.name,
      uploadedDate: new Date().toISOString(),
      status: 'Active',
      downloads: 0,
      file: selectedFile
    }

    setCvs([newCV, ...cvs])
    
    // Reset and close
    setSelectedFile(null)
    setCvTitle('')
    setError(null)
    setIsUploadModalOpen(false)
    setSuccess('CV uploaded successfully!')
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this CV?')) {
      setCvs(cvs.filter(cv => cv.id !== id))
      setError('CV deleted successfully!')
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleDownload = (cv: CV) => {
    if (cv.file) {
      // Download the actual file
      const url = URL.createObjectURL(cv.file)
      const a = document.createElement('a')
      a.href = url
      a.download = cv.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      // Simulate download for existing CVs
      alert(`Downloading ${cv.name}`)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My CVs</h1>
          <p className="text-muted-foreground mt-2">Manage your CV documents for applications</p>
        </div>
        <Button 
          className="gap-2 bg-primary hover:bg-primary/90"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Upload CV</span>
        </Button>
      </div>

      {/* CV List */}
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-border gap-1 bg-transparent"
                  onClick={() => handleDownload(cv)}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(cv.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload New CV</DialogTitle>
            <DialogDescription>
              Upload a PDF file (max 5MB) to add to your CV library
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* CV Title Input */}
            <div className="space-y-2">
              <Label htmlFor="cvTitle">
                CV Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cvTitle"
                placeholder="e.g., Software Engineer Resume 2024"
                value={cvTitle}
                onChange={(e) => setCvTitle(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>
                CV File <span className="text-red-500">*</span>
              </Label>
              
              {!selectedFile ? (
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    id="cv-file-input"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="cv-file-input"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-medium mb-1">
                        Drop your CV here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF format only • Maximum 5MB
                      </p>
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="border-2 border-primary/20 rounded-lg p-4 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <File className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsUploadModalOpen(false)
                setSelectedFile(null)
                setCvTitle('')
                setError(null)
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || !cvTitle.trim()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload CV
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

      {error && !isUploadModalOpen && (
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