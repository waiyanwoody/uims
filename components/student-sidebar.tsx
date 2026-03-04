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
  Lock,
  Zap
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
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const { applications } = useStudentApplications(user?.id, 1, 100);
  const hasInternship = applications && applications.some(app => app.status === "APPROVED");

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
  };

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
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border z-30 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
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
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            // Special handling for "My Monthly Reports"
            if (item.label === "My Monthly Reports" && !hasInternship) {
  return (
    <div key={item.href} className="relative group px-1">
      {/* The Button Body */}
      <div
        className="flex items-center justify-between w-full p-2.5 rounded-lg 
                   bg-secondary/30 border border-dashed border-border/60 
                   cursor-not-allowed transition-all duration-300
                   group-hover:bg-secondary/50 group-hover:border-primary/20"
      >
        <div className="flex items-center gap-3 opacity-40 group-hover:opacity-60 transition-opacity">
          <div className="p-1.5 rounded-md bg-background shadow-sm">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground tracking-tight">
            {item.label}
          </span>
        </div>

        {/* The Lock Badge */}
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted/50 border border-border group-hover:scale-110 transition-transform duration-300">
          <Lock className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>

      {/* Floating Modern Tooltip */}
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-56 
                      opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0
                      transition-all duration-300 z-50 pointer-events-none">
        <div className="relative p-3 bg-card border border-border shadow-xl rounded-xl">
          {/* Tooltip Arrow */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-card" />
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-primary">
              <Zap className="w-3 h-3 fill-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Locked Feature</span>
            </div>
            <p className="text-xs text-foreground font-semibold">
              Monthly Reporting
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              This section unlocks automatically once your <span className="text-primary font-medium">internship is approved</span>.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Blur Background (Subtle Glow) */}
      <div className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </div>
  );
}

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