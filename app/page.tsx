import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Heart, MonitorPlay, Users, Sparkles, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Kaabah Background"
            fill
            className="object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
            priority
          />
          {/* Deep Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Navbar Overlay */}
        <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto inset-x-0">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="Haramain Broadcast Logo" fill className="object-contain" />
            </div>
            <span className="text-white font-bold tracking-widest text-lg uppercase">Haramain</span>
          </div>
          <Link href="/apply" className="text-white text-sm font-medium hover:text-blue-400 transition-colors">
            Volunteer Login
          </Link>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-sm font-medium tracking-wide mb-6 opacity-0 animate-[fade-in_1s_ease-out_ forwards]">
            2026 Volunteer Recruitment Now Open
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-xl opacity-0 animate-[slide-in-from-bottom-4_1s_ease-out_0.3s_forwards]">
            Serve the Haramain. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Reach the World.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl font-light opacity-0 animate-[slide-in-from-bottom-4_1s_ease-out_0.6s_forwards]">
            Join our world-class broadcast and digital team to deliver the light of the Two Holy Mosques to millions across the globe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[slide-in-from-bottom-4_1s_ease-out_0.9s_forwards]">
            <Link 
              href="/apply" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] focus:outline-none"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
              <span className="relative flex items-center gap-2">
                Start Application <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE GAINS (Why Volunteer?) */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">More Than Just a Role</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Volunteering with Haramain Broadcast is a commitment to excellence, offering profound spiritual rewards alongside elite professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Heart className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sadaqah Jariyah</h3>
              <p className="text-gray-600 leading-relaxed">
                Every broadcast, graphic, or line of code you contribute helps spread the message of Islam, earning you continuous spiritual rewards globally.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                <Sparkles className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">World-Class Portfolio</h3>
              <p className="text-gray-600 leading-relaxed">
                Work within a high-tier corporate structure using modern technologies. Your contributions will be a massive asset to your professional CV.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                <Globe className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Network</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect and collaborate with top-tier professionals, scholars, and creatives from across the globe in a disciplined, structured environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEPARTMENTS PREVIEW (Using Madinah & Makkah Cards) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Where Do You Fit In?</h2>
              <p className="text-gray-600 text-lg max-w-xl">
                We are recruiting specialists across 30+ distinct roles. Find the department where your skills will make the highest impact.
              </p>
            </div>
            <Link href="/apply" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
              View All 31 Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Broadcast & Production Card */}
            <div className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer">
              <Image src="/makkah-card.png" alt="Makkah Card" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="bg-white/20 backdrop-blur-md w-max p-2 rounded-lg mb-4">
                  <MonitorPlay className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Broadcast & Media</h3>
                <p className="text-gray-300 text-sm mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Directors, Video Editors, and Live Stream Managers ensuring flawless delivery.
                </p>
              </div>
            </div>

            {/* Design & Tech Card */}
            <div className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer">
              <Image src="/madinah-card.png" alt="Madinah Card" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="bg-white/20 backdrop-blur-md w-max p-2 rounded-lg mb-4">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Engineering & Design</h3>
                <p className="text-gray-300 text-sm mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  UI/UX Designers, Web Developers, and App Engineers building our infrastructure.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. IMPACT SECTION (Using Pattern Background) */}
      <section className="relative py-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/pattern.png" alt="Masjid Al Haram View" fill className="object-cover object-center fixed" />
        </div>
        <div className="absolute inset-0 bg-blue-900/90 z-0" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Users className="w-16 h-16 text-blue-400 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            "The best of people are those that bring most benefit to the rest of mankind."
          </h2>
          <p className="text-blue-200 text-xl font-light mb-12">
            This is your opportunity to leverage your worldly skills for an eternal purpose. Are you ready to join the team?
          </p>
          <Link 
            href="/apply" 
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-blue-900 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-2xl"
          >
            Apply to Volunteer Now
          </Link>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-6 relative w-12 h-12 mx-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
             <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Haramain Broadcast. All rights reserved. <br/>
            <span className="text-gray-600 text-xs mt-2 block">A non-profit initiative. Participation does not constitute employment.</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
