"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Mail, Lock, User, Building2, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    university: "",
    major: "",
    password: "",
    confirmPassword: "",
  });

  const [hrData, setHrData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [supervisorData, setSupervisorData] = useState({
    name: "",
    university: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/student/dashboard");
      setIsLoading(false);
    }, 800);
  };

  const handleHRSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/company/dashboard");
      setIsLoading(false);
    }, 800);
  };

  const handleSupervisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/supervisor/dashboard");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 shadow-xl border-primary/10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create Your Account
          </h1>
          <p className="text-lg text-muted-foreground">
            Join the UIMS platform and manage internships
          </p>
        </div>
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Student</span>
            </TabsTrigger>
            <TabsTrigger value="hr" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">HR</span>
            </TabsTrigger>
            <TabsTrigger value="supervisor" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Supervisor</span>
            </TabsTrigger>
          </TabsList>

          {/* Student Registration */}
          <TabsContent value="student" className="space-y-6">
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Student Registration
              </h2>
              <p className="text-muted-foreground">
                Create your account to browse and apply for internships
              </p>
            </div>

            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="s-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-name"
                      placeholder="John Doe"
                      value={studentData.name}
                      onChange={(e) =>
                        setStudentData({ ...studentData, name: e.target.value })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="s-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-email"
                      type="email"
                      placeholder="john@university.edu"
                      value={studentData.email}
                      onChange={(e) =>
                        setStudentData({
                          ...studentData,
                          email: e.target.value,
                        })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* University */}
                <div className="space-y-2">
                  <Label htmlFor="s-uni" className="text-sm font-medium">
                    University
                  </Label>
                  <Input
                    id="s-uni"
                    placeholder="Stanford University"
                    value={studentData.university}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        university: e.target.value,
                      })
                    }
                    className="bg-secondary/50"
                    required
                  />
                </div>

                {/* Major */}
                <div className="space-y-2">
                  <Label htmlFor="s-major" className="text-sm font-medium">
                    Major
                  </Label>
                  <Input
                    id="s-major"
                    placeholder="Computer Science"
                    value={studentData.major}
                    onChange={(e) =>
                      setStudentData({ ...studentData, major: e.target.value })
                    }
                    className="bg-secondary/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="s-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-password"
                      type="password"
                      placeholder="••••••••"
                      value={studentData.password}
                      onChange={(e) =>
                        setStudentData({
                          ...studentData,
                          password: e.target.value,
                        })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="s-confirm" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={studentData.confirmPassword}
                      onChange={(e) =>
                        setStudentData({
                          ...studentData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border"
                  required
                />
                <span className="text-muted-foreground">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Student Account"}
              </Button>
            </form>
          </TabsContent>

          {/* HR Registration */}
          <TabsContent value="hr" className="space-y-6">
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                HR Registration
              </h2>
              <p className="text-muted-foreground">
                Register your company to post internship opportunities
              </p>
            </div>

            <form onSubmit={handleHRSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="hr-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-name"
                      placeholder="Sarah Johnson"
                      value={hrData.name}
                      onChange={(e) =>
                        setHrData({ ...hrData, name: e.target.value })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="hr-company" className="text-sm font-medium">
                    Company Name
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-company"
                      placeholder="Tech Corp Inc."
                      value={hrData.companyName}
                      onChange={(e) =>
                        setHrData({ ...hrData, companyName: e.target.value })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="hr-email" className="text-sm font-medium">
                    Company Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-email"
                      type="email"
                      placeholder="hr@company.com"
                      value={hrData.email}
                      onChange={(e) =>
                        setHrData({ ...hrData, email: e.target.value })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="hr-phone" className="text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="hr-phone"
                    placeholder="+1 (555) 123-4567"
                    value={hrData.phone}
                    onChange={(e) =>
                      setHrData({ ...hrData, phone: e.target.value })
                    }
                    className="bg-secondary/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="hr-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-password"
                      type="password"
                      placeholder="••••••••"
                      value={hrData.password}
                      onChange={(e) =>
                        setHrData({ ...hrData, password: e.target.value })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="hr-confirm" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={hrData.confirmPassword}
                      onChange={(e) =>
                        setHrData({
                          ...hrData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border"
                  required
                />
                <span className="text-muted-foreground">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register Company"}
              </Button>
            </form>
          </TabsContent>

          {/* Supervisor Registration */}
          <TabsContent value="supervisor" className="space-y-6">
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Supervisor Registration
              </h2>
              <p className="text-muted-foreground">
                Register as a faculty supervisor to monitor students
              </p>
            </div>

            <form onSubmit={handleSupervisorSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="sup-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="sup-name"
                      placeholder="Prof. Michael Chen"
                      value={supervisorData.name}
                      onChange={(e) =>
                        setSupervisorData({
                          ...supervisorData,
                          name: e.target.value,
                        })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="sup-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="sup-email"
                      type="email"
                      placeholder="prof@university.edu"
                      value={supervisorData.email}
                      onChange={(e) =>
                        setSupervisorData({
                          ...supervisorData,
                          email: e.target.value,
                        })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* University */}
                <div className="space-y-2">
                  <Label htmlFor="sup-uni" className="text-sm font-medium">
                    University
                  </Label>
                  <Input
                    id="sup-uni"
                    placeholder="Stanford University"
                    value={supervisorData.university}
                    onChange={(e) =>
                      setSupervisorData({
                        ...supervisorData,
                        university: e.target.value,
                      })
                    }
                    className="bg-secondary/50"
                    required
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="sup-dept" className="text-sm font-medium">
                    Department
                  </Label>
                  <Input
                    id="sup-dept"
                    placeholder="Computer Science"
                    value={supervisorData.department}
                    onChange={(e) =>
                      setSupervisorData({
                        ...supervisorData,
                        department: e.target.value,
                      })
                    }
                    className="bg-secondary/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="sup-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="sup-password"
                      type="password"
                      placeholder="••••••••"
                      value={supervisorData.password}
                      onChange={(e) =>
                        setSupervisorData({
                          ...supervisorData,
                          password: e.target.value,
                        })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="sup-confirm" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="sup-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={supervisorData.confirmPassword}
                      onChange={(e) =>
                        setSupervisorData({
                          ...supervisorData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10 bg-secondary/50"
                      required
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border"
                  required
                />
                <span className="text-muted-foreground">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register as Supervisor"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Login Link */}
        <div className="text-center pt-6 mt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-semibold"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
