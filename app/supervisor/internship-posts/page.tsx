"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  Users,
  Building2,
  ChevronRight,
  ChevronLeft,
  Filter,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InternshipPostsCollection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(
    new Set(),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    "All",
    "Engineering",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
  ];

  const internships = [
    {
      id: 1,
      company_id: 1,
      title: "Frontend Developer Internship",
      category: "Engineering",
      description:
        "We are seeking a passionate Frontend Developer intern to join our dynamic team. You will work on building responsive web applications. This is an excellent opportunity to gain hands-on experience while working on real-world projects.",
      requirements: '["React", "TypeScript", "Tailwind CSS"]',
      status: "OPEN" as const,
      slots: 5,
      deadline: new Date("2024-03-15"),
      created_at: new Date("2024-01-01"),
      company: {
        id: 1,
        name: "Tech Corp",
        location: "San Francisco, CA",
        industry: "Technology",
      },
    },
    {
      id: 2,
      company_id: 2,
      title: "Data Science Internship",
      category: "Data Science",
      description:
        "Join our data science team and work on cutting-edge machine learning projects. You will analyze large datasets, build predictive models, and contribute to data-driven decision making.",
      requirements: '["Python", "Machine Learning", "SQL"]',
      status: "OPEN" as const,
      slots: 3,
      deadline: new Date("2024-02-28"),
      created_at: new Date("2024-01-01"),
      company: {
        id: 2,
        name: "Data Solutions Inc.",
        location: "New York, NY",
        industry: "Data Analytics",
      },
    },
    {
      id: 3,
      company_id: 3,
      title: "UX Design Internship",
      category: "Design",
      description:
        "Create beautiful and functional user experiences for our products. Work with designers and developers to craft intuitive interfaces. Learn industry-standard tools like Figma and participate in user research sessions to understand customer needs.",
      requirements: '["Figma", "UI/UX", "Prototyping"]',
      status: "CLOSED" as const,
      slots: 2,
      deadline: new Date("2024-02-20"),
      created_at: new Date("2024-01-01"),
      company: {
        id: 3,
        name: "Design Studio",
        location: "Los Angeles, CA",
        industry: "Design",
      },
    },
    {
      id: 4,
      company_id: 4,
      title: "Backend Developer Internship",
      category: "Engineering",
      description:
        "Build scalable backend systems using modern technologies. Work on API development, database optimization, and microservices architecture.",
      requirements: '["Node.js", "PostgreSQL", "Docker"]',
      status: "OPEN" as const,
      slots: 4,
      deadline: new Date("2024-03-10"),
      created_at: new Date("2024-01-01"),
      company: {
        id: 4,
        name: "CloudTech",
        location: "Seattle, WA",
        industry: "Cloud Computing",
      },
    },
    {
      id: 5,
      company_id: 5,
      title: "Product Manager Internship",
      category: "Business",
      description:
        "Help shape the future of our products by working closely with engineering and design teams.",
      requirements: '["Communication", "Analytics", "Leadership"]',
      status: "OPEN" as const,
      slots: 2,
      deadline: new Date("2024-03-05"),
      created_at: new Date("2024-01-01"),
      company: {
        id: 5,
        name: "InnovateCo",
        location: "Boston, MA",
        industry: "Product Development",
      },
    },
    {
      id: 6,
      company_id: 6,
      title: "Marketing Specialist Internship",
      category: "Marketing",
      description:
        "Execute marketing campaigns and support brand development. Analyze campaign performance metrics and create engaging social media content.",
      requirements: '["Social Media", "Content Creation", "Analytics"]',
      status: "PENDING" as const,
      slots: 3,
      deadline: new Date("2024-03-20"),
      created_at: new Date("2024-01-01"),
      company: {
        id: 6,
        name: "Brand Agency",
        location: "Chicago, IL",
        industry: "Marketing",
      },
    },
    {
      id: 7,
      company_id: 1,
      title: "Full Stack Developer Internship",
      category: "Engineering",
      description:
        "Join our core product team to build features from front-to-back. You will be using React for the frontend and Node.js for the backend.",
      requirements: '["React", "Node.js", "TypeScript"]',
      status: "OPEN" as const,
      slots: 2,
      deadline: new Date("2024-04-01"),
      created_at: new Date("2024-02-01"),
      company: {
        id: 1,
        name: "Tech Corp",
        location: "San Francisco, CA",
        industry: "Technology",
      },
    },
  ];

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      internship.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const currentInternships = filteredInternships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

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

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Internship Posts Collection</h1>
          <p className="text-muted-foreground mt-2">
            Monitor all available internship opportunities from a supervisor
            perspective
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by title or company..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
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
              onClick={() => handleCategoryChange(category.toLowerCase())}
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
        Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, filteredInternships.length)} of{" "}
        {filteredInternships.length} internships
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {currentInternships.map((internship) => {
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
                  {internship.slots === 1 ? "position" : "positions"} available
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
                  {parseRequirements(internship.requirements).length > 2 && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-secondary/70 text-foreground"
                    >
                      +{parseRequirements(internship.requirements).length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Deadline */}
              <p className="text-xs text-muted-foreground mb-4">
                Deadline: {new Date(internship.deadline).toLocaleDateString()}
              </p>

              {/* Supervisor Details Button */}
              <Link href={`/supervisor/internship-posts/${internship.id}`}>
                <Button className="w-full bg-primary hover:bg-primary/90 mt-auto gap-2">
                  View Details
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
    </div>
  );
}
