"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Download,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  Building2,
  FileText,
  Clock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useStudentApplications } from "@/hooks/StudentHook/useStudentApplications";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

export default function MyApplications() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const pageSize = isMobile ? 5 : 10;

  const {
    applications,
    loading: isLoading,
    pagination,
  } = useStudentApplications(user?.id, currentPage, pageSize, activeTab);

  const filteredApplications = (applications || []).filter((app) => {
    if (activeTab === "all") return true;
    return app?.status?.toLowerCase() === activeTab.toLowerCase();
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-secondary text-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const currentApplications = applications;
  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground mt-2">
          Track all your internship applications in one place
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        className="w-full"
        onValueChange={(val) => {
          setActiveTab(val);
          setCurrentPage(1);
        }}
      >
        <TabsList className="bg-muted border border-border p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary transition-colors"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary transition-colors"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary transition-colors"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary transition-colors"
          >
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading applications...</p>
            </div>
          ) : filteredApplications.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {filteredApplications.map((app) => (
                  <Card
                    key={app.id}
                    className="p-6 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col h-full bg-card"
                  >
                    {/* Header */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-foreground leading-tight line-clamp-2">
                          {app.internship?.title || "Unknown Internship"}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(app.status || "PENDING")} whitespace-nowrap`}
                        >
                          {getStatusLabel(app.status || "PENDING")}
                        </Badge>
                      </div>
                      <p className="text-sm font-semibold text-primary flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        {app.internship?.company?.name || "Unknown Company"}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-2.5 mb-6 flex-grow">
                      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <GraduationCap className="w-4 h-4 text-muted-foreground/70" />
                        <span className="truncate">
                          Student Number: {app.student?.studentNumber || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground/70" />
                        <span>
                          Applied:{" "}
                          {app.appliedAt
                            ? new Date(app.appliedAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-muted-foreground/70" />
                        <span>
                          Deadline:{" "}
                          {app.internship?.deadline
                            ? new Date(
                                app.internship.deadline,
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 text-sm p-2 rounded-md bg-secondary/30 border border-border/50">
                        <FileText className="w-4 h-4 text-primary/70" />
                        <span className="font-medium text-foreground truncate">
                          {app.cvForm?.title || app.cv?.title || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <Link
                      href={app.id ? `/student/applications/${app.id}` : "#"}
                      className="mt-auto"
                    >
                      <Button
                        disabled={!app.id}
                        className="w-full bg-primary hover:bg-primary/90 gap-2 shadow-sm"
                      >
                        <span>View details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>

              {/* Pagination moved here */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
                  <p className="text-sm text-muted-foreground order-2 sm:order-1">
                    Showing {(currentPage - 1) * pageSize + 1} to{" "}
                    {Math.min(
                      currentPage * pageSize,
                      pagination?.totalElements || 0,
                    )}{" "}
                    of {pagination?.totalElements} applications
                  </p>
                  <div className="flex items-center gap-2 order-1 sm:order-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={
                            currentPage === i + 1 ? "default" : "outline"
                          }
                          size="sm"
                          className="w-9 h-9 p-0 hidden sm:flex"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Card className="p-12 border border-border text-center">
              <p className="text-muted-foreground">
                No applications in this category
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
