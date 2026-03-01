"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Building2,
  Briefcase,
  GraduationCap,
  Eye,
  EyeOff,
  MapPin,
  ScrollText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterStudent } from "@/hooks/StudentHook/useRegisterStudent";
import { toast } from "sonner";
import { useRegisterCompany } from "@/hooks/useRegisterCompany";
const TermsContent = () => (
  <div className="space-y-6">
    <section>
      <h3 className="font-bold text-lg flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">
          1
        </span>
        General Usage
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        UIMS provides a platform for academic-to-professional transition. By
        using the service, you represent that you are affiliated with a
        recognized institution and provide truthful information.
      </p>
    </section>
    <section>
      <h3 className="font-bold text-lg flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">
          2
        </span>
        Data Privacy
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Personal and academic data is stored securely. Students' data is only
        shared with potential employers upon application. Employers agree to
        handle student data with strict confidentiality.
      </p>
    </section>
    <section>
      <h3 className="font-bold text-lg flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">
          3
        </span>
        Professionalism
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        All users (Students, Companies) must maintain professional standards.
        Harassment, deceptive listings, or falsification of evaluations may lead
        to permanent account suspension.
      </p>
    </section>
    <section>
      <h3 className="font-bold text-lg flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">
          4
        </span>
        Liability
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        UIMS is an educational facilitation tool. Successful placement depends
        on the interview process and academic requirements, not solely on
        platform usage.
      </p>
    </section>
  </div>
);

const TermsDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        type="button"
        className="text-primary hover:underline font-medium focus:outline-none"
      >
        Terms and Conditions
      </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[550px] max-h-[90vh]">
      <DialogHeader>
        <div className="flex items-center gap-2 text-primary mb-1">
          <ScrollText className="w-5 h-5" />
          <span className="font-bold text-sm tracking-widest">UIMS</span>
        </div>
        <DialogTitle className="text-2xl">Terms of Service</DialogTitle>
        <DialogDescription>
          Please review the agreement before proceeding with registration.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="max-h-[50vh] pr-4 mt-4">
        <TermsContent />
      </ScrollArea>
      <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4 sm:justify-between items-center sm:items-end">
        <p className="text-[10px] text-muted-foreground">
          Last updated: February 2026
        </p>
        <Link href="/terms" className="text-xs text-primary hover:underline">
          View full full legal document &rarr;
        </Link>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const PasswordStrengthMeter = ({ score }: { score: number }) => {
  const segments = [0, 1, 2, 3, 4];
  const getColor = (index: number) => {
    if (score === 0) return "bg-muted";
    if (score <= 2) return index < score ? "bg-destructive" : "bg-muted";
    if (score <= 4) return index < score ? "bg-yellow-500" : "bg-muted";
    return "bg-green-500";
  };

  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1 h-1">
        {segments.map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 rounded-full transition-colors duration-300 ${getColor(
              i
            )}`}
          />
        ))}
      </div>
      <p className="text-[10px] font-medium text-muted-foreground flex justify-between uppercase tracking-wider">
        <span>Strength: {score > 0 ? labels[score - 1] : "None"}</span>
        <span>{score}/5</span>
      </p>
    </div>
  );
};

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showHRSuccessDialog, setShowHRSuccessDialog] = useState(false);
  const [showStudentErrors, setShowStudentErrors] = useState(false);
  const [showHrErrors, setShowHrErrors] = useState(false);
  const [showSupervisorErrors, setShowSupervisorErrors] = useState(false);

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    studentNumber: "",
    major: "",
    address: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [hrData, setHrData] = useState({
    companyName: "",
    industry: "",
    location: "",
    hrName: "",
    hrEmail: "",
    hrPhone: "",
    hrPassword: "",
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

  const isStrongPassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return score;
  };

  const { registerStudent, loading: studentLoading } = useRegisterStudent();
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password validation
    if (studentData.password !== studentData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isStrongPassword(studentData.password)) {
      toast.error("Weak Password", {
        description: "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
      });
      return;
    }

    try {
      console.log("Registering student with data:", studentData);
      await registerStudent({
        name: studentData.name,
        email: studentData.email,
        studentNumber: "YKPT - " + studentData.studentNumber,
        major: studentData.major,
        address: studentData.address,
        gender: studentData.gender as "MALE" | "FEMALE",
        password: studentData.password,
      });
      toast.success("Registration Successful!", {
        description:
          "Your student account has been created. You can now log in and start applying for internships.",
      });
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed", {
        description: "An error occurred during registration. Please try again later.",
      });
    }
  };

  const { registerCompany, loading: hrLoading } = useRegisterCompany();

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password check
    if (hrData.hrPassword !== hrData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isStrongPassword(hrData.hrPassword)) {
      toast.error("Weak Password", {
        description: "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
      });
      return;
    }

    try {
      const { confirmPassword, ...payload } = hrData;

      await registerCompany(payload);

      toast.success("Registration Successful!", {
        description:
          "Your HR account has been created. A supervisor will review your application within 1-2 business days. You will receive an email notification once your account is approved.",
      });
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed", {
        description: "An error occurred during registration. Please try again later.",
      });
    }
  };

  const handleSupervisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSupervisorErrors(true);

    const isMissingFields = !supervisorData.name || !supervisorData.university || !supervisorData.department || !supervisorData.email || !supervisorData.password || !supervisorData.confirmPassword;

    if (isMissingFields) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      router.push("/supervisor/dashboard");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full">
      <Card className="p-8 shadow-xl border-primary/10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-1">
            Join the university internship portal
          </p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </TabsTrigger>
            <TabsTrigger value="hr" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Company</span>
            </TabsTrigger>
            {/* <TabsTrigger value="supervisor" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Supervisor</span>
            </TabsTrigger> */}
          </TabsList>

          {/* Student Registration */}
          <TabsContent value="student">
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="s-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-name"
                      placeholder="John Doe"
                      value={studentData.name}
                      onChange={(e) =>
                        setStudentData({ ...studentData, name: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-email">Email</Label>
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
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-uni">Student Number</Label>
                  <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    {/* Static Prefix */}
                    <span className="text-muted-foreground pr-1 select-none font-medium">
                      YKPT -
                    </span>

                    {/* Editable Number Input */}
                    <input
                      id="s-uni"
                      type="number"
                      placeholder="00000"
                      className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      value={studentData.studentNumber}
                      onChange={(e) =>
                        setStudentData({
                          ...studentData,
                          studentNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-major">Major</Label>
                  <Input
                    id="s-major"
                    placeholder="Computer Science"
                    value={studentData.major}
                    onChange={(e) =>
                      setStudentData({ ...studentData, major: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-gender">Gender</Label>
                  <select
                    id="s-gender"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={studentData.gender}
                    onChange={(e) =>
                      setStudentData({ ...studentData, gender: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-address">Address</Label>
                  <Input
                    id="s-address"
                    placeholder="Your Home Address"
                    value={studentData.address}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={studentData.password}
                      onChange={(e) =>
                        setStudentData({
                          ...studentData,
                          password: e.target.value,
                        })
                      }
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <PasswordStrengthMeter score={getPasswordStrength(studentData.password)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={studentData.confirmPassword}
                      onChange={(e) =>
                        setStudentData({
                          ...studentData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm pt-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border"
                  required
                />
                <span className="text-muted-foreground">
                  I agree to the <TermsDialog />
                </span>
              </label>

              <Button
                type="submit"
                className="w-full"
                disabled={studentLoading}
              >
                {studentLoading ? "Creating..." : "Register as Student"}
              </Button>
            </form>
          </TabsContent>

          {/* HR Registration */}
          <TabsContent value="hr">
            <form onSubmit={handleCompanySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hr-name">HR Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-name"
                      placeholder="Sarah Johnson"
                      value={hrData.hrName}
                      onChange={(e) =>
                        setHrData({ ...hrData, hrName: e.target.value })
                      }
                      className={`pl-10 ${showHrErrors && !hrData.hrName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr-company">Company</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-company"
                      placeholder="Tech Corp Inc."
                      value={hrData.companyName}
                      onChange={(e) =>
                        setHrData({ ...hrData, companyName: e.target.value })
                      }
                      className={`pl-10 ${showHrErrors && !hrData.companyName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr-industry">Industry</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-industry"
                      placeholder="Technology, Finance, etc."
                      value={hrData.industry}
                      onChange={(e) =>
                        setHrData({ ...hrData, industry: e.target.value })
                      }
                      className={`pl-10 ${showHrErrors && !hrData.industry ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr-email">HR Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-email"
                      type="email"
                      placeholder="hr@company.com"
                      value={hrData.hrEmail}
                      onChange={(e) =>
                        setHrData({ ...hrData, hrEmail: e.target.value })
                      }
                      className={`pl-10 ${showHrErrors && !hrData.hrEmail ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr-phone">Phone</Label>
                  <Input
                    id="hr-phone"
                    placeholder="+1 (555) 123-4567"
                    value={hrData.hrPhone}
                    onChange={(e) =>
                      setHrData({ ...hrData, hrPhone: e.target.value })
                    }
                    className={showHrErrors && !hrData.hrPhone ? "border-destructive focus-visible:ring-destructive" : ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr-address">Company Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-address"
                      placeholder="Enter company headquarters address"
                      value={hrData.location}
                      onChange={(e) =>
                        setHrData({ ...hrData, location: e.target.value })
                      }
                      className={`pl-10 ${showHrErrors && !hrData.location ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={hrData.hrPassword}
                      onChange={(e) =>
                        setHrData({ ...hrData, hrPassword: e.target.value })
                      }
                      className={`pl-10 pr-10 ${showHrErrors && !hrData.hrPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <PasswordStrengthMeter score={getPasswordStrength(hrData.hrPassword)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={hrData.confirmPassword}
                      onChange={(e) =>
                        setHrData({
                          ...hrData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`pl-10 pr-10 ${showHrErrors && !hrData.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm pt-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border"
                  required
                />
                <span className="text-muted-foreground">
                  I agree to the <TermsDialog />
                </span>
              </label>

              <Button type="submit" className="w-full" disabled={hrLoading}>
                {hrLoading ? "Registering..." : "Register as Company"}
              </Button>
            </form>
          </TabsContent>

          {/* Supervisor Registration */}
          <TabsContent value="supervisor">
            <form onSubmit={handleSupervisorSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sup-name">Full Name</Label>
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
                      className={`pl-10 ${showSupervisorErrors && !supervisorData.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sup-email">Email</Label>
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
                      className={`pl-10 ${showSupervisorErrors && !supervisorData.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sup-uni">University</Label>
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
                    className={showSupervisorErrors && !supervisorData.university ? "border-destructive focus-visible:ring-destructive" : ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sup-dept">Department</Label>
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
                    className={showSupervisorErrors && !supervisorData.department ? "border-destructive focus-visible:ring-destructive" : ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="sup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={supervisorData.password}
                      onChange={(e) =>
                        setSupervisorData({
                          ...supervisorData,
                          password: e.target.value,
                        })
                      }
                      className={`pl-10 pr-10 ${showSupervisorErrors && !supervisorData.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sup-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="sup-confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={supervisorData.confirmPassword}
                      onChange={(e) =>
                        setSupervisorData({
                          ...supervisorData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`pl-10 pr-10 ${showSupervisorErrors && !supervisorData.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm pt-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border"
                  required
                />
                <span className="text-muted-foreground">
                  I agree to the <TermsDialog />
                </span>
              </label>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Register as Supervisor"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center pt-6 mt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>

      {/* HR Registration Success Dialog */}
      <Dialog open={showHRSuccessDialog} onOpenChange={setShowHRSuccessDialog}>
        <DialogContent className="sm:max-w-[450px] p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Clock className="w-10 h-10 text-primary animate-pulse" />
            </div>

            <DialogHeader className="space-y-3 flex flex-col items-center">
              <DialogTitle className="text-3xl font-bold tracking-tight text-foreground">
                Registration Pending
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed px-4">
                Your HR account has been successfully registered. To maintain
                platform security, a supervisor must review and approve your
                application.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="w-full pt-4">
              <Button
                type="button"
                className="w-full h-12 text-md font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                onClick={() => router.push("/auth/login")}
              >
                Return to Login
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
