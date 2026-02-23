"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  MapPin,
  Wrench,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Target,
  Download,
  Building2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Student {
  name: string;
  studentNumber: string;
  email: string;
  major: string;
  assignedInternship: string;
  address: string;
  skills: string[];
}

export default function StudentProfile() {
  const params = useParams();
  const id = Number(params.id);

  // Mock database of students to match the list in /students/page.tsx
  const studentsDB: Record<number, Student> = {
    1: {
      name: "Sarah Johnson",
      studentNumber: "2021CS001",
      email: "sarah@uni.edu",
      major: "CS",
      assignedInternship: "Frontend Dev - Tech Corp",
      address: "123 University Ave, Tech City",
      skills: ["React", "TypeScript", "Tailwind CSS", "UI/UX Design"],
    },
    2: {
      name: "Michael Chen",
      studentNumber: "2021CS042",
      email: "michael@uni.edu",
      major: "CS",
      assignedInternship: "Backend Dev - CloudTech",
      address: "456 Silicon Valley, Innovation Way",
      skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
    },
    3: {
      name: "Emma Davis",
      studentNumber: "2021DS012",
      email: "emma@uni.edu",
      major: "Data Science",
      assignedInternship: "Data Science - DataCorp",
      address: "789 Analytics Blvd, Data Center",
      skills: ["Python", "R", "SQL", "Machine Learning"],
    },
    4: {
      name: "James Wilson",
      studentNumber: "2021CS088",
      email: "james@uni.edu",
      major: "CS",
      assignedInternship: "Frontend Dev - Tech Corp",
      address: "101 Web Street, Browser Town",
      skills: ["Vue.js", "Javascript", "SCSS", "Jest"],
    },
    5: {
      name: "Lisa Anderson",
      studentNumber: "2021CS055",
      email: "lisa@uni.edu",
      major: "CS",
      assignedInternship: "Pending assignment",
      address: "202 Waiting Cir, Student Plaza",
      skills: ["Java", "C++", "Algorithms"],
    },
    6: {
      name: "David Martinez",
      studentNumber: "2021IT023",
      email: "david@uni.edu",
      major: "IT",
      assignedInternship: "DevOps - CloudTech",
      address: "303 Server Farm, Network City",
      skills: ["Linux", "Kubernetes", "Shell Scripting", "Azure"],
    },
    7: {
      name: "Rachel Green",
      studentNumber: "2021MK001",
      email: "rachel@uni.edu",
      major: "Marketing",
      assignedInternship: "Social Media - AdAgency",
      address: "New York, NY",
      skills: ["Marketing", "Content Writing", "Social Media"],
    },
    8: {
      name: "Ross Geller",
      studentNumber: "2021HS001",
      email: "ross@uni.edu",
      major: "History",
      assignedInternship: "Researcher - Museum",
      address: "New York, NY",
      skills: ["Paleontology", "Research", "Archiving"],
    },
    9: {
      name: "Joey Tribbiani",
      studentNumber: "2021AR001",
      email: "joey@uni.edu",
      major: "Arts",
      assignedInternship: "Actor - Studio",
      address: "New York, NY",
      skills: ["Acting", "Performance", "Casting"],
    },
    10: {
      name: "Chandler Bing",
      studentNumber: "2021FN001",
      email: "chandler@uni.edu",
      major: "Finance",
      assignedInternship: "Data Transmuter - Corp",
      address: "New York, NY",
      skills: ["Analysis", "Reporting", "Excel"],
    },
    11: {
      name: "Monica Geller",
      studentNumber: "2021CU001",
      email: "monica@uni.edu",
      major: "Culinary",
      assignedInternship: "Chef - Restaurant",
      address: "New York, NY",
      skills: ["Cooking", "Kitchen Management"],
    },
    12: {
      name: "Phoebe Buffay",
      studentNumber: "2021MU001",
      email: "phoebe@uni.edu",
      major: "Music",
      assignedInternship: "Musician - Central Perk",
      address: "New York, NY",
      skills: ["Songwriting", "Guitar", "Performance"],
    },
    13: {
      name: "William Smith",
      studentNumber: "2021CS013",
      email: "william@uni.edu",
      major: "CS",
      assignedInternship: "Fullstack - Tech Corp",
      address: "Philadelphia, PA",
      skills: ["MERN Stack", "Firebase"],
    },
    14: {
      name: "John Doe",
      studentNumber: "2021IT014",
      email: "john@uni.edu",
      major: "IT",
      assignedInternship: "Network - CloudTech",
      address: "Los Angeles, CA",
      skills: ["Cisco", "Routing", "Switching"],
    },
    15: {
      name: "Jane Roe",
      studentNumber: "2021BA015",
      email: "jane@uni.edu",
      major: "BA",
      assignedInternship: "Analyst - DataCorp",
      address: "Chicago, IL",
      skills: ["PowerBI", "Tableau", "Strategy"],
    },
    16: {
      name: "Bob Builder",
      studentNumber: "2021CS016",
      email: "bob@uni.edu",
      major: "CS",
      assignedInternship: "QA - InnoSoft",
      address: "Houston, TX",
      skills: ["Selenium", "Cypress", "Appium"],
    },
    17: {
      name: "Alice Wong",
      studentNumber: "2021CS017",
      email: "alice@uni.edu",
      major: "CS",
      assignedInternship: "Software Eng - Google",
      address: "Mountain View, CA",
      skills: ["Go", "Kubernetes", "C++"],
    },
    18: {
      name: "Bob Martinez",
      studentNumber: "2021BA018",
      email: "bob.m@uni.edu",
      major: "BA",
      assignedInternship: "Product Manager - Apple",
      address: "Cupertino, CA",
      skills: ["Product Strategy", "Agile"],
    },
    19: {
      name: "Carol Davis",
      studentNumber: "2021DS019",
      email: "carol@uni.edu",
      major: "DS",
      assignedInternship: "Data Science - Meta",
      address: "Menlo Park, CA",
      skills: ["PyTorch", "NLP"],
    },
    20: {
      name: "Carl Davis",
      studentNumber: "2021DS020",
      email: "carl@uni.edu",
      major: "DS",
      assignedInternship: "Data Science - Huawei",
      address: "Shenzhen, China",
      skills: ["5G Tech", "Big Data"],
    },
    21: {
      name: "Diana Prince",
      studentNumber: "2021CS021",
      email: "diana@uni.edu",
      major: "CS",
      assignedInternship: "Security - Amazon",
      address: "Seattle, WA",
      skills: ["Cybersecurity", "IAM"],
    },
    22: {
      name: "Peter Parker",
      studentNumber: "2021CS022",
      email: "peter@uni.edu",
      major: "CS",
      assignedInternship: "Photographer - Daily Bugle",
      address: "Queens, NY",
      skills: ["Photography", "Web Design"],
    },
    23: {
      name: "Bruce Wayne",
      studentNumber: "2021FN023",
      email: "bruce@uni.edu",
      major: "Finance",
      assignedInternship: "CEO Assistant - Wayne Ent",
      address: "Gotham, NJ",
      skills: ["Corporate Finance", "Management"],
    },
    24: {
      name: "Clark Kent",
      studentNumber: "2021JU024",
      email: "clark@uni.edu",
      major: "Journalism",
      assignedInternship: "Reporter - Daily Planet",
      address: "Metropolis, NY",
      skills: ["Writing", "Investigation"],
    },
    25: {
      name: "Barry Allen",
      studentNumber: "2021FO025",
      email: "barry@uni.edu",
      major: "Forensics",
      assignedInternship: "Lab Tech - CCPD",
      address: "Central City, MO",
      skills: ["Chemistry", "Evidence Analysis"],
    },
    26: {
      name: "Arthur Curry",
      studentNumber: "2021MB026",
      email: "arthur@uni.edu",
      major: "Marine Bio",
      assignedInternship: "Researcher - Aquarium",
      address: "Amnesty Bay, ME",
      skills: ["Marine Ecology", "Marine Biology"],
    },
    27: {
      name: "Tony Stark",
      studentNumber: "2021EN027",
      email: "tony@uni.edu",
      major: "Engineering",
      assignedInternship: "Pending assignment",
      address: "Malibu, CA",
      skills: ["Mechanical Eng", "AI"],
    },
    28: {
      name: "Steve Rogers",
      studentNumber: "2021HS028",
      email: "steve@uni.edu",
      major: "History",
      assignedInternship: "Pending assignment",
      address: "Brooklyn, NY",
      skills: ["Leadership", "History"],
    },
    29: {
      name: "Natasha Romanoff",
      studentNumber: "2021BA029",
      email: "natasha@uni.edu",
      major: "BA",
      assignedInternship: "Pending assignment",
      address: "Moscow, Russia",
      skills: ["Intelligence", "Strategy"],
    },
    30: {
      name: "Thor Odinson",
      studentNumber: "2021AS030",
      email: "thor@uni.edu",
      major: "Astro",
      assignedInternship: "Pending assignment",
      address: "Asgard",
      skills: ["Astrophysics", "Meteorology"],
    },
  };

  const studentInfo: Student = studentsDB[id] || studentsDB[1]; // Fallback to Sarah if ID not found

  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Only active students have reports
  const hasReports =
    studentInfo.assignedInternship !== "Pending assignment" &&
    ![
      "Bruce Wayne",
      "Clark Kent",
      "Barry Allen",
      "Arthur Curry",
      "Peter Parker",
    ].includes(studentInfo.name);

  const [monthlyReports, setMonthlyReports] = useState(
    hasReports
      ? [
          {
            id: 1,
            month: "February",
            submittedDate: "2024-03-01",
            status: "Verify",
            description: `Working on implementing the new features for ${studentInfo.assignedInternship.split(" - ")[1]}.`,
            attachmentName: `monthly_report_feb_${studentInfo.name.split(" ")[0].toLowerCase()}.pdf`,
            feedback: null,
            supervisorMarks: null,
            hrMarks: 44, // Mock HR mark already given
            marks: null,
          },
          {
            id: 2,
            month: "January",
            submittedDate: "2024-02-01",
            status: "Review",
            description:
              "Completed the initial project setup and started working on the core modules.",
            attachmentName: `monthly_report_jan_${studentInfo.name.split(" ")[0].toLowerCase()}.pdf`,
            feedback:
              "Good start on the project. The implementation follows the required standards.",
            supervisorMarks: 43,
            hrMarks: 42,
            marks: 85,
          },
        ]
      : [],
  );

  // Calculate Progression based on monthly reports
  const progressionProgress = Math.min((monthlyReports.length / 6) * 100, 100); // Assuming 6-month internship

  const totalPages = Math.ceil(monthlyReports.length / reportsPerPage);
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = monthlyReports.slice(
    indexOfFirstReport,
    indexOfLastReport,
  );

  const handleReportClick = (report: any) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleFinishReviewed = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmReview = () => {
    if (selectedReport) {
      setMonthlyReports((prev) =>
        prev.map((r) =>
          r.id === selectedReport.id
            ? {
                ...r,
                status: "Review",
                feedback,
                supervisorMarks: marks,
                marks: (r.hrMarks || 0) + marks, // Combine with HR marks for total 100
              }
            : r,
        ),
      );
    }
    setIsConfirmDialogOpen(false);
    setIsDialogOpen(false);
    setSelectedReport(null);
    setFeedback("");
    setMarks(0);
  };

  const [marks, setMarks] = useState(0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Review":
        return (
          <Badge className="bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/20 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Reviewed
          </Badge>
        );
      case "Verify":
        return (
          <Badge className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/20 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Ready for Review
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-slate-50 dark:bg-slate-900/10 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800/20 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending HR
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
        {/* Header/Navigation */}
        <div className="flex items-center justify-between animate-fadeIn">
          <Link href="/supervisor/students">
            <Button
              variant="ghost"
              className="hover:bg-primary/5 -ml-2 text-sm"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Students
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Section - Student Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-5 sm:p-6 border-border animate-slideInLeft overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-border">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                    {studentInfo.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                      {studentInfo.name}
                    </h1>
                    <p className="text-primary font-medium text-xs sm:text-sm">
                      {studentInfo.studentNumber}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Email Address
                      </p>
                      <p className="text-foreground text-sm truncate">
                        {studentInfo.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Major
                      </p>
                      <p className="text-foreground text-sm">
                        {studentInfo.major}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Assigned Internship
                      </p>
                      <p className="text-foreground text-sm">
                        {studentInfo.assignedInternship}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Address
                      </p>
                      <p className="text-foreground text-sm">
                        {studentInfo.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">
                      Skills & Expertise
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {studentInfo.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-secondary/50 hover:bg-primary/10 transition-colors text-[9px] py-0"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Target
                        className={`w-4 h-4 ${hasReports ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <h3
                        className={`text-sm font-bold ${hasReports ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        Progression Point
                      </h3>
                    </div>
                    <span
                      className={`text-xs font-bold ${hasReports ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {hasReports ? `${progressionProgress.toFixed(0)}%` : "0%"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${hasReports ? "bg-primary" : "bg-muted-foreground/30"} rounded-full transition-all duration-1000`}
                        style={{
                          width: hasReports
                            ? `${progressionProgress.toFixed(0)}%`
                            : "0%",
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-muted-foreground font-medium uppercase tracking-tighter">
                      <span>Start</span>
                      <span>Month 06</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Section - Monthly Reports Highlights */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5 sm:p-6 border-border animate-slideInRight">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Monthly Reports Highlights
                  </h2>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    Review student progress through monthly submissions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentReports.length > 0 ? (
                  currentReports.map((report, idx) => (
                    <div
                      key={report.id}
                      onClick={() => handleReportClick(report)}
                      className="group flex items-center justify-between p-3 sm:p-4 rounded-xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-md transition-all cursor-pointer animate-slideInUp"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-10 sm:w-14 sm:h-12 px-1 rounded-lg bg-background flex flex-col items-center justify-center border border-border group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                          <span className="text-[7px] sm:text-[9px] uppercase font-bold opacity-60">
                            Month
                          </span>
                          <span className="text-[14px] sm:text-[16px] font-black leading-tight text-center uppercase tracking-tighter">
                            {report.id}
                          </span>
                        </div>

                        <div className="space-y-0.5 sm:space-y-1">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              Submitted: {report.submittedDate}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span>{report.status}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden xs:block">
                          {getStatusBadge(report.status)}
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">
                        No Reports Found
                      </p>
                      <p className="text-[11px] text-muted-foreground max-w-[200px]">
                        This student hasn't submitted any monthly reports yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="h-8 px-3 text-xs hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                    Prev
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className={`h-8 w-8 text-xs ${
                          currentPage === i + 1
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "hover:bg-primary/5 hover:text-primary"
                        }`}
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
                    className="h-8 px-3 text-xs hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Report Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[92%] max-w-xl bg-card border-border px-6 md:px-8 rounded-2xl animate-in fade-in zoom-in duration-200">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              {selectedReport?.status === "Verify"
                ? "Monthly Report Review"
                : `MONTHLY REPORT DETAILS`}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-[10px] font-medium tracking-tight">
              Submitted on: {selectedReport?.submittedDate}
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-border/50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs font-semibold text-foreground truncate">
                      {studentInfo.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm">
                    <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[11px] font-medium text-foreground truncate">
                      {studentInfo.assignedInternship.includes(" - ")
                        ? studentInfo.assignedInternship.split(" - ")[1]
                        : studentInfo.assignedInternship}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[11px] font-medium text-foreground truncate">
                      {studentInfo.assignedInternship.includes(" - ")
                        ? studentInfo.assignedInternship.split(" - ")[0]
                        : "Intern"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[11px] font-medium text-foreground">
                      Monthly Report {selectedReport.id}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" />
                  Monthly Summary
                </p>
                <div className="p-3 rounded-xl bg-secondary/20 border border-border/50">
                  <p className="text-xs leading-relaxed text-foreground/90 italic">
                    "{selectedReport.description}"
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl border border-border bg-secondary/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground truncate max-w-[150px]">
                      {selectedReport.attachmentName}
                    </p>
                    <p className="text-[9px] text-muted-foreground font-medium">
                      PDF • 2.4 MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 border-border hover:bg-primary hover:text-white transition-colors"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>

              {selectedReport.status === "Review" &&
                selectedReport.feedback && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" />
                        Final Evaluation
                      </p>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-black bg-emerald-500/5 text-emerald-600 border-emerald-500/20"
                      >
                        TOTAL: {selectedReport.marks || 0}/100
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-secondary/10 border border-border/50 text-center">
                        <p className="text-[8px] uppercase font-bold text-muted-foreground mb-1">
                          HR Score (50%)
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          {selectedReport.hrMarks}/50
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-primary/5 border border-primary/10 text-center">
                        <p className="text-[8px] uppercase font-bold text-primary mb-1">
                          Supervisor (50%)
                        </p>
                        <p className="text-sm font-bold text-primary">
                          {selectedReport.supervisorMarks}/50
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <p className="text-[11px] leading-relaxed text-foreground/90 font-medium">
                        {selectedReport.feedback}
                      </p>
                    </div>
                  </div>
                )}

              {selectedReport.status === "Verify" && (
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] uppercase font-bold text-blue-500 tracking-widest">
                      HR Assessment Complete
                    </p>
                    <span className="text-xs font-bold text-blue-600">
                      {selectedReport.hrMarks}/50
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-tight italic">
                    HR has evaluated the workplace performance. Please provide
                    your academic evaluation (max 50 marks) to finalize the
                    monthly score.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <Badge
                  variant="outline"
                  className={`${
                    selectedReport.status === "Review"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  } font-bold uppercase tracking-widest text-[9px] px-1.5 py-0`}
                >
                  {selectedReport.status}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 pt-2 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
              className="h-8 font-bold text-[10px] uppercase tracking-wider gap-2 flex-1 sm:flex-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Close
            </Button>
            {selectedReport?.status === "Verify" && (
              <Button
                onClick={handleFinishReviewed}
                className="h-8 font-bold text-[10px] uppercase tracking-wider gap-2 shadow-lg shadow-primary/20 flex-1 sm:flex-none"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Finish Review
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation & Feedback Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="w-[90%] max-w-md bg-card border-border px-6 md:px-8 rounded-2xl animate-in fade-in zoom-in duration-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Final Confirmation
            </DialogTitle>
            <DialogDescription className="text-sm">
              Please provide feedback and marks for{" "}
              <span className="text-foreground font-bold">
                {studentInfo.name}
              </span>{" "}
              before completing the review.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="marks"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Supervisor Portion (0-50)
                </Label>
                <span className="text-[10px] text-primary font-bold">
                  50% OF TOTAL GRADE
                </span>
              </div>
              <Input
                id="marks"
                type="text"
                placeholder="Supervisor marks (0-50)"
                className="bg-secondary/10 border-border focus-visible:ring-primary/20 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={marks || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setMarks(0);
                    return;
                  }
                  const num = parseInt(val);
                  if (!isNaN(num)) {
                    if (num >= 0 && num <= 50) {
                      setMarks(num);
                    }
                  }
                }}
              />
              <p className="text-[9px] text-muted-foreground italic">
                *HR will provide the remaining 50% for the total 100/100 marks.
              </p>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="feedback"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
              >
                Supervisor Feedback
              </Label>
              <Textarea
                id="feedback"
                placeholder="Write your feedback or comments here..."
                className="min-h-[120px] bg-secondary/10 border-border focus-visible:ring-primary/20 text-sm"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setIsConfirmDialogOpen(false)}
              className="font-bold text-xs uppercase tracking-tight"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmReview}
              className="bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-tight"
            >
              Confirm Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
