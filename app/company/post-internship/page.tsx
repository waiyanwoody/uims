"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Briefcase, 
  Info, 
  FileText, 
  Calendar, 
  Users, 
  Rocket,
  PlusCircle
} from "lucide-react"; // Added for visual flair
import { useAuth } from "@/contexts/AuthContext";
import { useCreateInternship } from "@/hooks/useCreateInternship";
import { toast } from "sonner";

export default function PostInternship() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    deadline: "",
    description: "",
    requirements: "",
    slots: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { createInternship, loading, error } = useCreateInternship();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not logged in");
      return;
    }

    try {
      await createInternship({
        companyId: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        requirements: formData.requirements,
        slots: Number(formData.slots),
        deadline: formData.deadline,
      });

      toast.success("Internship created successfully");

      setFormData({
        title: "",
        category: "",
        deadline: "",
        description: "",
        requirements: "",
        slots: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create internship");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-border/60 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <PlusCircle className="w-8 h-8 text-primary" />
            Post New Internship
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Create and publish a new opportunity to attract top talent.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <Card className="p-8 border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-8 border-l-4 border-primary pl-4">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Basic Information
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4 opacity-70" /> Position Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Frontend Developer Internship"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="category" className="text-sm font-semibold">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger className="bg-background/50 border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="slots" className="text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 opacity-70" /> Available Slots
              </Label>
              <Input
                id="slots"
                placeholder="Number of interns needed"
                value={formData.slots}
                onChange={(e) => handleInputChange("slots", e.target.value)}
                className="bg-background/50 border-border"
                type="number"
                min="1"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="deadline" className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 opacity-70" /> Application Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                className="bg-background/50 border-border"
                required
              />
            </div>
          </div>
        </Card>

        {/* Description & Details Section */}
        <Card className="p-8 border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-8 border-l-4 border-accent pl-4">
            <FileText className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-bold text-foreground">
              Description & Details
            </h2>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-semibold">
                Job Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the internship role and what the student will work on..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="bg-background/50 border-border min-h-[150px] resize-none leading-relaxed focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="requirements" className="text-sm font-semibold">
                Required Skills & Qualifications
              </Label>
              <Textarea
                id="requirements"
                placeholder="List the required skills and qualifications (one per line)"
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
                className="bg-background/50 border-border min-h-[150px] resize-none leading-relaxed focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>
        </Card>

        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
          <p className="text-xs text-muted-foreground italic">
            * Once published, this opportunity will be visible to all eligible students.
          </p>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">Creating...</span>
            ) : (
              <span className="flex items-center gap-2">
                <Rocket className="w-4 h-4" /> Publish Internship
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}