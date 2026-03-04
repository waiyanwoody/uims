"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Download, Loader2, ChevronLeft, ChevronRight, Eye } from "lucide-react";

import { useCompanyApplications } from "@/hooks/CompanyHook/useCompanyApplications";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CompanyApplications() {
  const { user } = useAuth();
  const router = useRouter();

  // PAGINATION STATE
  const [page, setPage] = useState(1);
  const size = 6;

  const {
    data: applications,
    pagination,
    isLoading,
    refetch,
  } = useCompanyApplications(user?.id, page, size);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Applications</h1>

      {/* TOTAL COUNT */}

      <p className="text-sm text-muted-foreground">
        Total Applications: {pagination?.totalElements ?? 0}
      </p>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Internship</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-32">
                  <Loader2 className="animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-32">
                  No Applications
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app: any) => (
                <TableRow key={app.id}>
                  <TableCell>{app.student?.name}</TableCell>

                  <TableCell>{app.internship?.title}</TableCell>

                  <TableCell>
                    <Badge
                      className={
                        app.status === "APPROVED"
                          ? "bg-green-500 text-white"
                          : app.status === "PENDING"
                          ? "bg-yellow-500 text-white"
                          : app.status === "INTERVIEWING"
                          ? "bg-blue-500 text-white"
                          : app.status === "REJECTED"
                          ? "bg-red-500 text-white"
                          : "bg-gray-500 text-white"
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={app.cvForm?.filePath}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button className="hover:bg-zinc-800 hover:text-indigo-400" size="icon" variant="ghost">
                                <Download />
                              </Button>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Download CV
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-zinc-800 hover:bg-zinc-800 hover:text-indigo-400 transition-all"
                      onClick={() => router.push(`/company/applications/${app.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                      Review
                    </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* PAGINATION */}

        {pagination && pagination.totalPages > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/10">
            <p className="text-sm text-muted-foreground">
              Showing page
              <span className="font-medium text-foreground ml-1">
                {page}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {pagination.totalPages}
              </span>
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1 || isLoading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={page === pagination.totalPages || isLoading}
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
