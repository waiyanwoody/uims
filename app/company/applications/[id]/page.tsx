"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ChevronLeft, Loader2, CheckCircle, XCircle } from "lucide-react";

import { useApplicationDetails } from "@/hooks/StudentHook/useApplicationDetails";
import { useUpdateApplicationStatus } from "@/hooks/CompanyHook/useUpdateApplicationStatus";
import { toast } from "sonner";

export default function ApplicationViewDetails() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { application, loading, error, refetch } = useApplicationDetails(id);
  const { moveToNextStep, rejectApplication, isUpdating } = useUpdateApplicationStatus();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500 font-semibold">
        Failed to load application
      </div>
    );
  }

  const handleNextStep = async () => {
    const result = await moveToNextStep(id, application.status);
    if (result.success) {
      toast.success("Application moved to next step");
      refetch()
    };
  };

  const handleReject = async () => {
    const result = await rejectApplication(id);
    if (result.success) refetch();
  };

  // Status stepper
  const steps = ["PENDING", "INTERVIEWING", "APPROVED"];
  const currentStepIndex = steps.indexOf(application.status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "INTERVIEWING":
        return "bg-blue-100 text-blue-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ChevronLeft />
        Back
      </Button>

      {/* Application Info */}
      <Card className="p-6 space-y-4 shadow-lg hover:shadow-xl transition-all duration-200">
        <h2 className="text-2xl font-bold">
          Application Review
        </h2>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Student:</span> {application.student.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {application.student.email}
          </p>
          <p>
            <span className="font-semibold">Internship:</span> {application.internship.title}
          </p>

          <div className="flex flex-col space-y-4">
            {/* Stepper */}
          <div className="flex items-center gap-4 mt-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index <= currentStepIndex ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm font-medium ${
                    index <= currentStepIndex ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && <div className="w-8 h-[2px] bg-gray-300"></div>}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4">
            {application.status !== "APPROVED" && application.status !== "REJECTED" && (
              <Button
                onClick={handleNextStep}
                disabled={isUpdating}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <CheckCircle /> Move to Next Step
              </Button>
            )}

            {application.status !== "REJECTED" && application.status !== "APPROVED" && (
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isUpdating}
                className="flex items-center gap-2"
              >
                <XCircle /> Reject
              </Button>
              )}
              
                {application.status === "REJECTED" && (
                <Badge className={getStatusColor(application.status)}>
                  Rejected
                </Badge>
                )}
                {application.status === "INTERVIEWING" && (
                <Badge className={getStatusColor(application.status)}>
                  Interviewing
                </Badge>
                )}
                {application.status === "APPROVED" && (
                <Badge className={getStatusColor(application.status)}>
                  Approved
                </Badge>
                )}
          </div>
          </div>
        </div>
      </Card>
    </div>
  );
}