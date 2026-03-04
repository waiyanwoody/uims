"use client";

import React, { useState, useMemo } from "react";
import { useCompanies } from "@/lib/api-hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Building2,
  Search,
  MapPin,
  Calendar,
  Eye,
  Mail,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

export default function SupervisorCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 5 : 10;

  const { data: companiesData, isLoading } = useCompanies(
    "ACTIVE",
    currentPage,
    itemsPerPage,
  );

  const currentItems = useMemo(() => {
    const content = companiesData?.data || [];
    if (!searchQuery) return content;
    return content.filter(
      (company: any) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [companiesData, searchQuery]);

  const totalPages = companiesData?.totalPages || 0;

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
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-foreground lowercase first-letter:uppercase">
              Registered companies
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              Manage and monitor your industry internship partners
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search companies..."
                className="pl-9 h-10 border-border/50 bg-card hover:bg-muted/30 focus:border-primary transition-all duration-300 w-full"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {/* List of Companies */}
        <div className="grid grid-cols-1 gap-3">
          {currentItems.length > 0 ? (
            currentItems.map((company, index) => (
              <Link
                key={company.id}
                href={`/supervisor/companies/${company.id}`}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-3 rounded-xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-md active:scale-[0.98] transition-all duration-300 animate-slideInUp"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Logo/Initial */}
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 shadow-sm font-bold text-lg uppercase flex-shrink-0">
                    {company.logo || company.name?.charAt(0)}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {company.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1.5 align-middle">
                        <Building2 className="w-3" />
                        {company.industry}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium text-foreground/70 align-middle">
                        <MapPin className="w-3" />
                        {company.location}
                      </span>
                      <span className="flex items-center gap-1.5 align-middle font-medium">
                        <Calendar className="w-3" />
                        {new Date(company.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-4 md:gap-12 w-full sm:w-auto px-1 sm:px-4">
                  <div className="flex items-center gap-3 sm:gap-6 justify-end ml-auto">
                    <Badge className="bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/20 h-7 flex items-center justify-center gap-1.5 px-3 text-[10px] font-bold shadow-none whitespace-nowrap uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </Badge>

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
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card border border-dashed border-border rounded-3xl animate-fadeIn">
              <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                No active companies found
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Search for another name or check your filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination Section */}
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
                  className={`h-8 w-8 p-0 text-xs ${currentPage === i + 1 ? "bg-primary text-white font-bold" : "hover:bg-primary/5"}`}
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
