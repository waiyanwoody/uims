import React from "react";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <GraduationCap className="w-7 h-7" />
          <span className="font-bold text-xl">UIMS</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-white/70 text-sm">
        <p>&copy; 2024 University Internship Management System</p>
      </div>
    </div>
  );
}
