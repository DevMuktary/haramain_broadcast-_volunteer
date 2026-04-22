import { ShieldCheck, Mail, Database, Cloud, Key, Lock, ExternalLink, Server, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Server Component to securely check environment variables without exposing them to the browser
export default function SettingsPage() {
  // Check system health status
  const dbConnected = !!process.env.DATABASE_URL;
  const zeptoConnected = !!process.env.ZEPTOMAIL_TOKEN && !!process.env.ZEPTOMAIL_BOUNCE_ADDRESS;
  const cloudinaryConnected = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const adminPasswordSet = !!process.env.ADMIN_PASSWORD;

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-[#0B1120] text-gray-200">
      
      {/* Header */}
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          System Configuration
        </h1>
        <p className="text-gray-500 mt-2 text-sm">Manage system health, security protocols, and integration statuses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
        
        {/* Left Column: System Health & Integrations */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Security & Authentication */}
          <div className="bg-[#111827] rounded-3xl border border-gray-800 overflow-hidden shadow-xl">
            <div className="px-8 py-5 border-b border-gray-800 bg-[#0B1120] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-white tracking-wide">Authentication & Security</h2>
            </div>
            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#0B1120] rounded-xl border border-gray-800 mb-6">
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Key className="w-4 h-4 text-gray-400" /> Master Admin Password
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Used to access this executive dashboard.</p>
                </div>
                <div className="flex items-center gap-3">
                  {adminPasswordSet ? (
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider rounded-lg">Secured</span>
                  ) : (
                    <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold uppercase tracking-wider rounded-lg">Missing</span>
                  )}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-500 font-bold text-sm uppercase tracking-wider mb-1">Infrastructure Level Security</h4>
                  <p className="text-sm text-amber-500/80 leading-relaxed">
                    To prevent unauthorized access or database breaches, your Admin Password and JWT Secret are hardware-locked. To change your master password, you must log into your <strong>Railway.app Dashboard</strong>, update the <code className="bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-400">ADMIN_PASSWORD</code> variable, and allow the server to automatically reboot.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Integrations */}
          <div className="bg-[#111827] rounded-3xl border border-gray-800 overflow-hidden shadow-xl">
            <div className="px-8 py-5 border-b border-gray-800 bg-[#0B1120] flex items-center gap-3">
              <Server className="w-5 h-5 text-brand-accent" />
              <h2 className="text-lg font-bold text-white tracking-wide">API Integrations</h2>
            </div>
            
            <div className="p-8 space-y-4">
              {/* PostgreSQL */}
              <div className="flex items-center justify-between p-5 bg-[#0B1120] rounded-xl border border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Database className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">PostgreSQL Database</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Primary storage for all applicant data</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${dbConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                  {dbConnected ? 'Connected' : 'Offline'}
                </span>
              </div>

              {/* ZeptoMail */}
              <div className="flex items-center justify-between p-5 bg-[#0B1120] rounded-xl border border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center border border-blue-400/20">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Zoho ZeptoMail</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Automated status updates & receipts</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${zeptoConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${zeptoConnected ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                  {zeptoConnected ? 'Operational' : 'Missing Keys'}
                </span>
              </div>

              {/* Cloudinary */}
              <div className="flex items-center justify-between p-5 bg-[#0B1120] rounded-xl border border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                    <Cloud className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Cloudinary Storage</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Client-side resume & document uploads</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${cloudinaryConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${cloudinaryConnected ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                  {cloudinaryConnected ? 'Active' : 'Unconfigured'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Links & Info */}
        <div className="lg:col-span-1 space-y-8">
          
          <div className="bg-gradient-to-b from-[#111827] to-[#0B1120] rounded-3xl border border-gray-800 p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl"></div>
            
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">Data Management</h3>
            <p className="text-sm text-gray-400 mb-6 relative z-10 leading-relaxed">
              All volunteer application data is strictly confidental. Currently, this system is actively accepting global applications. 
            </p>

            <div className="space-y-3 relative z-10">
              <a 
                href="https://railway.app" 
                target="_blank" 
                rel="noreferrer"
                className="w-full flex items-center justify-between px-4 py-3 bg-[#0B1120] hover:bg-gray-800 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 transition-colors"
              >
                <span className="flex items-center gap-2"><Server className="w-4 h-4 text-brand-accent" /> Railway Console</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
              </a>
              <a 
                href="https://zeptomail.zoho.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-full flex items-center justify-between px-4 py-3 bg-[#0B1120] hover:bg-gray-800 border border-gray-800 rounded-xl text-sm font-medium text-gray-300 transition-colors"
              >
                <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-accent" /> ZeptoMail Logs</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
              </a>
            </div>
          </div>

          <div className="bg-[#111827] rounded-3xl border border-gray-800 p-6 text-center shadow-xl">
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-brand-accent" />
            </div>
            <p className="text-sm text-gray-400">
              Session secured via HttpOnly JWT.<br/>
              Haramain Broadcast v1.0.0
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
