"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ChevronLeft, ChevronRight, Users, Calendar } from "lucide-react";
import { useCompanyActiveInterns } from "@/hooks/CompanyHook/useCompanyActiveInterns";
import { useAuth } from "@/contexts/AuthContext";

export default function CompanyActiveInterns() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const size = 6;

  const { data: interns, pagination, isLoading } = useCompanyActiveInterns(user?.id ?? 0, page, size);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            <Users className="w-8 h-8 text-primary" /> Active Interns
          </h1>
          <p className="text-muted-foreground font-medium"> Currently enrolled students in your programs.</p>
        </div>
        <div className="bg-muted/50 px-4 py-2 rounded-xl border font-bold text-sm">
          Total: {pagination?.totalElements ?? 0}
        </div>
      </div>

      <Card className="rounded-2xl border-none shadow-lg overflow-hidden bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 uppercase text-[11px] font-bold tracking-widest">
              <TableHead className="px-6 py-4">Student Info</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Internship Role</TableHead>
              <TableHead>Start Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center">
                  <Loader2 className="animate-spin mx-auto text-primary/40" />
                </TableCell>
              </TableRow>
            ) : interns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-48 text-center text-muted-foreground italic">
                  No active interns currently assigned.
                </TableCell>
              </TableRow>
            ) : (
              interns.map((intern) => (
                <TableRow key={intern.enrollmentId} className="hover:bg-primary/[0.02] transition-colors">
                  <TableCell className="px-6 py-4 font-bold text-foreground">
                    {intern.studentName}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {intern.studentNumber}
                  </TableCell>
                  <TableCell>
                    <span className="bg-primary/5 text-primary px-3 py-1 rounded-lg text-xs font-bold border border-primary/10">
                      {intern.internshipTitle}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 opacity-50" />
                      {new Date(intern.startedAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/5">
            <p className="text-xs font-bold text-muted-foreground">
              Page {page} of {pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg h-9 font-bold"
                disabled={page === 1 || isLoading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg h-9 font-bold"
                disabled={page === pagination.totalPages || isLoading}
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}