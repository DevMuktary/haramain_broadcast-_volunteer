"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, X, ExternalLink, Download, Loader2, Mail, Phone, MapPin, Clock, Briefcase, GraduationCap, Languages, Link as LinkIcon, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";

type Applicant = {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  country: string;
  city: string;
  languages: string; // Stored as a comma-separated string
  department: string;
  role: string;
  experienceLevel: string;
  currentStatus: string;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  resumeUrl: string | null;
  motivation: string;
  relevantExperience: string;
  availableHours: string;
  timezone: string;
  agreedToTerms: boolean;
  status: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-gray-800 text-gray-300 border-gray-700",
  REVIEWING: "bg-blue-900/30 text-blue-400 border-blue-800/50",
  SHORTLISTED: "bg-amber-900/30 text-amber-400 border-amber-800/50",
  ACCEPTED: "bg-emerald-900/30 text-emerald-400 border-emerald-800/50",
  REJECTED: "bg-red-900/30 text-red-400 border-red-800/50",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
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
    <div className="p-6 sm:p-10 min-h-screen bg-[#0B1120] text-gray-200 selection:bg-amber-500/30">
      
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Candidate Roster
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Review, filter, and manage your global volunteer network.</p>
        </div>

        {/* Executive Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search candidates by name or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#111827] border border-gray-800 rounded-xl text-sm focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 text-white transition-all shadow-inner"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-2.5 bg-[#111827] border border-gray-800 rounded-xl text-sm text-gray-300 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 appearance-none cursor-pointer transition-all shadow-inner"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWING">Under Review</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B1120]/80 border-b border-gray-800 text-gray-400 text-xs uppercase tracking-widest font-semibold">
                <th className="px-6 py-5">Candidate Details</th>
                <th className="px-6 py-5">Position Applied</th>
                <th className="px-6 py-5">Location / Lang</th>
                <th className="px-6 py-5">Date Received</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-amber-500/50" />
                    <p className="text-sm tracking-wide">Loading database records...</p>
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                    <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-gray-700" />
                    <p className="text-sm tracking-wide">No candidates found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-[#0B1120]/50 transition-colors group cursor-pointer" onClick={() => setSelectedApp(app)}>
                    <td className="px-6 py-5">
                      <div className="font-bold text-white tracking-wide">{app.fullName}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1.5"><Mail className="w-3 h-3"/> {app.email}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-300">{app.role}</div>
                      <div className="text-[11px] text-gray-600 uppercase tracking-wider mt-1">{app.department.replace('_', ' ')}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-gray-300 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-500"/> {app.country}</div>
                      <div className="text-xs text-gray-600 mt-1 truncate max-w-[150px]">{app.languages}</div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-400 font-medium">
                      {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedApp(app); }}
                        className="p-2.5 text-gray-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 rounded-xl transition-all inline-flex"
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

      {/* --- THE DOSSIER MODAL --- */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-3xl bg-[#0B1120] border-l border-gray-800 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-800 bg-[#111827] flex justify-between items-start shrink-0">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">{selectedApp.fullName}</h2>
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${STATUS_COLORS[selectedApp.status]}`}>
                      {selectedApp.status}
                    </span>
                  </div>
                  <p className="text-amber-500/80 text-sm font-semibold tracking-wide flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> {selectedApp.role} <span className="text-gray-600">|</span> {selectedApp.department.replace('_', ' ')}
                  </p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2.5 text-gray-500 hover:text-white rounded-full hover:bg-gray-800 transition-colors bg-[#0B1120] border border-gray-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dossier Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                
                {/* Section 1: At a Glance Grid */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Applicant Profile</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Email</p>
                        <a href={`mailto:${selectedApp.email}`} className="text-sm text-gray-300 hover:text-amber-400 transition-colors break-all">{selectedApp.email}</a>
                      </div>
                    </div>
                    <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">WhatsApp</p>
                        <a href={`https://wa.me/${selectedApp.whatsappNumber.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-sm text-gray-300 hover:text-amber-400 transition-colors">{selectedApp.whatsappNumber}</a>
                      </div>
                    </div>
                    <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Location</p>
                        <p className="text-sm text-gray-300">{selectedApp.city ? `${selectedApp.city}, ` : ''}{selectedApp.country}</p>
                      </div>
                    </div>
                    <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex items-start gap-3">
                      <Languages className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Languages Spoken</p>
                        <p className="text-sm text-gray-300">{selectedApp.languages}</p>
                      </div>
                    </div>
                    <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Background</p>
                        <p className="text-sm text-gray-300">{selectedApp.experienceLevel} Exp. &bull; {selectedApp.currentStatus}</p>
                      </div>
                    </div>
                    <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Availability</p>
                        <p className="text-sm text-gray-300">{selectedApp.availableHours}/week &bull; {selectedApp.timezone.split(' ')[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Deep Dive */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Written Assessment</h4>
                  <div className="space-y-4">
                    <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50 rounded-l-xl"></div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-3">Why Haramain Broadcast?</p>
                      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-serif">"{selectedApp.motivation}"</p>
                    </div>
                    <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50 rounded-l-xl"></div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-3">Relevant Experience Showcase</p>
                      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-serif">"{selectedApp.relevantExperience}"</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Professional Links & Agreement */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Verification & Attachments</h4>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {selectedApp.resumeUrl ? (
                      <a href={selectedApp.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#111827] hover:bg-gray-800 rounded-xl text-sm font-medium text-white transition-colors border border-gray-800 shadow-sm">
                        <Download className="w-4 h-4 text-amber-500" /> Download Resume
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 px-5 py-3 bg-[#0B1120] border border-gray-800 rounded-xl text-sm font-medium text-gray-600">
                        No Resume Attached
                      </span>
                    )}

                    {selectedApp.portfolioUrl && (
                      <a href={selectedApp.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#111827] hover:bg-gray-800 rounded-xl text-sm font-medium text-white transition-colors border border-gray-800 shadow-sm">
                        <ExternalLink className="w-4 h-4 text-amber-500" /> View Portfolio
                      </a>
                    )}

                    {selectedApp.linkedinUrl && (
                      <a href={selectedApp.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#111827] hover:bg-gray-800 rounded-xl text-sm font-medium text-white transition-colors border border-gray-800 shadow-sm">
                        <LinkIcon className="w-4 h-4 text-amber-500" /> LinkedIn Profile
                      </a>
                    )}
                  </div>

                  <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-gray-300 font-medium">Applicant agreed to the organizational terms & conditions.</p>
                      <p className="text-xs text-gray-500 mt-0.5">Submitted on: {new Date(selectedApp.createdAt).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Footer */}
              <div className="px-8 py-6 bg-[#111827] border-t border-gray-800 flex items-center justify-between shrink-0">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider hidden sm:block">Action Required</p>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <select 
                    value={selectedApp.status}
                    onChange={(e) => handleStatusUpdate(e.target.value)}
                    disabled={isUpdating}
                    className="flex-1 sm:w-64 bg-[#0B1120] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm font-medium focus:border-amber-500 disabled:opacity-50 appearance-none shadow-inner"
                  >
                    <option value="PENDING">Mark as Pending</option>
                    <option value="REVIEWING">Mark as Under Review</option>
                    <option value="SHORTLISTED">Mark as Shortlisted</option>
                    <option value="ACCEPTED">Mark as Accepted</option>
                    <option value="REJECTED">Mark as Rejected</option>
                  </select>
                  {isUpdating && <Loader2 className="w-6 h-6 text-amber-500 animate-spin shrink-0" />}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
