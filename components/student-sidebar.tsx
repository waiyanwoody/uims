"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useStudentApplications } from "@/hooks/StudentHook/useStudentApplications";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/student/dashboard" },
  { icon: User, label: "My Profile", href: "/student/profile" },
  { icon: ClipboardList, label: "Browse Internships", href: "/student/browse" },
  { icon: FileText, label: "My Applications", href: "/student/applications" },
  { icon: ClipboardList, label: "My Monthly Reports", href: "/student/monitoring" },
  { icon: Briefcase, label: "My CVs", href: "/student/cvs" },
  { icon: Settings, label: "Settings", href: "/student/settings" },
];

export function StudentSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user,logout } = useAuth();
  const router = useRouter();
  
  const { applications } = useStudentApplications(user?.id, 1, 100);
  // Safely check if applications exist and find an approved one
  const hasInternship = applications && applications.length > 0 && applications.some((app) => app.status === "APPROVED");

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.label === "My Monthly Reports") {
      return hasInternship;
    }
    return true;
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    if (user?.type !== "student") {
      router.push("/");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    toast.message("Logged out successfully", {
      description: "You have been logged out."
    });
    router.push("/auth/login");
    setIsOpen(false);
  }

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
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border z-30 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo & Theme Toggle */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <span className="font-bold text-lg">UIMS</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-3 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent bg-transparent"
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
  );
}
