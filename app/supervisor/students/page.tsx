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
      status: "interviewing",
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
      status: "interviewing",
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
      status: "interviewing",
    },
    {
      id: 13,
      name: "William Smith",
      email: "william@uni.edu",
      major: "CS",
      role: "Fullstack",
      company: "Tech Corp",
      status: "active",
    },
    {
      id: 14,
      name: "John Doe",
      email: "john@uni.edu",
      major: "IT",
      role: "Network",
      company: "CloudTech",
      status: "active",
    },
    {
      id: 15,
      name: "Jane Roe",
      email: "jane@uni.edu",
      major: "BA",
      role: "Analyst",
      company: "DataCorp",
      status: "active",
    },
    {
      id: 16,
      name: "Bob Builder",
      email: "bob@uni.edu",
      major: "CS",
      role: "QA",
      company: "InnoSoft",
      status: "active",
    },
    {
      id: 17,
      name: "Alice Wong",
      email: "alice@uni.edu",
      major: "CS",
      role: "Software Eng",
      company: "Google",
      status: "active",
    },
    {
      id: 18,
      name: "Bob Martinez",
      email: "bob.m@uni.edu",
      major: "BA",
      role: "Product Manager",
      company: "Apple",
      status: "active",
    },
    {
      id: 19,
      name: "Carol Davis",
      email: "carol@uni.edu",
      major: "DS",
      role: "Data Science",
      company: "Meta",
      status: "active",
    },
    {
      id: 20,
      name: "Carl Davis",
      email: "carl@uni.edu",
      major: "DS",
      role: "Data Science",
      company: "Huawei",
      status: "active",
    },
    {
      id: 21,
      name: "Diana Prince",
      email: "diana@uni.edu",
      major: "CS",
      role: "Security",
      company: "Amazon",
      status: "active",
    },
    {
      id: 22,
      name: "Peter Parker",
      email: "peter@uni.edu",
      major: "CS",
      role: "Photographer",
      company: "Daily Bugle",
      status: "interviewing",
    },
    {
      id: 23,
      name: "Bruce Wayne",
      email: "bruce@uni.edu",
      major: "Finance",
      role: "CEO Assistant",
      company: "Wayne Ent",
      status: "interviewing",
    },
    {
      id: 24,
      name: "Clark Kent",
      email: "clark@uni.edu",
      major: "Journalism",
      role: "Reporter",
      company: "Daily Planet",
      status: "interviewing",
    },
    {
      id: 25,
      name: "Barry Allen",
      email: "barry@uni.edu",
      major: "Forensics",
      role: "Lab Tech",
      company: "CCPD",
      status: "interviewing",
    },
    {
      id: 26,
      name: "Arthur Curry",
      email: "arthur@uni.edu",
      major: "Marine Bio",
      role: "Researcher",
      company: "Aquarium",
      status: "interviewing",
    },
    {
      id: 27,
      name: "Tony Stark",
      email: "tony@uni.edu",
      major: "Engineering",
      role: "Unassigned",
      company: "N/A",
      status: "pending",
    },
    {
      id: 28,
      name: "Steve Rogers",
      email: "steve@uni.edu",
      major: "History",
      role: "Unassigned",
      company: "N/A",
      status: "pending",
    },
    {
      id: 29,
      name: "Natasha Romanoff",
      email: "natasha@uni.edu",
      major: "BA",
      role: "Unassigned",
      company: "N/A",
      status: "pending",
    },
    {
      id: 30,
      name: "Thor Odinson",
      email: "thor@uni.edu",
      major: "Astro",
      role: "Unassigned",
      company: "N/A",
      status: "pending",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                  <SelectItem value="pending">No Internship</SelectItem>
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

                <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-4 md:gap-12 w-full sm:w-auto">
                  {/* Internship Info - Standard text style */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 min-w-0">
                    <div className="flex items-center gap-2 sm:w-[160px] flex-shrink-0">
                      <Briefcase className="w-3.5 h-3.5 text-primary opacity-60 flex-shrink-0" />
                      <span className="text-xs font-semibold text-foreground truncate">
                        {student.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:w-[140px] flex-shrink-0">
                      <TrendingUp className="w-3.5 h-3.5 text-accent opacity-60 flex-shrink-0" />
                      <span className="text-xs font-medium text-muted-foreground truncate">
                        {student.company}
                      </span>
                    </div>
                  </div>

                  {/* Status and Action - perfectly centered */}
                  <div className="flex items-center gap-3 sm:gap-6 sm:w-[200px] justify-end">
                    {student.status === "active" ? (
                      <Badge className="bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/20 h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </Badge>
                    ) : student.status === "interviewing" ? (
                      <Badge className="bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/20 h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap">
                        <Clock className="w-3 h-3" />
                        Interviewing
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/20 h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap">
                        <AlertCircle className="w-3 h-3" />
                        No Internship
                      </Badge>
                    )}

                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
                      View Profile
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
