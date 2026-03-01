"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Eye, EyeOff, GraduationCap, Building2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // your Tabs component
import { useAuth } from "@/contexts/AuthContext";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const { login, loading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "company" | "supervisor">("student");

  // Demo accounts (optional)
  const demoAccounts = [
    { role: "student" as const, email: "john.student@university.edu", password: "password123" },
    { role: "company" as const, email: "hr@techcorp.com", password: "password123" },
    { role: "supervisor" as const, email: "prof.supervisor@university.edu", password: "password123" },
  ];

  const fillDemoCredentials = (role: "student" | "company" | "supervisor") => {
    const account = demoAccounts.find(acc => acc.role === role);
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
      setSelectedRole(role);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login(selectedRole, { email, password });

      // Save to AuthContext
      authLogin({
        id: user.id,
        name: user.name,
        email: user.email,
        type: selectedRole,
      });

      // Redirect based on role
      const redirectMap = {
        student: "/student/dashboard",
        company: "/company/dashboard",
        supervisor: "/supervisor/dashboard",
      };

      toast.success("Login Successful!", {
        description:
        "Welcome back, " + user.name + "! Redirecting to your dashboard...",
      });

      router.push(redirectMap[selectedRole]);
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
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

          {/* Tabs for Roles */}
          <Tabs defaultValue="student" className="w-full" value={selectedRole} onValueChange={(val) => setSelectedRole(val as "student" | "company" | "supervisor")}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Company</span>
              </TabsTrigger>
              {/* Uncomment for supervisor if needed */}
              <TabsTrigger value="supervisor" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Supervisor</span>
              </TabsTrigger>
            </TabsList>

            {/* Student Login */}
            <TabsContent value="student">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="john.student@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="student-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
               
              </form>
            </TabsContent>

            {/* Company Login */}
            <TabsContent value="company">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="company-email"
                      type="email"
                      placeholder="hr@techcorp.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="company-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </TabsContent>

            {/* Company Login */}
            <TabsContent value="supervisor">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="company-email"
                      type="email"
                      placeholder="supervisor@ucsy.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="company-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Register Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-primary hover:underline font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}