import { PrismaClient } from "@prisma/client";
import { Users, Clock, CheckCircle, XCircle, Trophy, ArrowRight, Activity, Calendar } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

// Prevent Next.js from caching this page so stats are always strictly live
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // 1. Fetch live stats
  const totalApplications = await prisma.applicant.count();
  const pendingCount = await prisma.applicant.count({ where: { status: "PENDING" } });
  const shortlistedCount = await prisma.applicant.count({ where: { status: "SHORTLISTED" } });
  const acceptedCount = await prisma.applicant.count({ where: { status: "ACCEPTED" } });
  const rejectedCount = await prisma.applicant.count({ where: { status: "REJECTED" } });

  // 2. Fetch the 5 most recent applications for the live feed
  const recentApplications = await prisma.applicant.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, fullName: true, role: true, department: true, status: true, createdAt: true }
  });

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-[#0B1120] text-gray-200">
      
      {/* Header */}
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-3xl font-bold text-white tracking-tight">Executive Dashboard</h1>
        <p className="text-gray-500 mt-1">Live metrics and recent activity for the volunteer recruitment campaign.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        
        {/* Total Card */}
        <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-gray-800 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
            <Users className="w-6 h-6 text-brand-accent" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Apps</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{totalApplications}</h3>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-gray-800 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20">
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Awaiting Review</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{pendingCount}</h3>
          </div>
        </div>

        {/* Shortlisted Card (Gold Accent) */}
        <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-gray-800 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Shortlisted</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{shortlistedCount}</h3>
          </div>
        </div>

        {/* Accepted Card */}
        <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-gray-800 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-250">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Accepted</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{acceptedCount}</h3>
          </div>
        </div>

        {/* Rejected Card */}
        <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-gray-800 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
            <XCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rejected</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">{rejectedCount}</h3>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
        
        {/* Quick Action Widget */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#111827] to-[#0B1120] rounded-3xl shadow-2xl border border-gray-800 p-8 text-center relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
            
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Review Candidates</h3>
            <p className="text-gray-400 mb-8 relative z-10 text-sm">
              Head over to the master applications table to filter candidates, read motivations, and update their recruitment status.
            </p>
            <Link 
              href="/admin/applications" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(14,165,233,0.3)] relative z-10"
            >
              Open Applications <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Live Feed / Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-[#111827] rounded-3xl shadow-xl border border-gray-800 p-8 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-accent" /> Recent Activity
              </h3>
              <Link href="/admin/applications" className="text-sm font-medium text-brand-accent hover:text-blue-400 transition-colors">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentApplications.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm border border-dashed border-gray-800 rounded-xl">
                  No applications received yet.
                </div>
              ) : (
                recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-[#0B1120] rounded-xl border border-gray-800/50 hover:border-gray-700 transition-colors">
                    <div>
                      <h4 className="text-white font-semibold">{app.fullName}</h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                        <span className="text-gray-400">{app.role}</span> &bull; {app.department.replace('_', ' ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border inline-block mb-1.5
                        ${app.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : ''}
                        ${app.status === 'REVIEWING' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                        ${app.status === 'SHORTLISTED' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : ''}
                        ${app.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                        ${app.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                      `}>
                        {app.status}
                      </span>
                      <p className="text-[11px] text-gray-600 flex items-center justify-end gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
