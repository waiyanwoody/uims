"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Building2,
  Mail,
  Search,
  User,
  Phone,
  CheckCircle2,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCompanyApprovals } from "@/lib/api-hooks";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useApplications } from "@/lib/supervisor/hooks";
import { Loader2 } from "lucide-react";

export default function CompanyApprovals() {
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 5 : 10;

  const { data: applicationsData, isLoading } = useApplications(currentPage, itemsPerPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applications = applicationsData?.data || [];
  const totalElements = applicationsData?.totalElements || 0;
  const totalPages = applicationsData?.totalPages || 0;

  const filteredApplications = useMemo(() => {
    return applications.filter(
      (app: any) =>
        (app.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.internshipTitle?.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [applications, searchQuery]);

  const handleStatusChange = (id: number, newStatus: string) => {
    // Note: The documentation (API_Documentation.txt) currently lacks a status update endpoint.
    // This will only update the UI state locally for now.
    console.info(`Status change requested for application ${id} to ${newStatus}. Endpoint missing in documentation.`);
  };

  const handleCardClick = (application: any) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Student Application Approvals
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Review and validate student internship applications.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <h2 className="text-base font-bold">Pending Applications</h2>
          <Badge variant="outline" className="ml-2 font-bold h-5 text-[10px]">
            {filteredApplications.filter((a: any) => a.status === "PENDING").length}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app: any) => (
              <Card
                key={app.id}
                onClick={() => handleCardClick(app)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between p-3.5 sm:p-3 rounded-xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-md transition-all duration-300 animate-slideInUp cursor-pointer"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 shadow-sm font-bold text-lg uppercase flex-shrink-0">
                    {app.studentName?.charAt(0) || "S"}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {app.studentName || `Student #${app.studentId}`}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5 align-middle text-primary font-bold uppercase tracking-wider">
                        <Briefcase className="w-3" />
                        {app.internshipTitle || `Internship #${app.internshipId}`}
                      </div>
                      <div className="flex items-center gap-1.5 align-middle font-medium">
                        <Calendar className="w-3" />
                        {app.appliedDate || "Recently"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-4 md:gap-12 w-full md:w-auto px-1 sm:px-4">
                  <div className="flex items-center gap-3 sm:gap-6 justify-end ml-auto">
                    <Badge
                      className={
                        app.status === "APPROVED"
                          ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/20 h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap uppercase tracking-wider"
                          : app.status === "REJECTED"
                            ? "bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/20 h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap uppercase tracking-wider"
                            : "bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/20 h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap uppercase tracking-wider"
                      }
                      variant="outline"
                    >
                      {app.status || "PENDING"}
                    </Badge>

                    <div className="flex gap-2">
                      {(!app.status || app.status === "PENDING") && (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(app.id, "APPROVED");
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-none h-8 px-4 text-xs rounded-lg"
                            size="sm"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            className="font-bold h-8 px-4 text-xs rounded-lg"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(app.id, "REJECTED");
                            }}
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1.5" />
                            Decline
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
              <Building2 className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground font-medium">
                No company registrations found.
              </p>
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pt-4 flex justify-center pb-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Company Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[92vw] sm:max-w-md p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
          <DialogHeader className="hidden">
            <DialogTitle>Company Details</DialogTitle>
            <DialogDescription>
              Detailed information about the company.
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-0">
              <div className="p-5 sm:p-6 border-border overflow-hidden relative group rounded-2xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="relative z-10 space-y-5">
                  <div className="flex flex-col items-center text-center space-y-2.5 pb-5 border-b border-border">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg border-2 border-white dark:border-card">
                      {selectedCompany.logo}
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-foreground">
                        {selectedCompany.name}
                      </h1>
                      <p className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                        {selectedCompany.industry}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 pt-1">
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Human Resources (HR)
                    </h4>
                    <div className="flex items-start gap-3.5 p-2.5 rounded-xl bg-muted/30 border border-border/40 group/item hover:bg-muted/50 transition-colors">
                      <User className="w-4 h-4 text-primary mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <div className="min-w-0">
                        <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">
                          Person in Charge
                        </p>
                        <p className="text-foreground text-xs font-bold">
                          {selectedCompany.hr_name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
                          <Phone className="w-2.5 h-2.5 text-primary/70" />
                          <span className="font-medium">
                            {selectedCompany.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pl-1 pt-1">
                      <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">
                          Corporate Email
                        </p>
                        <p className="text-foreground text-xs truncate font-medium">
                          {selectedCompany.contact_email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pl-1">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">
                          Headquarters
                        </p>
                        <p className="text-foreground text-xs font-medium">
                          {selectedCompany.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pl-1">
                      <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">
                          Registration Date
                        </p>
                        <p className="text-foreground text-xs font-medium">
                          {selectedCompany.registered_at}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-border">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <h3 className="text-[11px] font-bold text-foreground uppercase tracking-tight">
                        Verification Status
                      </h3>
                    </div>
                    <Badge className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/20 font-bold px-3 py-0.5 text-[9px] uppercase tracking-wider">
                      Pending Review
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
