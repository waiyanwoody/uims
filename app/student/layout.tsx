import React from "react"
import { StudentSidebar } from '@/components/student-sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Dashboard - UIMS',
  description: 'Manage your internship applications and profile',
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar />
      <main className="flex-1 overflow-auto md:ml-64">
        {children}
      </main>
    </div>
  )
}
