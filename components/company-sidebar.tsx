'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Plus,
  Briefcase,
  ClipboardList,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/company/dashboard' },
  { icon: Plus, label: 'Post Internship', href: '/company/post-internship' },
  { icon: Briefcase, label: 'Manage Internships', href: '/company/manage-internships' },
  { icon: ClipboardList, label: 'View Applications', href: '/company/applications' },
  { icon: Building2, label: 'Company Profile', href: '/company/profile' },
  { icon: Settings, label: 'Settings', href: '/company/settings' },
]

export function CompanySidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 md:hidden p-3 bg-primary rounded-full text-white shadow-lg hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 min-h-screen w-64 bg-primary text-white z-30 transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          <span className="font-bold text-lg">UIMS</span>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 ${
                    isActive
                      ? 'bg-white/20 hover:bg-white/30 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
