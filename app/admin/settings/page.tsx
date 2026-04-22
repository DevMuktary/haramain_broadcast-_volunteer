"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Download, ShieldCheck, Database, Bell, Lock, Loader2, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // --- CSV EXPORT LOGIC ---
  const handleExportCSV = async () => {
    setIsExporting(true);
    setExportSuccess(false);

    try {
      // 1. Fetch all data from our existing secure route
      const res = await fetch("/api/admin/applications");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();

      if (data.length === 0) {
        alert("No applications to export.");
        setIsExporting(false);
        return;
      }

      // 2. Define the CSV Headers
      const headers = [
        "Date Applied", "Status", "Full Name", "Email", "WhatsApp", 
        "Country", "City", "Languages", "Department", "Role", 
        "Experience", "Current Status", "Portfolio URL", "Resume URL", "Available Hours"
      ];

      // 3. Map the JSON data to CSV rows
      const csvRows = data.map((app: any) => {
        return [
          new Date(app.createdAt).toLocaleDateString(),
          app.status,
          `"${app.fullName}"`, // Wrap in quotes to prevent comma breaking
          app.email,
          `="${app.whatsappNumber}"`, // Force Excel to treat as string, not math
          `"${app.country}"`,
          `"${app.city || ''}"`,
          `"${app.languages}"`,
          app.department,
          app.role,
          app.experienceLevel,
          app.currentStatus,
          app.portfolioUrl || "N/A",
          app.resumeUrl || "N/A",
          app.availableHours
        ].join(",");
      });

      // 4. Combine headers and rows
      const csvContent = [headers.join(","), ...csvRows].join("\n");

      // 5. Trigger the browser download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Haramain_Applicants_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to export data. Please check your connection.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-[#0B1120] text-gray-200">
      
      {/* Header Area */}
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-amber-500" />
          System Settings
        </h1>
        <p className="text-gray-500 mt-2 text-sm">Manage portal preferences, security, and data exports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Data & Export */}
        <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          
          {/* Data Management Card */}
          <div className="bg-[#111827] rounded-3xl shadow-xl border border-gray-800 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-800 bg-[#0B1120]/50 flex items-center gap-3">
              <Database className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-white">Data Management</h2>
            </div>
            <div className="p-8">
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Export your entire volunteer applicant database as a standardized CSV file. This file can be directly imported into Microsoft Excel, Google Sheets, or third-party CRM platforms.
              </p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={handleExportCSV}
                  disabled={isExporting || exportSuccess}
                  className={`inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition-all shadow-lg ${
                    exportSuccess 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" 
                      : "bg-amber-500 hover:bg-amber-400 text-gray-900 shadow-amber-500/20"
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isExporting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Compiling Data...</>
                  ) : exportSuccess ? (
                    <><CheckCircle className="w-5 h-5" /> Export Complete</>
                  ) : (
                    <><Download className="w-5 h-5" /> Download CSV Database</>
                  )}
                </button>
                <span className="text-xs text-gray-600 font-medium tracking-wide uppercase">Requires Admin Privileges</span>
              </div>
            </div>
          </div>

          {/* Email Notifications Card (UI Placeholder for future) */}
          <div className="bg-[#111827] rounded-3xl shadow-xl border border-gray-800 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-800 bg-[#0B1120]/50 flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-white">Automated Communications</h2>
            </div>
            <div className="p-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium mb-1">ZeptoMail Integration</h4>
                  <p className="text-xs text-gray-500">System is actively sending confirmation and status update emails.</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Active
                </div>
              </div>

              <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium mb-1">Admin Alerts</h4>
                  <p className="text-xs text-gray-500">Receive an email when a new application is submitted.</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-[#0B1120] appearance-none cursor-not-allowed opacity-50" disabled />
                  <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-800 cursor-not-allowed"></label>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Security */}
        <div className="lg:col-span-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="bg-gradient-to-b from-[#111827] to-[#0B1120] rounded-3xl shadow-2xl border border-gray-800 overflow-hidden h-full">
            <div className="px-8 py-6 border-b border-gray-800 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-white">Security Details</h2>
            </div>
            
            <div className="p-8 space-y-8">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Current Session</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center border border-brand-accent/30">
                    <Lock className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Executive Admin</p>
                    <p className="text-xs text-emerald-400">Authenticated via JWT</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Master Password</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">
                  Your portal access is secured via server-level environment variables. 
                </p>
                <div className="bg-[#0B1120] p-4 rounded-xl border border-gray-800 text-xs text-gray-500">
                  To change the admin password, you must update the <code className="text-amber-500 font-mono">ADMIN_PASSWORD</code> key directly within your Railway.app dashboard and trigger a redeployment.
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Data Encryption</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  All traffic and database connections to PostgreSQL are strictly enforced over HTTPS/SSL. Passwords and application tokens are encrypted.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
