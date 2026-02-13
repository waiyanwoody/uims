"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function AssignedStudents() {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = isMobile ? 5 : 10;

  const students = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@uni.edu",
      major: "CS",
      role: "Frontend Dev",
      company: "Tech Corp",
      status: "active",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@uni.edu",
      major: "CS",
      role: "Backend Dev",
      company: "CloudTech",
      status: "active",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@uni.edu",
      major: "Data Science",
      role: "Data Science",
      company: "DataCorp",
      status: "pending",
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james@uni.edu",
      major: "CS",
      role: "Frontend Dev",
      company: "Tech Corp",
      status: "active",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa@uni.edu",
      major: "CS",
      role: "Unassigned",
      company: "N/A",
      status: "pending",
    },
    {
      id: 6,
      name: "David Martinez",
      email: "david@uni.edu",
      major: "IT",
      role: "DevOps",
      company: "CloudTech",
      status: "active",
    },
    {
      id: 7,
      name: "Rachel Green",
      email: "rachel@uni.edu",
      major: "Marketing",
      role: "Social Media",
      company: "AdAgency",
      status: "active",
    },
    {
      id: 8,
      name: "Ross Geller",
      email: "ross@uni.edu",
      major: "History",
      role: "Researcher",
      company: "Museum",
      status: "pending",
    },
    {
      id: 9,
      name: "Joey Tribbiani",
      email: "joey@uni.edu",
      major: "Arts",
      role: "Actor",
      company: "Studio",
      status: "active",
    },
    {
      id: 10,
      name: "Chandler Bing",
      email: "chandler@uni.edu",
      major: "Finance",
      role: "Data Transmuter",
      company: "Corp",
      status: "active",
    },
    {
      id: 11,
      name: "Monica Geller",
      email: "monica@uni.edu",
      major: "Culinary",
      role: "Chef",
      company: "Restaurant",
      status: "active",
    },
    {
      id: 12,
      name: "Phoebe Buffay",
      email: "phoebe@uni.edu",
      major: "Music",
      role: "Musician",
      company: "Central Perk",
      status: "pending",
    },
  ];

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/20 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-fadeIn">
          <h1 className="text-3xl font-bold text-foreground lowercase first-letter:uppercase">
            Assigned students
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage and monitor your assigned student internships
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentStudents.map((student, idx) => (
            <Link
              key={student.id}
              href={`/supervisor/students/${student.id}`}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-3 rounded-xl border border-border/50 bg-secondary/10 hover:bg-white hover:border-primary/20 hover:shadow-md active:scale-[0.98] active:bg-white transition-all duration-300 animate-slideInUp"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar/Initial - Even More Compact */}
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 shadow-sm font-bold text-base uppercase flex-shrink-0">
                  {student.name.charAt(0)}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {student.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1.5 align-middle">
                      <Mail className="w-3" />
                      {student.email}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-foreground/70 align-middle">
                      <GraduationCap className="w-3" />
                      {student.major}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-4 md:gap-12">
                {/* Internship Info - Standard text style */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 min-w-0">
                  <div className="flex items-center gap-2 sm:w-[140px] flex-shrink-0">
                    <Briefcase className="w-3.5 h-3.5 text-primary opacity-60 flex-shrink-0" />
                    <span className="text-xs font-semibold text-foreground truncate">
                      {student.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:w-[120px] flex-shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-accent opacity-60 flex-shrink-0" />
                    <span className="text-xs font-medium text-muted-foreground truncate">
                      {student.company}
                    </span>
                  </div>
                </div>

                {/* Status and Action - perfectly centered */}
                <div className="flex items-center gap-3 sm:gap-6">
                  {student.status === "active" ? (
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-50 text-amber-700 border-amber-200 h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap">
                      <Clock className="w-3 h-3" />
                      Pending
                    </Badge>
                  )}

                  <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    View Profile
                    <ChevronRight className="w-4 h-4" />
                  </div>

                  <div className="sm:hidden">
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-8 w-8 p-0 text-xs ${currentPage === i + 1 ? "bg-primary text-white" : "hover:bg-primary/5"}`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
