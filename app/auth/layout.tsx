import React from "react";
import { GraduationCap } from "lucide-react";
import { TechBackground } from "@/components/tech-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 auth-layered-bg overflow-hidden">
      <TechBackground />
      {/* Brand / Logo Section */}
      <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-700 relative z-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-foreground">UIMS</h1>
        <p className="text-muted-foreground font-medium">University Internship Management System</p>
      </div>

      <div className="w-full max-w-2xl relative z-20 animate-in fade-in zoom-in-95 duration-700">
        {children}
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-sm text-muted-foreground/60 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative z-10">
        &copy; {new Date().getFullYear()} UIMS. Academic Excellence.
      </div>
    </div>
  );
}
