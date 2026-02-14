import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

export default function Approvals() {
  const pendingApprovals = [
    {
      id: 1,
      student: "Emma Davis",
      company: "DataCorp",
      position: "Data Science Internship",
      submittedDate: "2024-02-09",
      message: "Awaiting supervisor approval for internship start",
    },
    {
      id: 2,
      student: "Lisa Anderson",
      company: "TechStart",
      position: "Software Engineer Internship",
      submittedDate: "2024-02-08",
      message: "Student requesting approval for position change",
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Approval Tracking
        </h1>
        <p className="text-muted-foreground mt-2">
          Review and manage pending approvals
        </p>
      </div>

      {/* Pending Approvals */}
      <div className="space-y-4">
        {pendingApprovals.length > 0 ? (
          pendingApprovals.map((approval) => (
            <Card
              key={approval.id}
              className="p-6 border border-border hover:shadow-md"
            >
              <div className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2">
                  <p className="font-semibold text-foreground">
                    {approval.student}
                  </p>
                  <p className="text-sm text-accent font-medium">
                    {approval.position}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {approval.company}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Submitted</p>
                  <p className="text-sm text-foreground">
                    {new Date(approval.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <Badge className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/20 mb-3">
                    Pending Review
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {approval.message}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10 gap-1 bg-transparent"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 border border-border text-center">
            <p className="text-muted-foreground">No pending approvals</p>
          </Card>
        )}
      </div>

      {/* Approved & Rejected */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">
            Recently Approved
          </h3>
          <div className="space-y-3">
            {[
              { name: "Sarah Johnson", date: "2024-02-05" },
              { name: "Michael Chen", date: "2024-02-03" },
              { name: "James Wilson", date: "2024-01-30" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground">{item.name}</span>
                <span className="text-muted-foreground">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">
            Rejection History
          </h3>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              No rejections on record
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
