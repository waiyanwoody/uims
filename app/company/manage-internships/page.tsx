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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Trash2,
  Eye,
  Plus,
  Loader2,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import {
  useCompanyInternships,
  Internship,
} from "@/hooks/useCompanyInternships";
import { useUpdateInternship } from "@/hooks/useUpdateInternship";
import { useDeleteInternship } from "@/hooks/useDeleteInternship";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function ManageInternships() {
  const companyId = 11; // In reality, get this from JWT context
  const {
    data: internships,
    isLoading,
    error,
    refetch,
  } = useCompanyInternships(companyId);
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

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Internships</h1>
          <p className="text-muted-foreground">
            Admin panel for {internships[0]?.id ? "your postings" : "company"}
          </p>
        </div>
        <Link href="/company/post-internship">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> New Internship
          </Button>
        </Link>
      </div>

      <Card className="border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Slots</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {internships.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground italic"
                >
                  No Internship to show
                </TableCell>
              </TableRow>
            ) : (
              internships.map((job) => (
                <TableRow key={job.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{ job.id}{job.title}</TableCell>
                  <TableCell>{job.category}</TableCell>
                  <TableCell>{job.slots}</TableCell>
                  <TableCell>
                    {new Date(job.deadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={job.status === "OPEN" ? "default" : "secondary"}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(job)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      {/* DELETE BUTTON */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(job.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
