"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  Users,
  Building2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useInternship } from "@/hooks/StudentHook/useInternship";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

export default function BrowseInternships() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const pageSize = isMobile ? 5 : 9;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(
    new Set(),
  );

  const {
    internships,
    loading: isLoading,
    pagination,
  } = useInternship(currentPage, pageSize, "OPEN");

  // Extract unique categories from all fetched internships
  const categories = [
    "All",
    ...Array.from(new Set(internships.map((i) => i.category))).sort(),
  ];

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      internship.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const parseRequirements = (requirements: string): string[] => {
    try {
      return JSON.parse(requirements);
    } catch {
      return requirements.split(",").map((r) => r.trim());
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-emerald-100 text-emerald-800";
      case "CLOSED":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleDescription = (id: number) => {
    const newExpanded = new Set(expandedDescriptions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedDescriptions(newExpanded);
  };

  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Browse Internships
        </h1>
        <p className="text-muted-foreground mt-2">
          Find and apply to internship opportunities from top companies
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by title or company..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category.toLowerCase()
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => {
                setSelectedCategory(category.toLowerCase());
                setCurrentPage(1);
              }}
              className={
                selectedCategory === category.toLowerCase()
                  ? "bg-primary hover:bg-primary/90"
                  : "border-border hover:bg-secondary"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {(currentPage - 1) * pageSize + 1} -{" "}
        {Math.min(currentPage * pageSize, pagination?.totalElements || 0)} of{" "}
        {pagination?.totalElements || 0} internships
      </div>

      {/* Loading state */}
      {isLoading ? (
        <Card className="p-12 border border-border text-center animate-pulse">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Loading ...
          </h3>
        </Card>
      ) : (
        <>
          {/* Internship Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredInternships.map((internship) => {
              const isExpanded = expandedDescriptions.has(internship.id);
              const shouldShowSeeMore = internship.description.length > 150;

              return (
                <Card
                  key={internship.id}
                  className="p-6 border border-border hover:shadow-lg hover:border-accent/50 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-foreground leading-tight">
                        {internship.title}
                      </h3>
                      <Badge className={getStatusColor(internship.status)}>
                        {internship.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-primary">
                      <Building2 className="w-4 h-4 inline mr-1" />
                      {internship.company.name}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      {internship.company.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 flex-shrink-0" />3 months
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4 flex-shrink-0" />
                      {internship.category}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Users className="w-4 h-4 flex-shrink-0 text-primary" />
                      {internship.slots}{" "}
                      {internship.slots === 1 ? "position" : "positions"}{" "}
                      available
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4 flex-grow">
                    <p
                      className={`text-sm text-muted-foreground leading-relaxed ${
                        !isExpanded ? "line-clamp-3" : ""
                      }`}
                    >
                      {internship.description}
                    </p>
                    {shouldShowSeeMore && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => toggleDescription(internship.id)}
                        className="h-auto p-0 text-primary text-sm font-medium mt-1"
                      >
                        {isExpanded ? "See less" : "See more"}
                      </Button>
                    )}
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-medium text-foreground">
                      Key Requirements:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {parseRequirements(internship.requirements)
                        .slice(0, 2)
                        .map((req, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-secondary/70 text-foreground"
                          >
                            {req}
                          </Badge>
                        ))}
                      {parseRequirements(internship.requirements).length >
                        2 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-secondary/70 text-foreground"
                        >
                          +
                          {parseRequirements(internship.requirements).length -
                            2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Deadline */}
                  <p className="text-xs text-muted-foreground mb-4">
                    Deadline:{" "}
                    {new Date(internship.deadline).toLocaleDateString()}
                  </p>

                  <Link href={`/student/browse/${internship.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 mt-auto gap-2">
                      View Detail
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0"
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
                    className={`h-9 w-9 p-0 text-xs ${
                      currentPage === i + 1
                        ? "bg-primary text-white"
                        : "hover:bg-primary/5 border-border"
                    }`}
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
                className="h-9 w-9 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {filteredInternships.length === 0 && (
            <Card className="p-12 border border-border text-center">
              <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No internships found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
