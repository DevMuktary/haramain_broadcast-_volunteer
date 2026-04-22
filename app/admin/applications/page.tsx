"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Eye, X, ExternalLink, Download, Loader2, Mail, Phone, MapPin, Clock, Briefcase } from "lucide-react";

type Applicant = {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  country: string;
  languages: string[];
  department: string;
  role: string;
  experienceLevel: string;
  currentStatus: string;
  portfolioUrl: string | null;
  resumeUrl: string | null;
  motivation: string;
  relevantExperience: string;
  availableHours: string;
  timezone: string;
  status: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  REVIEWING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  SHORTLISTED: "bg-green-500/10 text-green-400 border-green-500/20",
  ACCEPTED: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  // Modal State
  const [selectedApp, setSelectedApp] = useState<Applicant | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedApp) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedApp.id, status: newStatus }),
      });
      if (res.ok) {
        // Update local state instantly
        setApplications(apps => apps.map(app => app.id === selectedApp.id ? { ...app, status: newStatus } : app));
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-[#0B1120] text-gray-200">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Applications</h1>
          <p className="text-gray-500 mt-1">Review and manage volunteer candidates.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search names, roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#111827] border border-gray-800 rounded-xl text-sm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-white"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#111827] border border-gray-800 rounded-xl text-sm text-white focus:border-brand-accent appearance-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B1120] border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Candidate</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Date Applied</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-accent" />
                    Loading applications...
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{app.fullName}</div>
                      <div className="text-xs text-gray-500">{app.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{app.role}</div>
                      <div className="text-xs text-gray-600">{app.department.replace('_', ' ')}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{app.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="p-2 text-gray-400 hover:text-brand-accent hover:bg-brand-accent/10 rounded-lg transition-colors inline-flex"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- REVIEW MODAL --- */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#111827] border-l border-gray-800 shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-gray-800 bg-[#0B1120] flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-white">{selectedApp.fullName}</h2>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${STATUS_COLORS[selectedApp.status]}`}>
                      {selectedApp.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> {selectedApp.role} &bull; {selectedApp.experienceLevel} Experience
                  </p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2 text-gray-500 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4 bg-[#0B1120] p-5 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Mail className="w-4 h-4 text-gray-500" /> <a href={`mailto:${selectedApp.email}`} className="hover:text-brand-accent">{selectedApp.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Phone className="w-4 h-4 text-gray-500" /> <a href={`https://wa.me/${selectedApp.whatsappNumber.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="hover:text-brand-accent">{selectedApp.whatsappNumber}</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-500" /> {selectedApp.country}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Clock className="w-4 h-4 text-gray-500" /> {selectedApp.availableHours}/week ({selectedApp.timezone.split(' ')[0]})
                  </div>
                </div>

                {/* Deep Dive Text */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Motivation</h4>
                  <div className="bg-[#0B1120] p-5 rounded-xl border border-gray-800 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedApp.motivation}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Relevant Experience</h4>
                  <div className="bg-[#0B1120] p-5 rounded-xl border border-gray-800 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedApp.relevantExperience}
                  </div>
                </div>

                {/* Attachments & Links */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Attachments & Links</h4>
                  <div className="flex flex-wrap gap-4">
                    {selectedApp.resumeUrl ? (
                      <a href={selectedApp.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-white transition-colors border border-gray-700">
                        <Download className="w-4 h-4 text-brand-accent" /> View Resume PDF
                      </a>
                    ) : (
                      <span className="px-4 py-2 bg-[#0B1120] border border-gray-800 rounded-lg text-sm text-gray-600">No Resume Uploaded</span>
                    )}

                    {selectedApp.portfolioUrl && (
                      <a href={selectedApp.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-white transition-colors border border-gray-700">
                        <ExternalLink className="w-4 h-4 text-brand-accent" /> External Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer (Actions) */}
              <div className="px-8 py-5 bg-[#0B1120] border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-bold">Update Applicant Status</p>
                <div className="flex gap-3">
                  <select 
                    value={selectedApp.status}
                    onChange={(e) => handleStatusUpdate(e.target.value)}
                    disabled={isUpdating}
                    className="flex-1 bg-[#111827] border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-accent disabled:opacity-50 appearance-none"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="REVIEWING">Under Review</option>
                    <option value="SHORTLISTED">Shortlisted</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                  {isUpdating && <div className="flex items-center justify-center px-4"><Loader2 className="w-5 h-5 text-brand-accent animate-spin" /></div>}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
