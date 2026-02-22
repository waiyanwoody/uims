"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Users,
  ChevronLeft,
  Calendar,
  Layers,
  Mail,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function InternshipPostDetails() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  // Mock internships data matching the previous page
  const internships = [
    {
      id: 1,
      company_id: 1,
      title: "Frontend Developer Internship",
      category: "Engineering",
      description:
        "We are seeking a passionate Frontend Developer intern to join our dynamic team. You will work on building responsive web applications. This is an excellent opportunity to gain hands-on experience while working on real-world projects.",
      requirements: ["React", "TypeScript", "Tailwind CSS"],
      status: "OPEN" as const,
      slots: 5,
      deadline: "2024-03-15",
      created_at: "2024-01-01",
      company: {
        id: 1,
        name: "Tech Corp",
        location: "San Francisco, CA",
        industry: "Technology",
        contact_email: "hr@techcorp.com",
      },
    },
    {
      id: 2,
      company_id: 2,
      title: "Data Science Internship",
      category: "Data Science",
      description:
        "Join our data science team and work on cutting-edge machine learning projects. You will analyze large datasets, build predictive models, and contribute to data-driven decision making.",
      requirements: ["Python", "Machine Learning", "SQL"],
      status: "OPEN" as const,
      slots: 3,
      deadline: "2024-02-28",
      created_at: "2024-01-01",
      company: {
        id: 2,
        name: "Data Solutions Inc.",
        location: "New York, NY",
        industry: "Data Analytics",
        contact_email: "careers@datasolutions.com",
      },
    },
    {
      id: 3,
      company_id: 3,
      title: "UX Design Internship",
      category: "Design",
      description:
        "Create beautiful and functional user experiences for our products. Work with designers and developers to craft intuitive interfaces. Learn industry-standard tools like Figma and participate in user research sessions to understand customer needs.",
      requirements: ["Figma", "UI/UX", "Prototyping"],
      status: "CLOSED" as const,
      slots: 2,
      deadline: "2024-02-20",
      created_at: "2024-01-01",
      company: {
        id: 3,
        name: "Design Studio",
        location: "Los Angeles, CA",
        industry: "Design",
        contact_email: "jobs@designstudio.com",
      },
    },
  ];

  const internship = internships.find((i) => i.id === id) || internships[0];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{internship.title}</h1>
          <p className="text-muted-foreground">{internship.company.name}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Role Overview Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Role Overview</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 whitespace-pre-wrap leading-relaxed">
            {internship.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Company
                  </p>
                  <p className="font-medium">{internship.company.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Location
                  </p>
                  <p className="font-medium">{internship.company.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Category
                  </p>
                  <p className="font-medium">{internship.category}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Slots Available
                  </p>
                  <p className="font-medium">{internship.slots} Positions</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Deadline
                  </p>
                  <p className="font-medium">{internship.deadline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Posted On
                  </p>
                  <p className="font-medium">{internship.created_at}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Key Requirements
          </h3>
          <div className="flex flex-wrap gap-2">
            {internship.requirements.map((req) => (
              <Badge key={req} variant="secondary" className="px-3 py-1">
                {req}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Company Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            About Company
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{internship.company.name}</h3>
                <p className="text-muted-foreground">
                  {internship.company.industry || "Software & Technology"}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary"
              >
                Verified Company
              </Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A leading company in the industry, committed to providing
              excellent training and mentorship to aspiring professionals. We
              foster a culture of innovation, collaboration, and continuous
              learning.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary hover:underline cursor-pointer">
              <Mail className="w-4 h-4" />
              <span>{internship.company.contact_email}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
