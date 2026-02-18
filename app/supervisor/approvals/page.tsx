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

export default function CompanyApprovals() {
  const { data: initialCompanies, isLoading } = useCompanyApprovals();
  const [companies, setCompanies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  // Initialize companies state once data is loaded
  React.useEffect(() => {
    if (initialCompanies) {
      setCompanies(initialCompanies);
    }
  }, [initialCompanies]);

  const itemsPerPage = isMobile ? 5 : 10;

  const filteredCompanies = useMemo(() => {
    return companies.filter(
      (company: any) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [companies, searchQuery]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredCompanies, currentPage, itemsPerPage]);

  const handleStatusChange = (id: number, newStatus: "ACTIVE" | "PENDING") => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Company Registration Approvals
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Review and validate company registrations. Only ACTIVE companies can
            post internship opportunities.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <h2 className="text-base font-bold">Pending Requests</h2>
          <Badge variant="outline" className="ml-2 font-bold h-5 text-[10px]">
            {filteredCompanies.filter((c) => c.status === "PENDING").length}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((company) => (
              <Card
                key={company.id}
                className="p-4 border-border bg-card hover:border-primary/30 transition-all duration-300 shadow-sm overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left Section: Logo and Basic Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-lg shadow-inner flex-shrink-0">
                      {company.logo}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-foreground text-lg leading-none">
                        {company.name}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="text-xs">{company.industry}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">
                          {company.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Contact and Status */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 bg-muted/30 p-3 rounded-xl border border-border/50">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-semibold truncate max-w-[180px]">
                          {company.contact_email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                          Current Status:
                        </span>
                        <Badge
                          className={
                            company.status === "ACTIVE"
                              ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 text-[10px] h-5"
                              : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 text-[10px] h-5"
                          }
                          variant="outline"
                        >
                          {company.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                      {company.status === "PENDING" ? (
                        <>
                          <Button
                            onClick={() =>
                              handleStatusChange(company.id, "ACTIVE")
                            }
                            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 md:flex-none font-bold shadow-lg shadow-emerald-600/20"
                            size="sm"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex-1 md:flex-none font-bold"
                            size="sm"
                            onClick={() => {
                              setCompanies((prev) =>
                                prev.filter((c) => c.id !== company.id),
                              );
                            }}
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1.5" />
                            Decline
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(company.id, "PENDING")
                          }
                          className="flex-1 md:flex-none font-bold text-amber-600 border-amber-200"
                          size="sm"
                        >
                          <Clock className="w-3.5 h-3.5 mr-1.5" />
                          Mark Pending
                        </Button>
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
    </div>
  );
}
