"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    "student" | "hr" | "supervisor"
  >("student");

  // Mock user credentials
  const mockCredentials = {
    student: { email: "john.student@university.edu", password: "password123" },
    hr: { email: "hr@techcorp.com", password: "password123" },
    supervisor: {
      email: "prof.supervisor@university.edu",
      password: "password123",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication
    const mockUser = mockCredentials[selectedRole];
    if (email === mockUser.email && password === mockUser.password) {
      setTimeout(() => {
        // Redirect based on role
        if (selectedRole === "student") {
          router.push("/student/dashboard");
        } else if (selectedRole === "hr") {
          router.push("/company/dashboard");
        } else {
          router.push("/supervisor/dashboard");
        }
        setIsLoading(false);
      }, 800);
    } else {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    {
      role: "student" as const,
      name: "John Doe",
      email: "john.student@university.edu",
      position: "Computer Science Student",
      password: "password123",
    },
    {
      role: "hr" as const,
      name: "Sarah Johnson",
      email: "hr@techcorp.com",
      position: "HR Manager at Tech Corp",
      password: "password123",
    },
    {
      role: "supervisor" as const,
      name: "Prof. Michael Chen",
      email: "prof.supervisor@university.edu",
      position: "Faculty Supervisor",
      password: "password123",
    },
  ];

  const fillDemoCredentials = (role: "student" | "hr" | "supervisor") => {
    const account = demoAccounts.find((acc) => acc.role === role);
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
      setSelectedRole(role);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="p-8 shadow-xl border-primary/10">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          {/* Role Selection */}
          {/* <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Select Your Role
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {(["student", "hr", "supervisor"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`py-2 px-3 rounded-lg font-medium text-sm transition-all border ${
                    selectedRole === role
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {role === "hr"
                    ? "HR"
                    : role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div> */}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={mockCredentials[selectedRole].email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background border-border focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-primary hover:text-primary/80 transition-colors text-sm"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-background border-border focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
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
