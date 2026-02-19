"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  GraduationCap,
  Building2,
  FileText,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function FadeInSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">UIMS</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Register
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 flex min-h-[calc(100vh-75px)] items-center">
        <FadeInSection className="w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-16">
            <div className="space-y-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary self-start">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  The Future of Internships
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight">
                Internships,
                <br />
                Simplified
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Connect with top companies, manage applications with ease, and
                accelerate your career growth in one powerful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth/register?role=student">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 px-8 h-12"
                  >
                    Start as Student
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/auth/register?role=company">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 h-12 bg-transparent"
                  >
                    For Companies
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 lg:gap-10 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary">
                    100+
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground">
                    Top Companies
                  </div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary">
                    5K+
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground">
                    Active Students
                  </div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary">
                    1K+
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground">
                    Open Positions
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden md:flex items-center justify-center relative w-full h-full min-h-[400px] lg:min-h-[500px]">
              <div className="relative w-full h-full aspect-[4/3] max-w-[800px] animate-fadeIn">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-[2rem] blur-3xl -z-10 animate-pulse" />
                <Image
                  src="/Image/HeroSectionImg.png"
                  alt="UIMS Platform Preview"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <FadeInSection>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Designed for Everyone
            </h2>
            <p className="text-lg text-muted-foreground">
              Whether you're a student seeking opportunities or a company
              finding talent
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <GraduationCap className="w-8 h-8" />,
              title: "For Students",
              points: [
                "Browse internship opportunities",
                "Manage multiple applications",
                "Organize and share CVs",
                "Real-time application tracking",
              ],
            },
            {
              icon: <Building2 className="w-8 h-8" />,
              title: "For Companies",
              points: [
                "Post internship positions",
                "Review qualified candidates",
                "Streamlined approval workflow",
                "Manage your team's hiring",
              ],
            },
            {
              icon: <CheckCircle className="w-8 h-8" />,
              title: "For Supervisors",
              points: [
                "Monitor student progress",
                "Approve internship placements",
                "Provide feedback and guidance",
                "Track student achievements",
              ],
            },
          ].map((feature, index) => (
            <FadeInSection key={index} delay={index * 200}>
              <Card className="p-8 border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 group bg-card">
                <div className="mb-6 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {feature.title}
                </h3>
                <ul className="space-y-4">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <FadeInSection>
          <div className="bg-gradient-to-br from-primary/5 to-primary/0 border border-primary/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "2M+", label: "Applications Processed" },
                { number: "98%", label: "Placement Success Rate" },
                { number: "4.9/5", label: "User Rating" },
                { number: "24/7", label: "Support Available" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-foreground">UIMS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting students with opportunities
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2026 University Internship Management System. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
