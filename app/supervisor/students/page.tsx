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
import Link from "next/link";

export default function AssignedStudents() {
  const students = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@uni.edu",
      major: "CS",
      internship: "Frontend Dev - Tech Corp",
      status: "active",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@uni.edu",
      major: "CS",
      internship: "Backend Dev - CloudTech",
      status: "active",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@uni.edu",
      major: "Data Science",
      internship: "Data Science - DataCorp",
      status: "pending",
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james@uni.edu",
      major: "CS",
      internship: "Frontend Dev - Tech Corp",
      status: "active",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa@uni.edu",
      major: "CS",
      internship: "Pending assignment",
      status: "pending",
    },
    {
      id: 6,
      name: "David Martinez",
      email: "david@uni.edu",
      major: "IT",
      internship: "DevOps - CloudTech",
      status: "active",
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Assigned Students
        </h1>
        <p className="text-muted-foreground mt-2">
          View all students assigned to you
        </p>
      </div>

      <Card className="border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="font-semibold text-foreground">
                  Student Name
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Major
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Assigned Internship
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  className="border-border hover:bg-secondary/30"
                >
                  <TableCell className="font-medium text-foreground">
                    {student.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.major}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {student.internship}
                  </TableCell>
                  <TableCell>
                    {student.status === "active" ? (
                      <Badge className="bg-emerald-100 text-emerald-800">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/supervisor/students/${student.id}`}>
                      <Button variant="ghost" size="sm" className="text-accent">
                        View Profile
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
