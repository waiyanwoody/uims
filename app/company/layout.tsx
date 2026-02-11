import React from "react"
import { CompanySidebar } from '@/components/company-sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company Dashboard - UIMS',
  description: 'Manage your internship postings and applications',
}

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
