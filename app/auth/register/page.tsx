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

// ─── Helpers ────────────────────────────────────────────────────────────────

function fieldCls(invalid: boolean, extra = "") {
  return [extra, invalid ? "border-destructive focus-visible:ring-destructive" : ""]
    .filter(Boolean)
    .join(" ");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── Sub-components ─────────────────────────────────────────────────────────

const TermsContent = () => (
  <div className="space-y-6">
    <section>
      <h3 className="font-bold text-lg flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">1</span>
        General Usage
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        UIMS provides a platform for academic-to-professional transition. By using the service, you
        represent that you are affiliated with a recognized institution and provide truthful information.
      </p>
    </section>
    <section>
      <h3 className="font-bold text-lg flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">2</span>
        Data Privacy
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Personal and academic data is stored securely. Students' data is only shared with potential
        employers upon application. Employers agree to handle student data with strict confidentiality.
      </p>
    </section>
    <section>
      <h3 className="font-bold text-lg flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">3</span>
        Professionalism
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        All users (Students, Companies) must maintain professional standards. Harassment, deceptive
        listings, or falsification of evaluations may lead to permanent account suspension.
      </p>
    </section>
    <section>
      <h3 className="font-bold text-lg flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">4</span>
        Liability
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        UIMS is an educational facilitation tool. Successful placement depends on the interview process
        and academic requirements, not solely on platform usage.
      </p>
    </section>
  </div>
);

const TermsDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <button type="button" className="text-primary hover:underline font-medium focus:outline-none">
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
        <DialogDescription>Please review the agreement before proceeding with registration.</DialogDescription>
      </DialogHeader>
      <ScrollArea className="max-h-[50vh] pr-4 mt-4">
        <TermsContent />
      </ScrollArea>
      <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4 sm:justify-between items-center sm:items-end">
        <p className="text-[10px] text-muted-foreground">Last updated: February 2026</p>
        <Link href="/terms" className="text-xs text-primary hover:underline">
          View full legal document &rarr;
        </Link>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const PasswordStrengthMeter = ({ score }: { score: number }) => {
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
        {[0, 1, 2, 3, 4].map((_, i) => (
          <div key={i} className={`h-full flex-1 rounded-full transition-colors duration-300 ${getColor(i)}`} />
        ))}
      </div>
      <p className="text-[10px] font-medium text-muted-foreground flex justify-between uppercase tracking-wider">
        <span>Strength: {score > 0 ? labels[score - 1] : "None"}</span>
        <span>{score}/5</span>
      </p>
    </div>
  );
};

// ─── Types ───────────────────────────────────────────────────────────────────

type StudentFields = "name" | "email" | "studentNumber" | "major" | "address" | "gender" | "password" | "confirmPassword";
type HrFields = "companyName" | "industry" | "location" | "hrName" | "hrEmail" | "hrPhone" | "hrPassword" | "confirmPassword";
type SupervisorFields = "name" | "university" | "department" | "email" | "password" | "confirmPassword";

