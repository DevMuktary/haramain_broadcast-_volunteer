"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe2, Heart, Award, ChevronRight, Video, Users, Zap } from "lucide-react";

export default function LandingPage() {
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-accent selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 motion-safe:animate-[pulse_20s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-[#111827]"></div>
        </div>

        {/* Navbar inside Hero */}
        <nav className="absolute top-0 w-full z-50 py-4 px-6 md:py-6 md:px-8 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <Image src="/logo.png" alt="Haramain Broadcast Logo" width={40} height={40} className="object-contain md:w-12 md:h-12" />
            <span className="hidden sm:block text-lg md:text-xl font-bold tracking-widest text-white uppercase">Haramain Broadcast</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/apply" className="px-5 py-2 md:px-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs md:text-sm font-medium hover:bg-white hover:text-brand-dark transition-all duration-300">
              Join the Team
            </Link>
          </motion.div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mt-10 md:mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-accent/20 border border-brand-accent/50 text-brand-accent text-xs md:text-sm font-semibold tracking-wide mb-6">
              Official Volunteer Recruitment {new Date().getFullYear()}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Amplify the Message of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Haramain</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light px-4 md:px-0"
          >
            Become part of a world-class broadcast network dedicated to transmitting the spirituality, news, and live events of Makkah and Madinah to millions around the globe.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/apply" className="group relative px-8 py-4 bg-brand-accent text-white font-bold text-base md:text-lg rounded-full overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.4)] hover:shadow-[0_0_60px_rgba(14,165,233,0.6)] transition-all duration-300 flex items-center gap-2">
              <span className="relative z-10">Start Your Application</span>
              <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. THE GAIN / VALUE PROPOSITION */}
      <section className="py-16 md:py-24 bg-[#0B1120] relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp} className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Volunteer With Us?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">Joining Haramain Broadcast is more than a role; it is a profound investment in your hereafter and a massive leap for your professional portfolio.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {/* Benefit 1 */}
            <motion.div variants={fadeUp} className="bg-[#111827] border border-gray-800 p-6 md:p-8 rounded-2xl hover:border-brand-accent/50 transition-colors group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3">Sadaqah Jariyah</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">Your code, designs, and content will directly connect millions of Muslims to the holy sites. The spiritual reward for facilitating this connection is immeasurable.</p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div variants={fadeUp} className="bg-[#111827] border border-gray-800 p-6 md:p-8 rounded-2xl hover:border-brand-accent/50 transition-colors group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 md:w-7 md:h-7 text-brand-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3">World-Class Experience</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">Work within a highly structured, corporate-standard digital environment. Build scalable systems, craft premium UI/UX, and manage high-tier broadcast operations.</p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div variants={fadeUp} className="bg-[#111827] border border-gray-800 p-6 md:p-8 rounded-2xl hover:border-brand-accent/50 transition-colors group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-purple-500" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3">Global Elite Network</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">Collaborate with talented technical founders, media directors, and creative professionals from across the globe in a disciplined, mission-driven team.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. VISUAL STORYTELLING (Using Makkah & Madinah Cards) */}
      <section className="py-16 md:py-24 bg-[#111827] border-y border-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 mb-20 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700 group">
                <div className="absolute inset-0 bg-brand-accent/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <Image src="/makkah-card.png" alt="Makkah Clock Tower" width={800} height={600} className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-4 md:space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">From the Heart of Makkah...</h2>
              <p className="text-gray-400 text-base md:text-lg">We are building the infrastructure to broadcast the beauty, the Adhan, and the events of Masjid al-Haram with crystal clarity. As a developer, designer, or media expert, your work ensures flawless delivery to every screen.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm md:text-base text-gray-300"><Video className="w-5 h-5 text-brand-accent shrink-0" /> High-fidelity live stream engineering</li>
                <li className="flex items-center gap-3 text-sm md:text-base text-gray-300"><Award className="w-5 h-5 text-brand-accent shrink-0" /> Premium content curation</li>
              </ul>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 md:gap-16">
             <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700 group">
                <div className="absolute inset-0 bg-yellow-500/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <Image src="/madinah-card.png" alt="Madinah Mosque" width={800} height={600} className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-4 md:space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">...To the Peace of Madinah</h2>
              <p className="text-gray-400 text-base md:text-lg">Join the team that translates the tranquility of Al-Masjid an-Nabawi into compelling digital experiences. Whether you are managing social communities or writing clean backend logic, your contribution matters.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm md:text-base text-gray-300"><Globe2 className="w-5 h-5 text-brand-accent shrink-0" /> Global audience engagement</li>
                <li className="flex items-center gap-3 text-sm md:text-base text-gray-300"><Users className="w-5 h-5 text-brand-accent shrink-0" /> Cross-platform social media strategy</li>
              </ul>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. FINAL CTA WITH PATTERN BACKGROUND */}
      <section className="relative py-20 md:py-32 overflow-hidden flex justify-center items-center">
        {/* Abstract Pattern Background */}
        <div 
          className="absolute inset-0 z-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/pattern.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent z-0"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <Image src="/logo.png" alt="Icon" width={60} height={60} className="mx-auto mb-6 opacity-80 md:w-20 md:h-20 md:mb-8" />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">Ready to Make an Impact?</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10">We are currently accepting applications across 31 distinct technical, creative, and administrative roles.</p>
          <Link href="/apply" className="inline-flex items-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-white text-brand-dark font-bold text-base md:text-lg rounded-full hover:bg-gray-200 transition-colors shadow-2xl">
            Begin Application Process <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1120] border-t border-gray-800 py-8 text-center text-gray-500 text-xs md:text-sm relative z-10">
        <p>© {new Date().getFullYear()} Haramain Broadcast. A unified digital network.</p>
      </footer>
    </div>
  );
}
