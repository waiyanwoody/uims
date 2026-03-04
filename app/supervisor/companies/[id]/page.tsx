"use client";

import React, { useState, useMemo } from "react";
import { useCompanyApprovals, useCompanyInternships } from "@/lib/api-hooks";
import { InternshipResponse } from "@/types/types";
import { formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building2,
  MapPin,
  User,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  ChevronLeft,
  DollarSign,
  Globe,
  ArrowLeft,
  MessageSquare,
  Clock,
  CheckCircle2,
  FileText,
  Users,
  AlertCircle,
  Trophy,
  ListChecks,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CompanyProfilePage() {
  const params = useParams();
  const id = Number(params?.id);
  const { data: companies, isLoading: isLoadingCompany } =
    useCompanyApprovals();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] =
    useState<InternshipResponse | null>(null);
  const isMobile = useIsMobile();

  const { data: internshipData, isLoading: isLoadingInternships } =
    useCompanyInternships(id, 1, 100, undefined, "OPEN");

  const handleViewApplication = (internship: InternshipResponse) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  const company = useMemo(() => {
    return companies?.find((c: any) => c.id === id);
  }, [companies, id]);

  const allInternships = internshipData?.data || [];
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allInternships.length / itemsPerPage);

  const currentInternships = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return allInternships.slice(indexOfFirstItem, indexOfLastItem);
  }, [allInternships, currentPage]);

  // if (isLoadingCompany || isLoadingInternships) { // Let's simplify loading
  if (isLoadingCompany) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <Building2 className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="text-2xl font-bold">Company not found</h2>
        <Link href="/supervisor/companies">
          <Button variant="outline" className="gap-2 rounded-xl">
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
        {/* Header/Navigation */}
        <div className="flex items-center justify-between animate-fadeIn">
          <Link href="/supervisor/companies">
            <Button
              variant="ghost"
              className="hover:bg-primary/5 -ml-2 text-sm gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Companies
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Section - Company Information (Following Student Profile Style) */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-5 sm:p-6 border-border animate-slideInLeft overflow-hidden relative group rounded-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-border">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg border-2 border-white dark:border-card">
                    {company.logo}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                      {company.name}
                    </h1>
                    <p className="text-primary font-bold text-xs sm:text-sm uppercase tracking-widest">
                      {company.industry}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Human Resources (HR)
                  </h4>
                  <div className="flex items-start gap-4 p-3 rounded-xl bg-muted/30 border border-border/50 group/item hover:bg-muted/50 transition-colors">
                    <User className="w-5 h-5 text-primary mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Person in Charge
                      </p>
                      <p className="text-foreground text-sm font-bold">
                        {company.hr_name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3 text-primary/70" />
                        <span className="font-medium">{company.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pl-1 pt-2">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Corporate Email
                      </p>
                      <p className="text-foreground text-sm truncate font-medium">
                        {company.contact_email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pl-1">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Headquarters
                      </p>
                      <p className="text-foreground text-sm font-medium">
                        {company.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pl-1">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Registration Date
                      </p>
                      <p className="text-foreground text-sm font-medium">
                        {formatDate(company.registered_at)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-sm font-bold text-foreground">
                      Verification Status
                    </h3>
                  </div>
                  <Badge className="bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/20 font-bold px-3">
                    Fully Verified Industry Partner
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Section - Internship Posts (Following Weekly Reports Style) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5 sm:p-6 border-border animate-slideInRight rounded-2xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-inner">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      Internship Posts
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      Browse available opportunities at {company.name}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="px-4 py-1.5 h-auto text-xs font-bold rounded-lg shadow-sm border border-border"
                >
                  {allInternships.length} Active Posts
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {isLoadingInternships ? (
                  <div className="flex h-[200px] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg"></div>
                  </div>
                ) : currentInternships.length > 0 ? (
                  currentInternships.map((internship: InternshipResponse) => (
                    <Card
                      key={internship.id}
                      className="p-4 border-border bg-muted/10 hover:bg-muted/20 hover:border-primary/20 transition-all duration-300 group rounded-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rotate-45 -mr-8 -mt-8"></div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between relative z-10">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                              {internship.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className="text-[10px] px-2 py-0.5 h-auto uppercase tracking-wider font-bold"
                            >
                              {internship.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Briefcase className="w-3.5 h-3.5 text-primary/60" />
                              <span className="font-medium">
                                {internship.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Users className="w-3.5 h-3.5 text-primary/60" />
                              <span className="font-medium">
                                {internship.slots} Slots
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{formatDate(internship.deadline)}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewApplication(internship)}
                          className="h-9 px-4 text-xs font-bold gap-2 hover:bg-primary/10 hover:text-primary rounded-xl"
                        >
                          View Details
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-muted/5 rounded-2xl border-2 border-dashed border-border">
                    <FileText className="w-12 h-12 text-muted-foreground/20 mb-3" />
                    <p className="text-muted-foreground font-medium">
                      No available roles at this time.
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination Section */}
              {totalPages > 1 && (
                <div className="pt-8">
                  <Pagination>
                    <PaginationContent className="gap-2">
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          className={`h-9 px-3 rounded-lg border-border hover:bg-muted font-bold ${
                            currentPage === 1
                              ? "opacity-40 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === i + 1}
                            className={`h-9 w-9 rounded-lg font-bold transition-all ${
                              currentPage === i + 1
                                ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                                : "hover:bg-muted border-border"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(i + 1);
                            }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          className={`h-9 px-3 rounded-lg border-border hover:bg-muted font-bold ${
                            currentPage === totalPages
                              ? "opacity-40 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      {/* Internship Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
          <DialogHeader className="hidden">
            <DialogTitle>Internship Details</DialogTitle>
            <DialogDescription>
              Detailed information about the internship post.
            </DialogDescription>
          </DialogHeader>
          {selectedInternship && (
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="bg-primary/10 text-primary border-primary/20 font-bold uppercase tracking-wider text-[10px] px-3">
                      {selectedInternship.category}
                    </Badge>
                    <Badge
                      className={`${
                        selectedInternship.status === "OPEN"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      } font-bold uppercase tracking-wider text-[10px] px-3`}
                    >
                      {selectedInternship.status}
                    </Badge>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {selectedInternship.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Slots
                      </span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {selectedInternship.slots} Positions
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Deadline
                      </span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {formatDate(selectedInternship.deadline)}
                    </p>
                  </div>
                </div>

                {/* Description Accordion */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-foreground font-bold border-b border-border pb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3>About this role</h3>
                  </div>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="description"
                    className="w-full"
                  >
                    <AccordionItem value="description" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-2 text-sm font-semibold text-primary">
                        View Description
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed text-sm pt-2">
                        {selectedInternship.description}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Requirements Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-foreground font-bold border-b border-border pb-2">
                    <ListChecks className="w-5 h-5 text-primary" />
                    <h3>Requirements</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 group hover:bg-primary/10 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground whitespace-pre-wrap leading-relaxed">
                        {selectedInternship.requirements}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-border bg-muted/20 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl font-bold h-11 px-6 text-sm"
                >
                  Close Detail
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
