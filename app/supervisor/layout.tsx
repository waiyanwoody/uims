import React from "react"
import { SupervisorSidebar } from '@/components/supervisor-sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supervisor Dashboard - UIMS',
  description: 'Monitor student internships and approvals',
}

export default function SupervisorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <SupervisorSidebar />
      <main className="flex-1 overflow-auto md:ml-64">
        {children}
      </main>
    </div>
  )
}
