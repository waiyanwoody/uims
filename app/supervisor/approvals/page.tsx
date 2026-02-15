import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Briefcase,
  User,
} from "lucide-react";

export default function Approvals() {
  const pendingApprovals = [
    {
      id: 1,
      student: "Tony Stark",
      company: "Stark Industries",
      position: "Senior Hardware Engineer",
      submittedDate: "2024-03-24",
      message: "Initial internship application for approval.",
    },
    {
      id: 2,
      student: "Natasha Romanoff",
      company: "Shield Tech",
      position: "Security Analyst Internship",
      submittedDate: "2024-03-23",
      message: "Requesting internship validation for security clearance.",
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Approval Queue
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Review and validate internship applications from your students.
        </p>
      </div>

      {/* Pending Approvals */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">Pending Reviews</h2>
          <Badge variant="outline" className="ml-2 font-bold">
            {pendingApprovals.length}
          </Badge>
        </div>

        {pendingApprovals.length > 0 ? (
          pendingApprovals.map((approval) => (
            <Card
              key={approval.id}
              className="p-5 border-border bg-card hover:border-primary/30 transition-all duration-300 shadow-sm overflow-hidden relative group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-bold text-primary">
                        {approval.student.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg leading-none">
                          {approval.student}
                        </h3>
                        <p className="text-sm text-primary font-medium mt-1">
                          {approval.position}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/20 px-3 py-1 text-[10px] font-bold">
                      Awaiting Action
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                          Company
                        </p>
                        <p className="text-sm font-semibold">
                          {approval.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                          Submitted
                        </p>
                        <p className="text-sm font-semibold">
                          {new Date(
                            approval.submittedDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background/50 p-3 rounded-lg border border-border/50 text-sm text-muted-foreground italic">
                    "{approval.message}"
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-end gap-3 min-w-[140px]">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:opacity-90 font-bold gap-2 shadow-lg shadow-primary/10">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/10 gap-2 bg-transparent font-bold"
                  >
                    <XCircle className="w-4 h-4" />
                    Decline
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 border-dashed border-2 text-center">
            <p className="text-muted-foreground font-medium">
              No pending approvals found
            </p>
          </Card>
        )}
      </div>

      {/* Stats and History */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-border col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-foreground">Recent Decisions</h3>
            <Button variant="link" className="text-xs h-auto p-0 font-bold">
              View History
            </Button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: "Alex Johnson",
                date: "2024-03-22",
                action: "Approved",
                role: "Software Intern",
              },
              {
                name: "Sarah Chen",
                date: "2024-03-21",
                action: "Approved",
                role: "Backend Developer",
              },
              {
                name: "Michael Rodriguez",
                date: "2024-03-20",
                action: "Approved",
                role: "UI/UX Designer",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold block">{item.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">
                      {item.role}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground block">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[9px] bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 border-none px-1 h-4"
                  >
                    {item.action}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border bg-primary/5 border-primary/10">
          <h3 className="font-bold text-foreground mb-4">Rejection Log</h3>
          <div className="flex flex-col items-center justify-center h-48 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <XCircle className="w-6 h-6 text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground font-medium italic">
              All clear, supervisor.
              <br />
              No applications have been rejected this month.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
