"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut, ShieldCheck } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col md:flex-row font-sans text-gray-200">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111827] border-r border-gray-800 flex flex-col md:min-h-screen shrink-0 relative z-20">
        <div className="p-6 flex items-center gap-3 border-b border-gray-800 bg-[#0B1120]">
          <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.4)]">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white font-bold tracking-wide">Admin Portal</h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/applications" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Applications</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800 bg-[#0B1120]">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden bg-[#0B1120]">
        {children}
      </main>

    </div>
  );
}
