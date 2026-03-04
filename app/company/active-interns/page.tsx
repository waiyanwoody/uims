"use client";

import { useState } from "react";
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

import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

import { useCompanyActiveInterns } from "@/hooks/CompanyHook/useCompanyActiveInterns";
import { useAuth } from "@/contexts/AuthContext";

export default function CompanyActiveInterns() {
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const size = 6;

  const {
    data: interns,
    pagination,
    isLoading,
  } = useCompanyActiveInterns(user?.id ?? 0, page, size);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Active Interns</h1>

      <p className="text-sm text-muted-foreground">
        Total Active Interns: {pagination?.totalElements ?? 0}
      </p>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Student Number</TableHead>
              <TableHead>Internship</TableHead>
              <TableHead>Started At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-32">
                  <Loader2 className="animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : interns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-32">
                  No Active Interns to show
                </TableCell>
              </TableRow>
            ) : (
              interns.map((intern) => (
                <TableRow key={intern.enrollmentId}>
                  <TableCell className="font-medium">
                    {intern.studentName}
                  </TableCell>

                  <TableCell>
                    {intern.studentNumber}
                  </TableCell>

                  <TableCell>
                    {intern.internshipTitle}
                  </TableCell>

                  <TableCell>
                    {new Date(intern.startedAt).toLocaleDateString()}
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
                  setPage((p) =>
                    Math.min(pagination.totalPages, p + 1)
                  )
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