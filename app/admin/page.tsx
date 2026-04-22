import { PrismaClient } from "@prisma/client";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

// Prevent Next.js from caching this page so stats are always live
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch live stats from the database
  const totalApplications = await prisma.applicant.count();
  const pendingCount = await prisma.applicant.count({ where: { status: "PENDING" } });
  const shortlistedCount = await prisma.applicant.count({ where: { status: "SHORTLISTED" } });
  const rejectedCount = await prisma.applicant.count({ where: { status: "REJECTED" } });

  return (
    <div className="p-6 sm:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Live metrics for the volunteer recruitment campaign.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Total Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Applicants</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalApplications}</h3>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Awaiting Review</p>
            <h3 className="text-2xl font-bold text-gray-900">{pendingCount}</h3>
          </div>
        </div>

        {/* Shortlisted Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Shortlisted</p>
            <h3 className="text-2xl font-bold text-gray-900">{shortlistedCount}</h3>
          </div>
        </div>

        {/* Rejected Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Rejected</p>
            <h3 className="text-2xl font-bold text-gray-900">{rejectedCount}</h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to review candidates?</h3>
        <p className="text-gray-500 mb-6">Head over to the applications table to filter by department, read their motivations, and download portfolios.</p>
        <Link 
          href="/admin/applications" 
          className="inline-flex items-center justify-center px-6 py-3 bg-brand-accent text-white font-medium rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-brand-accent/30"
        >
          View All Applications
        </Link>
      </div>

    </div>
  );
}