// ─── Main Component ──────────────────────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showHRSuccessDialog, setShowHRSuccessDialog] = useState(false);

  // ── Invalid-field trackers (set on submit, cleared on change) ──
  const [studentErrors, setStudentErrors] = useState<Partial<Record<StudentFields, boolean>>>({});
  const [hrErrors, setHrErrors] = useState<Partial<Record<HrFields, boolean>>>({});
  const [supervisorErrors, setSupervisorErrors] = useState<Partial<Record<SupervisorFields, boolean>>>({});

  // ── Form state ──
  const [studentData, setStudentData] = useState({
    name: "", email: "", studentNumber: "", major: "",
    address: "", gender: "", password: "", confirmPassword: "",
  });

  const [hrData, setHrData] = useState({
    companyName: "", industry: "", location: "",
    hrName: "", hrEmail: "", hrPhone: "",
    hrPassword: "", confirmPassword: "",
  });

  const [supervisorData, setSupervisorData] = useState({
    name: "", university: "", department: "",
    email: "", password: "", confirmPassword: "",
  });

  // ── Password helpers ──
  const isStrongPassword = (pw: string) =>
    pw.length >= 8 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(pw);

  const getPasswordStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pw)) score++;
    return score;
  };

  // ── Generic field-change helpers that also clear the error for that field ──
  function changeStudent<K extends StudentFields>(field: K, value: string) {
    setStudentData((prev) => ({ ...prev, [field]: value }));
    if (studentErrors[field]) {
      // For email, only clear the error once the format is valid
      if (field === "email") {
        if (isValidEmail(value)) setStudentErrors((prev) => ({ ...prev, [field]: false }));
      } else {
        setStudentErrors((prev) => ({ ...prev, [field]: false }));
      }
    }
  }

  function changeHr<K extends HrFields>(field: K, value: string) {
    setHrData((prev) => ({ ...prev, [field]: value }));
    if (hrErrors[field]) {
      if (field === "hrEmail") {
        if (isValidEmail(value)) setHrErrors((prev) => ({ ...prev, [field]: false }));
      } else {
        setHrErrors((prev) => ({ ...prev, [field]: false }));
      }
    }
  }

  function changeSupervisor<K extends SupervisorFields>(field: K, value: string) {
    setSupervisorData((prev) => ({ ...prev, [field]: value }));
    if (supervisorErrors[field]) {
      if (field === "email") {
        if (isValidEmail(value)) setSupervisorErrors((prev) => ({ ...prev, [field]: false }));
      } else {
        setSupervisorErrors((prev) => ({ ...prev, [field]: false }));
      }
    }
  }

  // ── Hooks ──
  const { registerStudent, loading: studentLoading } = useRegisterStudent();
  const { registerCompany, loading: hrLoading } = useRegisterCompany();

  // ── Student submit ──
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect empty required fields
    const errors: Partial<Record<StudentFields, boolean>> = {};
    (["name", "email", "studentNumber", "major", "address", "gender"] as StudentFields[]).forEach((f) => {
      if (!studentData[f]) errors[f] = true;
    });
    if (studentData.email && !isValidEmail(studentData.email)) errors.email = true;
    if (!studentData.password) errors.password = true;
    if (!studentData.confirmPassword) errors.confirmPassword = true;

    if (Object.keys(errors).length > 0) {
      setStudentErrors(errors);
      const hasInvalidEmail = studentData.email && !isValidEmail(studentData.email);
      toast.error(hasInvalidEmail ? "Invalid Email" : "Missing Information", {
        description: hasInvalidEmail
          ? "Please enter a valid email address (e.g. john@university.edu)."
          : "Please fill in all required fields.",
      });
      return;
    }

    if (studentData.password !== studentData.confirmPassword) {
      setStudentErrors({ confirmPassword: true });
      toast.error("Passwords do not match");
      return;
    }

    if (!isStrongPassword(studentData.password)) {
      setStudentErrors({ password: true });
      toast.error("Weak Password", {
        description: "Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.",
      });
      return;
    }

    try {
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
        description: "Your student account has been created. You can now log in.",
      });
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed", { description: "An error occurred. Please try again." });
    }
  };

  // ── Company submit ──
  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<Record<HrFields, boolean>> = {};
    (["hrName", "companyName", "industry", "hrEmail", "hrPhone", "location"] as HrFields[]).forEach((f) => {
      if (!hrData[f]) errors[f] = true;
    });
    if (hrData.hrEmail && !isValidEmail(hrData.hrEmail)) errors.hrEmail = true;
    if (!hrData.hrPassword) errors.hrPassword = true;
    if (!hrData.confirmPassword) errors.confirmPassword = true;

    if (Object.keys(errors).length > 0) {
      setHrErrors(errors);
      const hasInvalidEmail = hrData.hrEmail && !isValidEmail(hrData.hrEmail);
      toast.error(hasInvalidEmail ? "Invalid Email" : "Missing Information", {
        description: hasInvalidEmail
          ? "Please enter a valid email address (e.g. hr@company.com)."
          : "Please fill in all required fields.",
      });
      return;
    }

    if (hrData.hrPassword !== hrData.confirmPassword) {
      setHrErrors({ confirmPassword: true });
      toast.error("Passwords do not match");
      return;
    }

    if (!isStrongPassword(hrData.hrPassword)) {
      setHrErrors({ hrPassword: true });
      toast.error("Weak Password", {
        description: "Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.",
      });
      return;
    }

    try {
      const { confirmPassword, ...payload } = hrData;
      await registerCompany(payload);
      toast.success("Registration Successful!", {
        description: "Your HR account has been created. A supervisor will review it within 1-2 business days.",
      });
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed", { description: "An error occurred. Please try again." });
    }
  };

  // ── Supervisor submit ──
  const handleSupervisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<Record<SupervisorFields, boolean>> = {};
    (["name", "university", "department", "email", "password", "confirmPassword"] as SupervisorFields[]).forEach((f) => {
      if (!supervisorData[f]) errors[f] = true;
    });
    if (supervisorData.email && !isValidEmail(supervisorData.email)) errors.email = true;

    if (Object.keys(errors).length > 0) {
      setSupervisorErrors(errors);
      const hasInvalidEmail = supervisorData.email && !isValidEmail(supervisorData.email);
      toast.error(hasInvalidEmail ? "Invalid Email" : "Missing Information", {
        description: hasInvalidEmail
          ? "Please enter a valid email address (e.g. prof@university.edu)."
          : "Please fill in all required fields.",
      });
      return;
    }

    if (supervisorData.password !== supervisorData.confirmPassword) {
      setSupervisorErrors({ confirmPassword: true });
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      router.push("/supervisor/dashboard");
      setIsLoading(false);
    }, 800);
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      <Card className="p-8 shadow-xl border-primary/10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-1">Join the university internship portal</p>
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
          </TabsList>

          {/* ── Student Registration ────────────────────────────────────── */}
          <TabsContent value="student">
            <form onSubmit={handleStudentSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="s-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-name"
                      placeholder="John Doe"
                      value={studentData.name}
                      onChange={(e) => changeStudent("name", e.target.value)}
                      className={fieldCls(!!studentErrors.name, "pl-10")}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="s-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-email"
                      type="email"
                      placeholder="john@university.edu"
                      value={studentData.email}
                      onChange={(e) => changeStudent("email", e.target.value)}
                      className={fieldCls(!!studentErrors.email, "pl-10")}
                      required
                    />
                  </div>
                </div>

                {/* Student Number */}
                <div className="space-y-2">
                  <Label htmlFor="s-uni">Student Number</Label>
                  <div
                    className={[
                      "flex h-10 w-full items-center rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors",
                      "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2",
                      studentErrors.studentNumber
                        ? "border-destructive focus-within:ring-destructive"
                        : "border-input focus-within:ring-ring",
                    ].join(" ")}
                  >
                    <span className="text-muted-foreground pr-1 select-none font-medium">YKPT -</span>
                    <input
                      id="s-uni"
                      type="number"
                      placeholder="00000"
                      className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                      value={studentData.studentNumber}
                      onChange={(e) => changeStudent("studentNumber", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Major */}
                <div className="space-y-2">
                  <Label htmlFor="s-major">Major</Label>
                  <Input
                    id="s-major"
                    placeholder="Computer Science"
                    value={studentData.major}
                    onChange={(e) => changeStudent("major", e.target.value)}
                    className={fieldCls(!!studentErrors.major)}
                    required
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="s-gender">Gender</Label>
                  <select
                    id="s-gender"
                    className={[
                      "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2",
                      studentErrors.gender
                        ? "border-destructive focus:ring-destructive"
                        : "border-input focus:ring-ring",
                    ].join(" ")}
                    value={studentData.gender}
                    onChange={(e) => changeStudent("gender", e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="s-address">Address</Label>
                  <Input
                    id="s-address"
                    placeholder="Your Home Address"
                    value={studentData.address}
                    onChange={(e) => changeStudent("address", e.target.value)}
                    className={fieldCls(!!studentErrors.address)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="s-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={studentData.password}
                      onChange={(e) => changeStudent("password", e.target.value)}
                      className={fieldCls(!!studentErrors.password, "pl-10 pr-10")}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <PasswordStrengthMeter score={getPasswordStrength(studentData.password)} />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="s-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="s-confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={studentData.confirmPassword}
                      onChange={(e) => changeStudent("confirmPassword", e.target.value)}
                      className={fieldCls(!!studentErrors.confirmPassword, "pl-10 pr-10")}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm pt-2">
                <input type="checkbox" className="w-4 h-4 rounded border-border" required />
                <span className="text-muted-foreground">I agree to the <TermsDialog /></span>
              </label>

              <Button type="submit" className="w-full" disabled={studentLoading}>
                {studentLoading ? "Creating..." : "Register as Student"}
              </Button>
            </form>
          </TabsContent>

          {/* ── HR Registration ─────────────────────────────────────────── */}
          <TabsContent value="hr">
            <form onSubmit={handleCompanySubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* HR Name */}
                <div className="space-y-2">
                  <Label htmlFor="hr-name">HR Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-name"
                      placeholder="Sarah Johnson"
                      value={hrData.hrName}
                      onChange={(e) => changeHr("hrName", e.target.value)}
                      className={fieldCls(!!hrErrors.hrName, "pl-10")}
                      required
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="hr-company">Company</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-company"
                      placeholder="Tech Corp Inc."
                      value={hrData.companyName}
                      onChange={(e) => changeHr("companyName", e.target.value)}
                      className={fieldCls(!!hrErrors.companyName, "pl-10")}
                      required
                    />
                  </div>
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="hr-industry">Industry</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-industry"
                      placeholder="Technology, Finance, etc."
                      value={hrData.industry}
                      onChange={(e) => changeHr("industry", e.target.value)}
                      className={fieldCls(!!hrErrors.industry, "pl-10")}
                      required
                    />
                  </div>
                </div>

                {/* HR Email */}
                <div className="space-y-2">
                  <Label htmlFor="hr-email">HR Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-email"
                      type="email"
                      placeholder="hr@company.com"
                      value={hrData.hrEmail}
                      onChange={(e) => changeHr("hrEmail", e.target.value)}
                      className={fieldCls(!!hrErrors.hrEmail, "pl-10")}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="hr-phone">Phone</Label>
                  <Input
                    id="hr-phone"
                    placeholder="+1 (555) 123-4567"
                    value={hrData.hrPhone}
                    onChange={(e) => changeHr("hrPhone", e.target.value)}
                    className={fieldCls(!!hrErrors.hrPhone)}
                    required
                  />
                </div>

                {/* Company Address */}
                <div className="space-y-2">
                  <Label htmlFor="hr-address">Company Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-address"
                      placeholder="Enter company headquarters address"
                      value={hrData.location}
                      onChange={(e) => changeHr("location", e.target.value)}
                      className={fieldCls(!!hrErrors.location, "pl-10")}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="hr-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={hrData.hrPassword}
                      onChange={(e) => changeHr("hrPassword", e.target.value)}
                      className={fieldCls(!!hrErrors.hrPassword, "pl-10 pr-10")}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <PasswordStrengthMeter score={getPasswordStrength(hrData.hrPassword)} />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="hr-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hr-confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={hrData.confirmPassword}
                      onChange={(e) => changeHr("confirmPassword", e.target.value)}
                      className={fieldCls(!!hrErrors.confirmPassword, "pl-10 pr-10")}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm pt-2">
                <input type="checkbox" className="w-4 h-4 rounded border-border" required />
                <span className="text-muted-foreground">I agree to the <TermsDialog /></span>
              </label>

              <Button type="submit" className="w-full" disabled={hrLoading}>
                {hrLoading ? "Registering..." : "Register as Company"}
              </Button>
            </form>
          </TabsContent>

          {/* ── Supervisor Registration (hidden tab, kept for completeness) ── */}
          <TabsContent value="supervisor">
            <form onSubmit={handleSupervisorSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <Label htmlFor="sup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="sup-name"
                      placeholder="Prof. Michael Chen"
                      value={supervisorData.name}
                      onChange={(e) => changeSupervisor("name", e.target.value)}
                      className={fieldCls(!!supervisorErrors.name, "pl-10")}
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
                      onChange={(e) => changeSupervisor("email", e.target.value)}
                      className={fieldCls(!!supervisorErrors.email, "pl-10")}
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
                    onChange={(e) => changeSupervisor("university", e.target.value)}
                    className={fieldCls(!!supervisorErrors.university)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sup-dept">Department</Label>
                  <Input
                    id="sup-dept"
                    placeholder="Computer Science"
                    value={supervisorData.department}
                    onChange={(e) => changeSupervisor("department", e.target.value)}
                    className={fieldCls(!!supervisorErrors.department)}
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
                      onChange={(e) => changeSupervisor("password", e.target.value)}
                      className={fieldCls(!!supervisorErrors.password, "pl-10 pr-10")}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                      onChange={(e) => changeSupervisor("confirmPassword", e.target.value)}
                      className={fieldCls(!!supervisorErrors.confirmPassword, "pl-10 pr-10")}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm pt-2">
                <input type="checkbox" className="w-4 h-4 rounded border-border" required />
                <span className="text-muted-foreground">I agree to the <TermsDialog /></span>
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
            <Link href="/auth/login" className="text-primary hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </Card>

      {/* HR Registration Pending Dialog */}
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
                Your HR account has been successfully registered. A supervisor must review and approve
                your application to maintain platform security.
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