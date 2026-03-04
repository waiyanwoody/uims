"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAllStudents } from "@/lib/api-hooks";
import { StudentResponse } from "@/types/types";
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
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AssignedStudents() {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const studentsPerPage = isMobile ? 5 : 10;

  const { data: paginatedData, isLoading } = useAllStudents(1, 100);
  const students = paginatedData?.data || [];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.companyName &&
        student.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      (student.enrollmentStatus?.toUpperCase() || "PENDING") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const getStatusColor = (status?: string) => {
    const s = status?.toUpperCase() || "PENDING";
    switch (s) {
      case "COMPLETED":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "IN_PROGRESS":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "PENDING":
        return "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      default:
        return "bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800";
    }
  };

  const formatStatus = (status?: string) => {
    if (!status) return "Pending";
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-foreground lowercase first-letter:uppercase">
              Assigned students
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage and monitor your assigned student internships
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-9 bg-card border-border/50 h-10 w-full"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="w-full sm:w-44">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="bg-card border-border/50 h-10">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                    <SelectValue placeholder="All Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filteredStudents.length > 0 ? (
            currentStudents.map((student, idx) => (
              <Link
                key={student.id}
                href={`/supervisor/students/${student.id}`}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-3 rounded-xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-md active:scale-[0.98] transition-all duration-300 animate-slideInUp"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Avatar/Initial */}
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
                      <span className="flex items-center gap-1.5 align-middle">
                        <User className="w-3" />
                        {student.studentNumber}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium text-foreground/70 align-middle">
                        <GraduationCap className="w-3" />
                        {student.major}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-4 md:gap-12 w-full sm:w-auto">
                  {/* Internship Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                    <div className="flex items-center gap-2 sm:w-[160px] flex-shrink-0">
                      <Briefcase className="w-3.5 h-3.5 text-primary opacity-60 flex-shrink-0" />
                      <span className="text-xs font-semibold text-foreground truncate">
                        {student.internshipTitle || "\u00A0"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:w-[140px] flex-shrink-0">
                      <TrendingUp className="w-3.5 h-3.5 text-accent opacity-60 flex-shrink-0" />
                      <span className="text-xs font-medium text-muted-foreground truncate">
                        {student.companyName || "\u00A0"}
                      </span>
                    </div>
                  </div>

                  {/* Status and Action */}
                  <div className="flex items-center gap-3 sm:gap-6 sm:w-[150px] justify-end">
                    <Badge
                      className={`${getStatusColor(student.enrollmentStatus)} h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap`}
                    >
                      {student.enrollmentStatus?.toUpperCase() ===
                        "COMPLETED" ||
                      student.enrollmentStatus?.toUpperCase() ===
                        "IN_PROGRESS" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {formatStatus(student.enrollmentStatus)}
                    </Badge>

                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
                      View
                      <ChevronRight className="w-4 h-4" />
                    </div>

                    <div className="sm:hidden">
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Card className="p-12 border-dashed border-2 text-center bg-transparent">
              <div className="flex flex-col items-center gap-2">
                <Search className="w-8 h-8 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground font-medium">
                  No students found matching your criteria
                </p>
                <Button
                  variant="link"
                  className="text-primary text-xs font-bold"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            </Card>
          )}
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

            <div className="flex items-center gap-1 flex-wrap justify-center">
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
