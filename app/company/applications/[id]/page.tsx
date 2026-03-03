"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { ChevronLeft, Loader2, CheckCircle, XCircle, Calendar, Clock } from "lucide-react";

import { useApplicationDetails } from "@/hooks/StudentHook/useApplicationDetails";
import { useReviewApplication } from "@/hooks/CompanyHook/useReviewApplication";

export default function ApplicationViewDetails() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { application, loading, error } = useApplicationDetails(id);
  const { reviewApplication, isSubmitting } = useReviewApplication();

  const [mode, setMode] = useState<null | "ACCEPT" | "REJECT">(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

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

  const accept = async () => {
    const result = await reviewApplication(id, {
      status: "INTERVIEW",
      interviewDate: `${date}T${time}`,
      message,
    });
    if (result.success) router.back();
  };

  const reject = async () => {
    const result = await reviewApplication(id, { status: "REJECTED" });
    if (result.success) router.back();
  };

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-800",
    INTERVIEW: "bg-blue-100 text-blue-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  } as const;

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
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
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
          <div className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <Badge className={statusColor[application.status]}>{application.status}</Badge>
          </div>
        </div>

        <a
          href={application.cvForm.filePath}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-2"
        >
          <Button variant="outline">View CV</Button>
        </a>
      </Card>

      {/* Decision Buttons */}
      <Card className="p-6 space-y-4 shadow-lg  hover:shadow-xl transition-all duration-200">
        <h3 className="text-lg font-bold">Decision</h3>

        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => setMode("ACCEPT")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle />
            Accept to Interview
          </Button>

          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={() => setMode("REJECT")}
          >
            <XCircle />
            Reject
          </Button>
        </div>
      </Card>

      {/* ACCEPT FORM */}
      {mode === "ACCEPT" && (
        <Card className="p-6 space-y-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-blue-600">Interview Setup</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Interview Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2 text-gray-400" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Interview Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2 text-gray-400" />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Message to Student</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="You are invited to interview..."
            />
          </div>

          <Button
            onClick={accept}
            disabled={isSubmitting || !date || !time}
            className="flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="animate-spin h-4 w-4" />}
            Confirm Accept
          </Button>
        </Card>
      )}

      {/* REJECT CONFIRM */}
      {mode === "REJECT" && (
        <Card className="p-6 space-y-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-red-600">Reject Application?</h3>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to reject this application? This action cannot be undone.
          </p>
          <Button
            variant="destructive"
            onClick={reject}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="animate-spin h-4 w-4" />}
            Reject Now
          </Button>
        </Card>
      )}
    </div>
  );
}