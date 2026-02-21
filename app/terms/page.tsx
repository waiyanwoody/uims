import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ScrollText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/auth/register">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Registration
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-primary font-bold">
            <ScrollText className="w-6 h-6" />
            <span>UIMS</span>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
          <header className="border-b pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms and Conditions</h1>
            <p className="text-muted-foreground italic">Last Updated: February 21, 2026</p>
          </header>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">01</span>
              General Introduction
            </h2>
            <p className="leading-relaxed text-muted-foreground mt-4">
              Welcome to the University Internship Management System (UIMS). By accessing or using our platform, you agree to be bound by these Terms and Conditions. Our system is designed to bridge the gap between academic learning and professional experience for Students, Supervisors, and Companies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">02</span>
              User Responsibilities
            </h2>
            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <h3 className="font-semibold mb-1">Students</h3>
                <p className="text-sm text-muted-foreground">Students must provide accurate academic records and engage professionally with potential employers. Plagiarism in CVs or falsification of status is strictly prohibited.</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <h3 className="font-semibold mb-1">Company/HR</h3>
                <p className="text-sm text-muted-foreground">Organizations must provide safe working environments and legitimate internship opportunities. All listings must comply with local labor laws and educational standards.</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <h3 className="font-semibold mb-1">Supervisors</h3>
                <p className="text-sm text-muted-foreground">Faculty supervisors are responsible for the objective evaluation of student progress and ensuring that internship roles fulfill academic requirements.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">03</span>
              Data & Privacy
            </h2>
            <p className="leading-relaxed text-muted-foreground mt-4">
              Your privacy is paramount. UIMS collects professional and academic data solely for the purpose of internship placement. We do not sell your personal information to third parties. Academic records shared by students are visible only to verified supervisors and potential employers you apply to.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">04</span>
              Code of Conduct
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-4">
              <li>No harassment or discriminatory behavior toward any user group.</li>
              <li>Respect confidential company information during and after internships.</li>
              <li>Maintain professional communication through the platform messaging systems.</li>
              <li>Report any unethical behavior immediately through the support portal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">05</span>
              Termination of Access
            </h2>
            <p className="leading-relaxed text-muted-foreground mt-4">
              UIMS reserves the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or disrupt the educational integrity of the platform.
            </p>
          </section>

          <footer className="pt-8 border-t">
            <p className="text-sm text-center text-muted-foreground">
              By clicking "Accept" or continuing to use UIMS, you acknowledge that you have read and understood these Terms and Conditions. For legal inquiries, please contact <span className="text-primary underline">legal@uims-edu.org</span>.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
