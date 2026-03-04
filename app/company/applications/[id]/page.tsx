"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, Loader2, CheckCircle, XCircle, 
  User, Mail, FileText, Calendar, Building2, MapPin, GraduationCap
} from "lucide-react";
import { useApplicationDetails } from "@/hooks/StudentHook/useApplicationDetails";
import { useUpdateApplicationStatus } from "@/hooks/CompanyHook/useUpdateApplicationStatus";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ApplicationViewDetails() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { application, loading, error, refetch } = useApplicationDetails(id);
  const { moveToNextStep, rejectApplication, isUpdating } = useUpdateApplicationStatus();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-[#09090b]">
      <Loader2 className="animate-spin h-10 w-10 text-emerald-500" />
    </div>
  );

  if (error || !application) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-[#09090b] text-zinc-500 dark:text-zinc-400 gap-4">
      <p>Application details not found.</p>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );

  const handleNextStep = async () => {
    const result = await moveToNextStep(id, application.status);
    if (result.success) {
      toast.success("Advanced to next stage");
      refetch();
    }
  };

  const handleReject = async () => {
    const result = await rejectApplication(id);
    if (result.success) {
      toast.error("Application Rejected");
      refetch();
    }
  };

  const steps = ["PENDING", "INTERVIEWING", "APPROVED"];
  const currentStepIndex = steps.indexOf(application.status);

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 pb-20 transition-colors duration-500">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/60 backdrop-blur-md transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">ID: #{application.id}</span>
            <Badge className={application.status === 'REJECTED' ? "bg-red-500/20 text-red-500 dark:text-red-400 border-red-500/50" : "bg-emerald-500 text-white"}>
              {application.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Candidate Info */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-8 space-y-6">
          {/* PIPELINE VISUALIZER */}
          <Card className="bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-800 backdrop-blur-sm transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between relative px-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center z-10 gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      index <= currentStepIndex 
                        ? "bg-emerald-600 border-emerald-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]" 
                        : "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-500"
                    }`}>
                      {index < currentStepIndex ? <CheckCircle className="w-5 h-5" /> : <span>{index + 1}</span>}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${index <= currentStepIndex ? "text-emerald-500" : "text-zinc-500 dark:text-zinc-600"}`}>
                      {step}
                    </span>
                  </div>
                ))}
                <div className="absolute top-5 left-0 w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 -z-0 transition-colors duration-500" />
                <div 
                  className="absolute top-5 left-0 h-[2px] bg-emerald-500 transition-all duration-700 -z-0" 
                  style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* PROFILE CARD */}
          <Card className="bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 overflow-hidden shadow-2xl transition-colors">
            <div className="h-24 bg-gradient-to-r from-emerald-300 dark:from-emerald-900 to-zinc-100 dark:to-zinc-900 transition-colors" />
            <CardContent className="relative pt-12">
              <div className="absolute -top-10 left-8 h-20 w-20 rounded-xl bg-zinc-200 dark:bg-zinc-800 border-4 border-white dark:border-[#09090b] flex items-center justify-center shadow-xl transition-colors">
                <User className="w-10 h-10 text-zinc-700 dark:text-zinc-500" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{application.student.name}</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" /> {application.student.major} • {application.student.studentNumber}
                    </p>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                      <Mail className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> {application.student.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                      Applied At: {new Date(application.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-200/50 dark:bg-zinc-950/50 p-4 rounded-lg border border-zinc-300 dark:border-zinc-800 space-y-3 transition-colors">
                  <h4 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Target Role</h4>
                  <div className="space-y-1">
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold">{application.internship.title}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {application.internship.company.name} • <MapPin className="w-3 h-3" /> {application.internship.company.location}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-zinc-400 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">
                    {application.internship.category}
                  </Badge>
                </div>
              </div>

              <Separator className="my-8 bg-zinc-300 dark:bg-zinc-700 transition-colors" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg transition-colors">
                    <FileText className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{application.cvForm.title}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">PDF Document</p>
                  </div>
                </div>
                <a href={application.cvForm.filePath} target="_blank">
                  <Button variant="outline" className="border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200/10 dark:hover:bg-zinc-800 transition-colors">
                    View Attachment
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT: Actions */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-4 space-y-6">
          <Card className="bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 sticky top-24 transition-colors">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Review Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.status !== "APPROVED" && application.status !== "REJECTED" ? (
                <>
                  <Button 
                    onClick={handleNextStep} 
                    disabled={isUpdating}
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all"
                  >
                    {isUpdating ? <Loader2 className="animate-spin w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    Move to {currentStepIndex + 1 < steps.length ? steps[currentStepIndex + 1] : "Final"}
                  </Button>

                  <Button 
                    variant="outline" 
                    onClick={handleReject}
                    disabled={isUpdating}
                    className="w-full h-12 border-zinc-300 dark:border-zinc-700 hover:bg-red-500/10 hover:text-red-400 gap-2 transition-colors"
                  >
                    <XCircle className="w-4 h-4" /> Reject Candidate
                  </Button>
                </>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl transition-colors">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    application.status === 'APPROVED' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {application.status === 'APPROVED' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100 uppercase text-xs tracking-widest">
                    Process Complete
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">Application is {application.status}</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-600/5 transition-colors">
            <p className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase mb-2">Internal Note</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
              "Check the 'requirements' section of the internship to match candidate skills before moving to Interviewing."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}