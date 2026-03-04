"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  ExternalLink,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { useCompanyInternships } from "@/hooks/CompanyHook/useCompanyInternships";
import { useDeleteInternship } from "@/hooks/useDeleteInternship";
import { Internship } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateInternship } from "@/hooks/useUpdateInternship";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ManageInternships() {
  const { user } = useAuth();

  // Pagination
  const [page, setPage] = useState(1);
  const [size] = useState(6);

  // Filters / Search / Sort
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Data
  const {
    data: internships,
    pagination,
    isLoading,
    refetch,
  } = useCompanyInternships(
    user?.id,
    page,
    size,
    search,
    filterStatus,
    filterCategory,
    sortField,
    sortOrder
  );

  const { updateInternship, isUpdating } = useUpdateInternship();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] =
    useState<Internship | null>(null);

  // Helper to format ISO date string to YYYY-MM-DD for input[type="date"]
  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  const handleEditClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInternship) return;

    const result = await updateInternship(
      selectedInternship.id,
      selectedInternship
    );
    if (result.success) {
      setIsEditModalOpen(false);
      refetch(); // Refresh list from server
    } else {
      alert(result.error);
    }
  };

  const { deleteInternship, isDeleting } = useDeleteInternship();

  // State for Delete Confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!idToDelete) return;

    const result = await deleteInternship(idToDelete);
    if (result.success) {
      setIsDeleteModalOpen(false);
      refetch(); // Refresh the list
    } else {
      alert(result.error);
    }
  };

  // Handlers
  const handleDelete = async (id: number) => {
    const result = await deleteInternship(id);
    if (result.success) {
      setIsDeleteModalOpen(false);
      refetch(); // Refresh the list
      refetch();
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Internships</h1>
          <p className="text-muted-foreground">Admin panel for your postings</p>
        </div>
        <Link href="/company/post-internship">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> New Internship
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <Input
          placeholder="Search internships..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
        <div className="flex gap-2">
          {/* Status */}
          <Select
            value={filterStatus}
            onValueChange={(v) => {
              setFilterStatus(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>{" "}
              {/* <-- Use "all" instead of "" */}
              <SelectItem value="OPEN">OPEN</SelectItem>
              <SelectItem value="CLOSED">CLOSED</SelectItem>
            </SelectContent>
          </Select>

          {/* Category */}
          <Select
            value={filterCategory}
            onValueChange={(v) => {
              setFilterCategory(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>{" "}
              {/* <-- Use "all" */}
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Business Analyst">Business Analyst</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Field */}
          <Select value={sortField} onValueChange={(v) => setSortField(v)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Sort Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Created At</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Order */}
          <Select
            value={sortOrder}
            onValueChange={(v) => setSortOrder(v as "asc" | "desc")}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Desc</SelectItem>
              <SelectItem value="asc">Asc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Slots</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : internships.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground italic"
                >
                  No Internship to show
                </TableCell>
              </TableRow>
            ) : (
              internships.map((internship) => (
                <TableRow
                  key={internship.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>{internship.title}</TableCell>
                  <TableCell>{internship.category}</TableCell>
                  <TableCell>{internship.slots}</TableCell>
                  <TableCell>
                    {new Date(internship.deadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        internship.status === "OPEN" ? "default" : "secondary"
                      }
                    >
                      {internship.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {internship.applicationCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Link href={`/company/manage-internships/${internship.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 h-8 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Applications
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleEditClick(internship)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteClick(internship.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {pagination && pagination.totalPages > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/10">
            <p className="text-sm text-muted-foreground">
              Page <span className="font-medium">{page}</span> of{" "}
              <span className="font-medium">{pagination.totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page === pagination.totalPages || isLoading}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              <DialogTitle>Are you absolutely sure?</DialogTitle>
            </div>
            <DialogDescription className="pt-2">
              This action cannot be undone. This will permanently delete the
              internship posting from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Delete Internship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* FULL EDIT DIALOG */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Edit Internship Details
            </DialogTitle>
          </DialogHeader>

          {selectedInternship && (
            <form onSubmit={handleSave} className="space-y-6 pt-4">
              {/* Basic Info Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    value={selectedInternship.title}
                    onChange={(e) =>
                      setSelectedInternship({
                        ...selectedInternship,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. System Engineer Intern"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={selectedInternship.category}
                    onChange={(e) =>
                      setSelectedInternship({
                        ...selectedInternship,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Description & Requirements */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={selectedInternship.description}
                  onChange={(e) =>
                    setSelectedInternship({
                      ...selectedInternship,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Requirements</Label>
                <Textarea
                  rows={3}
                  value={selectedInternship.requirements}
                  onChange={(e) =>
                    setSelectedInternship({
                      ...selectedInternship,
                      requirements: e.target.value,
                    })
                  }
                />
              </div>

              {/* Slots, Deadline & Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Available Slots</Label>
                  <Input
                    type="number"
                    value={selectedInternship.slots}
                    onChange={(e) =>
                      setSelectedInternship({
                        ...selectedInternship,
                        slots: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deadline</Label>
                  <Input
                    type="date"
                    value={formatDateForInput(selectedInternship.deadline)}
                    onChange={(e) =>
                      setSelectedInternship({
                        ...selectedInternship,
                        deadline: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={selectedInternship.status} 
                    onValueChange={(val: any) => setSelectedInternship({...selectedInternship, status: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="OPEN">OPEN</SelectItem>
                      <SelectItem value="CLOSED">CLOSED</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>

              <DialogFooter className="border-t pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="min-w-[120px]"
                >
                  {isUpdating ? (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
