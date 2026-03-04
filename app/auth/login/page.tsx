"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Building2,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "sonner";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fieldCls(invalid: boolean, extra = "") {
  return [
    extra,
    invalid ? "border-destructive focus-visible:ring-destructive" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── LoginForm — defined OUTSIDE LoginPage so it never re-mounts on re-render ─
type LoginFormProps = {
  role: string;
  emailPlaceholder: string;
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  errors: { email?: boolean; password?: boolean };
  onEmailChange: (val: string) => void;
  onPasswordChange: (val: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

function LoginForm({
  role,
  emailPlaceholder,
  email,
  password,
  showPassword,
  loading,
  errors,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id={`${role}-email`}
            type="email"
            placeholder={emailPlaceholder}
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className={fieldCls(!!errors.email, "pl-10")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id={`${role}-password`}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className={fieldCls(!!errors.password, "pl-10 pr-10")}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const { login, loading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    "student" | "company" | "supervisor"
  >("student");
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>(
    {},
  );

  const handleEmailChange = (val: string) => {
    setEmail(val);
    // Clear error once the email becomes valid (or empty — empty is caught on submit)
    if (errors.email && (val === "" || isValidEmail(val))) {
      setErrors((prev) => ({ ...prev, email: false }));
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (errors.password) setErrors((prev) => ({ ...prev, password: false }));
  };

  const handleRoleChange = (val: string) => {
    setSelectedRole(val as "student" | "company" | "supervisor");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: boolean; password?: boolean } = {};
    if (!email) {
      newErrors.email = true;
    } else if (!isValidEmail(email)) {
      newErrors.email = true;
    }
    if (!password) newErrors.password = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const msg =
        !email || !password
          ? "Please fill in all required fields."
          : "Please enter a valid email address.";
      toast.error("Invalid Input", { description: msg });
      return;
    }

    try {
      const responseData = await login(selectedRole, { email, password });

      // Store JWT token in localStorage
      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
      }

      const user = responseData.user || responseData;

      if (selectedRole === "student") {
        authLogin({
          id: user.id || user.studentId,
          name: user.name,
          email: user.email,
          type: selectedRole,
        });
      } else if (selectedRole === "company") {
        authLogin({
          id: user.id,
          name: user.name || user.hrName,
          email: user.email || user.hrEmail,
          type: selectedRole,
        });
      } else if (selectedRole === "supervisor") {
        authLogin({
          id: user.id || user.supervisorId,
          name: user.name,
          email: user.email,
          type: selectedRole,
        });
      }

      const redirectMap = {
        student: "/student/dashboard",
        company: "/company/dashboard",
        supervisor: "/supervisor/dashboard",
      };

      toast.success("Login Successful!", {
        description:
          "Welcome back, " +
          (user.name || user.hrName || "User") +
          "! Redirecting to your dashboard...",
      });

      router.push(redirectMap[selectedRole]);
    } catch (error) {
      toast.error("Login Failed", {
        description: "Invalid email or password. Please try again.",
      });
      console.error(error);
    }
  };

  const formProps = {
    email,
    password,
    showPassword,
    loading,
    errors,
    onEmailChange: handleEmailChange,
    onPasswordChange: handlePasswordChange,
    onTogglePassword: () => setShowPassword((prev) => !prev),
    onSubmit: handleSubmit,
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="p-8 shadow-xl border-primary/10">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="student"
            className="w-full"
            value={selectedRole}
            onValueChange={handleRoleChange}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Company</span>
              </TabsTrigger>
              <TabsTrigger
                value="supervisor"
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Supervisor</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <LoginForm
                role="student"
                emailPlaceholder="john.student@university.edu"
                {...formProps}
              />
            </TabsContent>

            <TabsContent value="company">
              <LoginForm
                role="company"
                emailPlaceholder="hr@techcorp.com"
                {...formProps}
              />
            </TabsContent>

            <TabsContent value="supervisor">
              <LoginForm
                role="supervisor"
                emailPlaceholder="supervisor@ucsy.com"
                {...formProps}
              />
            </TabsContent>
          </Tabs>

          {/* Register Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:underline font-semibold"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
