"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, UploadCloud, CheckCircle, ChevronRight, ChevronLeft, ShieldAlert, FileText, X, AlertCircle, Info } from "lucide-react";

// --- EXPANDED CONSTANTS & DATA ---
const DEPARTMENTS = {
  BROADCAST_PRODUCTION: ["Broadcast Director", "Live Stream Manager", "Video Editor", "Audio Specialist"],
  CONTENT_EDITORIAL: ["Content Manager", "Content Publisher", "News & Update Coordinator", "Islamic Content Reviewer", "Translation Officer", "Arabic Content Specialist", "English Content Specialist"],
  DESIGN_ENGINEERING: ["Graphics Designer", "Web Developer", "Mobile App Developer", "Technical Support Officer", "Research Assistant"],
  MARKETING_ENGAGEMENT: ["Social Media Manager", "Community Manager", "Digital Marketing Manager", "SEO Specialist", "Audience Engagement Officer", "Moderator", "Brand Development Officer"],
  ADMIN_OPERATIONS: ["Admin Officer", "Finance Officer", "Partnership Manager", "Sponsorship Manager", "Regional Coordinator", "Field Representative", "Volunteer Coordinator", "Support Team Member"]
};

const ROLE_DESCRIPTIONS: Record<string, string> = {
  "Broadcast Director": "Oversee the overall live stream and broadcast operations, ensuring high-quality output and coordination among teams.",
  "Live Stream Manager": "Manage technical aspects of the live stream, including encoders (OBS/vMix), stream health, and multi-platform syndication.",
  "Video Editor": "Cut, color-grade, and polish broadcast footage into high-quality clips for social media and archival purposes.",
  "Audio Specialist": "Ensure crystal clear audio feeds, manage noise reduction, and handle audio routing from Makkah/Madinah feeds.",
  "Content Manager": "Develop and oversee the editorial calendar, ensuring all broadcasted and published content aligns with organizational values.",
  "Content Publisher": "Schedule and publish approved media across various platforms in real-time during broadcasts.",
  "News & Update Coordinator": "Gather, verify, and format real-time news and updates regarding the Haramain for global broadcast.",
  "Islamic Content Reviewer": "Vetted scholars or students of knowledge required to ensure all content is authentic and contextually accurate.",
  "Translation Officer": "Provide accurate, nuanced translations of official statements and broadcasts from Arabic to designated languages.",
  "Arabic Content Specialist": "Draft, edit, and optimize native Arabic copy for broadcasts, social media, and official communications.",
  "English Content Specialist": "Draft, edit, and optimize native English copy for broadcasts, social media, and official communications.",
  "Graphics Designer": "Create premium, broadcast-standard overlays, thumbnails, and social media graphics.",
  "Web Developer": "Maintain and build scalable features for the official Haramain Broadcast web platforms using modern frameworks.",
  "Mobile App Developer": "Design, build, and maintain the iOS and Android applications for the Haramain Broadcast network.",
  "Technical Support Officer": "Provide internal IT support, troubleshoot software issues, and ensure team operational continuity.",
  "Research Assistant": "Conduct deep-dive research into historical and current events surrounding the Haramain for accurate reporting.",
  "Social Media Manager": "Manage the brand's voice, engagement strategy, and analytics across all official social platforms.",
  "Community Manager": "Foster a positive, engaging, and respectful environment within our official groups and digital communities.",
  "Digital Marketing Manager": "Develop strategies to increase global reach, viewership, and platform growth through digital campaigns.",
  "SEO Specialist": "Optimize platform content, articles, and video metadata to rank highly on global search engines.",
  "Audience Engagement Officer": "Interact with viewers during live broadcasts, managing live chats and Q&A sessions.",
  "Moderator": "Enforce community guidelines strictly and politely across live chats and social media comment sections.",
  "Brand Development Officer": "Ensure the visual and tonal integrity of the Haramain Broadcast brand remains premium and consistent globally.",
  "Admin Officer": "Handle internal documentation, team scheduling, and general administrative duties for the management team.",
  "Finance Officer": "Manage internal budgets, track authorized expenses, and assist in future financial planning.",
  "Partnership Manager": "Liaise with external organizations, media outlets, and key figures to establish strategic collaborations.",
  "Sponsorship Manager": "Identify and vet potential halal sponsorship opportunities that align with our core values.",
  "Regional Coordinator": "Manage operations, localize content, and represent Haramain Broadcast in a specific global region.",
  "Field Representative": "On-the-ground personnel (specifically in Makkah/Madinah) to provide real-time updates and media capture.",
  "Volunteer Coordinator": "Manage the recruitment, onboarding, and well-being of the global volunteer network.",
  "Support Team Member": "A versatile role assisting various departments as needed during high-traffic broadcasts."
};

// Comprehensive Global List
const COUNTRIES = [
  { name: "Saudi Arabia", code: "+966" },
  { name: "Palestine", code: "+970" },
  { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" }, 
  { name: "Andorra", code: "+376" }, { name: "Angola", code: "+244" }, { name: "Antigua and Barbuda", code: "+1-268" }, 
  { name: "Argentina", code: "+54" }, { name: "Armenia", code: "+374" }, { name: "Australia", code: "+61" }, 
  { name: "Austria", code: "+43" }, { name: "Azerbaijan", code: "+994" }, { name: "Bahamas", code: "+1-242" }, 
  { name: "Bahrain", code: "+973" }, { name: "Bangladesh", code: "+880" }, { name: "Barbados", code: "+1-246" }, 
  { name: "Belarus", code: "+375" }, { name: "Belgium", code: "+32" }, { name: "Belize", code: "+501" }, 
  { name: "Benin", code: "+229" }, { name: "Bhutan", code: "+975" }, { name: "Bolivia", code: "+591" }, 
  { name: "Bosnia and Herzegovina", code: "+387" }, { name: "Botswana", code: "+267" }, { name: "Brazil", code: "+55" }, 
  { name: "Brunei", code: "+673" }, { name: "Bulgaria", code: "+359" }, { name: "Burkina Faso", code: "+226" }, 
  { name: "Burundi", code: "+257" }, { name: "Cabo Verde", code: "+238" }, { name: "Cambodia", code: "+855" }, 
  { name: "Cameroon", code: "+237" }, { name: "Canada", code: "+1" }, { name: "Central African Republic", code: "+236" }, 
  { name: "Chad", code: "+235" }, { name: "Chile", code: "+56" }, { name: "China", code: "+86" }, 
  { name: "Colombia", code: "+57" }, { name: "Comoros", code: "+269" }, { name: "Congo (Congo-Brazzaville)", code: "+242" }, 
  { name: "Costa Rica", code: "+506" }, { name: "Croatia", code: "+385" }, { name: "Cuba", code: "+53" }, 
  { name: "Cyprus", code: "+357" }, { name: "Czechia (Czech Republic)", code: "+420" }, { name: "Denmark", code: "+45" }, 
  { name: "Djibouti", code: "+253" }, { name: "Dominica", code: "+1-767" }, { name: "Dominican Republic", code: "+1-809" }, 
  { name: "Ecuador", code: "+593" }, { name: "Egypt", code: "+20" }, { name: "El Salvador", code: "+503" }, 
  { name: "Equatorial Guinea", code: "+240" }, { name: "Eritrea", code: "+291" }, { name: "Estonia", code: "+372" }, 
  { name: "Eswatini", code: "+268" }, { name: "Ethiopia", code: "+251" }, { name: "Fiji", code: "+679" }, 
  { name: "Finland", code: "+358" }, { name: "France", code: "+33" }, { name: "Gabon", code: "+241" }, 
  { name: "Gambia", code: "+220" }, { name: "Georgia", code: "+995" }, { name: "Germany", code: "+49" }, 
  { name: "Ghana", code: "+233" }, { name: "Greece", code: "+30" }, { name: "Grenada", code: "+1-473" }, 
  { name: "Guatemala", code: "+502" }, { name: "Guinea", code: "+224" }, { name: "Guinea-Bissau", code: "+245" }, 
  { name: "Guyana", code: "+592" }, { name: "Haiti", code: "+509" }, { name: "Honduras", code: "+504" }, 
  { name: "Hungary", code: "+36" }, { name: "Iceland", code: "+354" }, { name: "India", code: "+91" }, 
  { name: "Indonesia", code: "+62" }, { name: "Iran", code: "+98" }, { name: "Iraq", code: "+964" }, 
  { name: "Ireland", code: "+353" }, { name: "Italy", code: "+39" }, { name: "Jamaica", code: "+1-876" }, 
  { name: "Japan", code: "+81" }, { name: "Jordan", code: "+962" }, { name: "Kazakhstan", code: "+7" }, 
  { name: "Kenya", code: "+254" }, { name: "Kiribati", code: "+686" }, { name: "Kuwait", code: "+965" }, 
  { name: "Kyrgyzstan", code: "+996" }, { name: "Laos", code: "+856" }, { name: "Latvia", code: "+371" }, 
  { name: "Lebanon", code: "+961" }, { name: "Lesotho", code: "+266" }, { name: "Liberia", code: "+231" }, 
  { name: "Libya", code: "+218" }, { name: "Liechtenstein", code: "+423" }, { name: "Lithuania", code: "+370" }, 
  { name: "Luxembourg", code: "+352" }, { name: "Madagascar", code: "+261" }, { name: "Malawi", code: "+265" }, 
  { name: "Malaysia", code: "+60" }, { name: "Maldives", code: "+960" }, { name: "Mali", code: "+223" }, 
  { name: "Malta", code: "+356" }, { name: "Mauritania", code: "+222" }, { name: "Mauritius", code: "+230" }, 
  { name: "Mexico", code: "+52" }, { name: "Moldova", code: "+373" }, { name: "Monaco", code: "+377" }, 
  { name: "Mongolia", code: "+976" }, { name: "Montenegro", code: "+382" }, { name: "Morocco", code: "+212" }, 
  { name: "Mozambique", code: "+258" }, { name: "Myanmar (Burma)", code: "+95" }, { name: "Namibia", code: "+264" }, 
  { name: "Nepal", code: "+977" }, { name: "Netherlands", code: "+31" }, { name: "New Zealand", code: "+64" }, 
  { name: "Nicaragua", code: "+505" }, { name: "Niger", code: "+227" }, { name: "Nigeria", code: "+234" }, 
  { name: "North Korea", code: "+850" }, { name: "North Macedonia", code: "+389" }, { name: "Norway", code: "+47" }, 
  { name: "Oman", code: "+968" }, { name: "Pakistan", code: "+92" }, { name: "Panama", code: "+507" }, 
  { name: "Papua New Guinea", code: "+675" }, { name: "Paraguay", code: "+595" }, { name: "Peru", code: "+51" }, 
  { name: "Philippines", code: "+63" }, { name: "Poland", code: "+48" }, { name: "Portugal", code: "+351" }, 
  { name: "Qatar", code: "+974" }, { name: "Romania", code: "+40" }, { name: "Russia", code: "+7" }, 
  { name: "Rwanda", code: "+250" }, { name: "Saint Kitts and Nevis", code: "+1-869" }, { name: "Saint Lucia", code: "+1-758" }, 
  { name: "Samoa", code: "+685" }, { name: "San Marino", code: "+378" }, { name: "Senegal", code: "+221" }, 
  { name: "Serbia", code: "+381" }, { name: "Seychelles", code: "+248" }, { name: "Sierra Leone", code: "+232" }, 
  { name: "Singapore", code: "+65" }, { name: "Slovakia", code: "+421" }, { name: "Slovenia", code: "+386" }, 
  { name: "Somalia", code: "+252" }, { name: "South Africa", code: "+27" }, { name: "South Korea", code: "+82" }, 
  { name: "South Sudan", code: "+211" }, { name: "Spain", code: "+34" }, { name: "Sri Lanka", code: "+94" }, 
  { name: "Sudan", code: "+249" }, { name: "Suriname", code: "+597" }, { name: "Sweden", code: "+46" }, 
  { name: "Switzerland", code: "+41" }, { name: "Syria", code: "+963" }, { name: "Taiwan", code: "+886" }, 
  { name: "Tajikistan", code: "+992" }, { name: "Tanzania", code: "+255" }, { name: "Thailand", code: "+66" }, 
  { name: "Togo", code: "+228" }, { name: "Tonga", code: "+676" }, { name: "Trinidad and Tobago", code: "+1-868" }, 
  { name: "Tunisia", code: "+216" }, { name: "Turkey", code: "+90" }, { name: "Turkmenistan", code: "+993" }, 
  { name: "Uganda", code: "+256" }, { name: "Ukraine", code: "+380" }, { name: "United Arab Emirates", code: "+971" }, 
  { name: "United Kingdom", code: "+44" }, { name: "United States", code: "+1" }, { name: "Uruguay", code: "+598" }, 
  { name: "Uzbekistan", code: "+998" }, { name: "Vanuatu", code: "+678" }, { name: "Venezuela", code: "+58" }, 
  { name: "Vietnam", code: "+84" }, { name: "Yemen", code: "+967" }, { name: "Zambia", code: "+260" }, 
  { name: "Zimbabwe", code: "+263" }
];

const TIMEZONES = [
  "UTC-12:00 (Baker Island)", "UTC-11:00 (Samoa)", "UTC-10:00 (Hawaii)", "UTC-09:00 (Alaska)", 
  "UTC-08:00 (Pacific Time)", "UTC-07:00 (Mountain Time)", "UTC-06:00 (Central Time)", "UTC-05:00 (Eastern Time)", 
  "UTC-04:00 (Atlantic Time)", "UTC-03:00 (Buenos Aires)", "UTC-02:00 (Mid-Atlantic)", "UTC-01:00 (Azores)",
  "UTC+00:00 (GMT/London)", "UTC+01:00 (WAT/Paris)", "UTC+02:00 (EET/Cairo)", "UTC+03:00 (AST/Riyadh - Makkah Time)", 
  "UTC+04:00 (GST/Dubai)", "UTC+05:00 (PKT/Islamabad)", "UTC+05:30 (IST/New Delhi)", "UTC+06:00 (BST/Dhaka)",
  "UTC+07:00 (WIB/Jakarta)", "UTC+08:00 (MYT/Kuala Lumpur)", "UTC+09:00 (JST/Tokyo)", "UTC+10:00 (AEST/Sydney)",
  "UTC+11:00 (Solomon Is.)", "UTC+12:00 (Fiji)", "UTC+13:00 (New Zealand)", "UTC+14:00 (Line Islands)"
];

const COMMON_LANGUAGES = [
  "English", "Arabic", "Urdu", "Mandarin", "Spanish", "Hindi", "French", 
  "Bengali", "Russian", "Portuguese", "Indonesian", "German", "Japanese", 
  "Swahili", "Turkish", "Tamil", "Persian", "Hausa", "Yoruba", "Malay"
];

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [stepError, setStepError] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [dialCode, setDialCode] = useState("");
  const [customLanguage, setCustomLanguage] = useState("");
  const [showCustomLanguage, setShowCustomLanguage] = useState(false);

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", whatsappNumber: "", country: "", city: "", 
    languages: [] as string[],
    department: "", role: "", experienceLevel: "", currentStatus: "",
    linkedinUrl: "", portfolioUrl: "", motivation: "", relevantExperience: "",
    availableHours: "", timezone: "", agreedToTerms: false
  });

  const steps = [
    { id: 1, name: "Personal Details" },
    { id: 2, name: "Role Selection" },
    { id: 3, name: "Portfolio" },
    { id: 4, name: "Commitment" }
  ];

  // --- STRICT VALIDATION LOGIC ---
  const validateStep = (step: number) => {
    setStepError(""); 
    
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.whatsappNumber || !formData.country || formData.languages.length === 0) {
        setStepError("Please fill in all required fields (marked with *) and select at least one language.");
        return false;
      }
      // Strict regex: Ensures the whatsapp string contains ONLY digits (ignoring spaces or hyphens)
      const cleanNum = formData.whatsappNumber.replace(/[\s\-]/g, '');
      if (!/^\d+$/.test(cleanNum)) {
        setStepError("WhatsApp number must contain only numbers.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.department || !formData.role || !formData.experienceLevel || !formData.currentStatus) {
        setStepError("Please complete all fields regarding your intended role and experience.");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.motivation || !formData.relevantExperience) {
        setStepError("Please fill in your motivation and relevant experience.");
        return false;
      }
      if (formData.motivation.length < 100 || formData.relevantExperience.length < 100) {
        setStepError("Both text fields require a minimum of 100 characters to ensure detailed answers.");
        return false;
      }
    }
    if (step === 4) {
      if (!formData.availableHours || !formData.timezone) {
        setStepError("Please select your availability and timezone.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      setStepError("");
    }
  };
  
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setStepError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === "country") {
      const selectedCountry = COUNTRIES.find(c => c.name === value);
      setDialCode(selectedCountry ? selectedCountry.code : "");
    }

    // Active Number Field Validation: Strip letters
    if (name === "whatsappNumber") {
      processedValue = value.replace(/[^\d\s\-]/g, ''); 
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if (name === 'department') setFormData(prev => ({ ...prev, role: "" }));
  };

  const toggleLanguage = (lang: string) => {
    if (lang === "Other") {
      setShowCustomLanguage(!showCustomLanguage);
      return;
    }
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang) 
        ? prev.languages.filter(l => l !== lang) 
        : [...prev.languages, lang]
    }));
  };

  useEffect(() => {
    if (customLanguage && !formData.languages.includes(customLanguage)) {
      const filtered = formData.languages.filter(l => !l.startsWith("Custom:"));
      setFormData(prev => ({ ...prev, languages: [...filtered, `Custom: ${customLanguage}`] }));
    }
  }, [customLanguage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setResumeFile(e.target.files[0]);
  };

  const handleTermsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToBottom(true);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) throw new Error("Cloudinary configuration missing.");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();
    if (!res.ok) throw new Error(fileData.error?.message || "Failed to upload file");
    return fileData.secure_url;
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      let finalResumeUrl = "";
      if (resumeFile) finalResumeUrl = await uploadToCloudinary(resumeFile);

      const fullWhatsApp = formData.whatsappNumber.startsWith("+") 
        ? formData.whatsappNumber 
        : `${dialCode} ${formData.whatsappNumber}`;

      const payload = { 
        ...formData, 
        whatsappNumber: fullWhatsApp,
        languages: formData.languages.join(", "), 
        resumeUrl: finalResumeUrl 
      };

      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111827] p-10 rounded-3xl shadow-2xl max-w-lg w-full border border-gray-800">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-brand-accent/20 border border-brand-accent mb-6">
            <CheckCircle className="h-10 w-10 text-brand-accent" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Application Submitted</h2>
          <p className="text-gray-400 mb-6 text-lg">
            JazakAllah khair. A confirmation has been sent to <strong className="text-white break-all">{formData.email}</strong>. 
          </p>
          <div className="p-4 bg-[#0B1120] rounded-xl border border-gray-800">
            <p className="text-sm text-gray-500">
              Our management team will review your portfolio. Shortlisted candidates will be contacted directly for the next phase.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-200 py-12 px-4 sm:px-6 lg:px-8 selection:bg-brand-accent selection:text-white">
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/pattern.png')" }} />
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold text-white tracking-tight mb-8">
            Volunteer Application
          </motion.h2>
          
          <nav aria-label="Progress" className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -z-10 -translate-y-1/2 rounded-full"></div>
            <ol role="list" className="flex items-center justify-between">
              {steps.map((step) => (
                <li key={step.name} className="relative">
                  <div className={`flex flex-col items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 shadow-xl bg-[#0B1120] ${
                    currentStep === step.id ? "border-brand-accent text-brand-accent scale-110 shadow-brand-accent/20" : 
                    currentStep > step.id ? "border-brand-accent bg-brand-accent text-white" : 
                    "border-gray-700 text-gray-600"
                  }`}>
                    {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{step.id}</span>}
                  </div>
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap hidden sm:block text-gray-400">
                    {step.name}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {errorMsg && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-400">Submission Failed</p>
              <p className="text-sm text-red-300/80">{errorMsg}</p>
            </div>
          </motion.div>
        )}

        {stepError && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
            <p className="text-sm font-medium text-yellow-500">{stepError}</p>
          </motion.div>
        )}

        <div className="bg-[#111827] shadow-2xl rounded-3xl p-6 sm:p-12 border border-gray-800 relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1 */}
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                  <p className="text-gray-500 text-sm mt-1">Provide your accurate details for seamless communication.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent focus:ring-brand-accent p-3.5 transition-colors" placeholder="e.g. Abdullah Rahman" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent focus:ring-brand-accent p-3.5 transition-colors" placeholder="email@domain.com" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Country of Residence <span className="text-red-500">*</span></label>
                    <select name="country" value={formData.country} onChange={handleChange} className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent focus:ring-brand-accent p-3.5 transition-colors appearance-none">
                      <option value="">Select Country</option>
                      {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp Number <span className="text-red-500">*</span></label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-4 bg-gray-800 border border-r-0 border-gray-700 rounded-l-xl text-gray-400 font-medium select-none min-w-[70px]">
                        {dialCode || "Code"}
                      </div>
                      <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} type="tel" className="w-full rounded-r-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent focus:ring-brand-accent p-3.5 transition-colors" placeholder="Numbers only" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-3">Languages Spoken <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_LANGUAGES.map(lang => (
                        <button
                          key={lang} type="button" onClick={() => toggleLanguage(lang)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                            formData.languages.includes(lang) 
                              ? "bg-brand-accent/20 border-brand-accent text-brand-accent" 
                              : "bg-[#0B1120] border-gray-700 text-gray-400 hover:border-gray-500"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                      <button
                        type="button" onClick={() => toggleLanguage("Other")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          showCustomLanguage ? "bg-gray-800 border-gray-500 text-white" : "bg-[#0B1120] border-gray-700 text-gray-400 hover:border-gray-500"
                        }`}
                      >
                        + Other
                      </button>
                    </div>
                    
                    <AnimatePresence>
                      {showCustomLanguage && (
                        <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 12 }} exit={{ opacity: 0, height: 0, marginTop: 0 }}>
                          <input 
                            type="text" 
                            placeholder="Type additional languages (comma separated)..." 
                            value={customLanguage}
                            onChange={(e) => setCustomLanguage(e.target.value)}
                            className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent p-3 text-sm"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Role Selection</h3>
                  <p className="text-gray-500 text-sm mt-1">Select the department and exact role you are applying for.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 relative">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Department <span className="text-red-500">*</span></label>
                    <select name="department" value={formData.department} onChange={handleChange} className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent p-3.5 appearance-none">
                      <option value="">Select a Department</option>
                      <option value="BROADCAST_PRODUCTION">Broadcast & Production</option>
                      <option value="CONTENT_EDITORIAL">Content & Editorial</option>
                      <option value="DESIGN_ENGINEERING">Design & Engineering</option>
                      <option value="MARKETING_ENGAGEMENT">Marketing & Engagement</option>
                      <option value="ADMIN_OPERATIONS">Administration & Operations</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Specific Role <span className="text-red-500">*</span></label>
                    <select name="role" value={formData.role} onChange={handleChange} disabled={!formData.department} className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent p-3.5 appearance-none disabled:opacity-50 disabled:cursor-not-allowed">
                      <option value="">Select a Role</option>
                      {formData.department && DEPARTMENTS[formData.department as keyof typeof DEPARTMENTS].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>

                    <AnimatePresence>
                      {formData.role && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-3 p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex gap-3 items-start">
                           <Info className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                           <div>
                             <p className="text-white font-semibold text-sm mb-1">{formData.role} Requirements</p>
                             <p className="text-gray-400 text-sm leading-relaxed">{ROLE_DESCRIPTIONS[formData.role]}</p>
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Experience Level <span className="text-red-500">*</span></label>
                    <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent p-3.5 appearance-none">
                      <option value="">Select Experience</option>
                      <option value="0-1">0 - 1 Years</option>
                      <option value="1-3">1 - 3 Years</option>
                      <option value="3-5">3 - 5 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Current Professional Status <span className="text-red-500">*</span></label>
                    <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent p-3.5 appearance-none">
                      <option value="">Select Status</option>
                      <option value="Student">Student</option>
                      <option value="Employed">Employed</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Unemployed">Unemployed</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Portfolio & Motivation</h3>
                  <p className="text-gray-500 text-sm mt-1">Show us your past work and tell us why you want to join.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Link to Work (GitHub, Behance) <span className="text-gray-600 text-xs">(Optional)</span></label>
                    <input name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} type="url" className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent p-3.5" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Resume / CV Document (PDF) <span className="text-gray-600 text-xs">(Optional)</span></label>
                    <label className="flex items-center justify-center w-full h-[52px] border-2 border-gray-700 border-dashed rounded-xl cursor-pointer bg-[#0B1120] hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-2">
                        <UploadCloud className="w-5 h-5 text-brand-accent" />
                        <span className="text-sm font-medium text-gray-300 truncate max-w-[200px]">
                          {resumeFile ? resumeFile.name : "Select Document"}
                        </span>
                      </div>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-medium text-gray-400">Why do you want to volunteer for Haramain Broadcast? <span className="text-red-500">*</span></label>
                    <span className={`text-xs font-medium ${formData.motivation.length < 100 ? "text-red-400" : "text-green-400"}`}>{formData.motivation.length} / 100 min</span>
                  </div>
                  <textarea name="motivation" value={formData.motivation} onChange={handleChange} rows={4} className={`w-full rounded-xl bg-[#0B1120] border text-white focus:ring-brand-accent p-3.5 resize-none ${formData.motivation.length > 0 && formData.motivation.length < 100 ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-brand-accent"}`} placeholder="Share your sincere motivation (Minimum 100 characters)..." />
                </div>
                
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-medium text-gray-400">Briefly describe your most relevant project or experience. <span className="text-red-500">*</span></label>
                    <span className={`text-xs font-medium ${formData.relevantExperience.length < 100 ? "text-red-400" : "text-green-400"}`}>{formData.relevantExperience.length} / 100 min</span>
                  </div>
                  <textarea name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} rows={4} className={`w-full rounded-xl bg-[#0B1120] border text-white focus:ring-brand-accent p-3.5 resize-none ${formData.relevantExperience.length > 0 && formData.relevantExperience.length < 100 ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-brand-accent"}`} placeholder="Detail your experience (Minimum 100 characters)..." />
                </div>
              </motion.div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Commitment</h3>
                  <p className="text-gray-500 text-sm mt-1">Finalize your availability and accept the organizational terms.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Available Hours per Week <span className="text-red-500">*</span></label>
                    <select name="availableHours" value={formData.availableHours} onChange={handleChange} className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent p-3.5 appearance-none">
                      <option value="">Select Hours</option>
                      <option value="2-5">2 - 5 Hours</option>
                      <option value="5-10">5 - 10 Hours</option>
                      <option value="10-20">10 - 20 Hours</option>
                      <option value="20+">20+ Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Timezone <span className="text-red-500">*</span></label>
                    <select name="timezone" value={formData.timezone} onChange={handleChange} className="w-full rounded-xl bg-[#0B1120] border-gray-700 text-white focus:border-brand-accent p-3.5 appearance-none">
                      <option value="">Select Timezone</option>
                      {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-[#0B1120] rounded-2xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded flex items-center justify-center border transition-colors ${formData.agreedToTerms ? "bg-brand-accent border-brand-accent" : "bg-[#111827] border-gray-600"}`}>
                       {formData.agreedToTerms && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">Organizational Terms & Conditions <span className="text-red-500">*</span></p>
                      <p className="text-sm text-gray-500 mt-1">You must read and accept the volunteer terms to submit your application.</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setIsTermsOpen(true)}
                    className="shrink-0 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> {formData.agreedToTerms ? "Review Terms" : "Read Terms to Accept"}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          <div className="mt-12 flex justify-between items-center pt-6 border-t border-gray-800">
            <button
              type="button" onClick={handleBack} disabled={currentStep === 1 || isSubmitting}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all ${
                currentStep === 1 || isSubmitting ? "text-gray-600 cursor-not-allowed opacity-50" : "text-white bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <button
              type="button" onClick={currentStep === 4 ? handleSubmit : handleNext}
              disabled={isSubmitting || (currentStep === 4 && !formData.agreedToTerms)}
              className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-brand-accent hover:bg-blue-500 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : 
               currentStep === 4 ? "Submit Application" : <>Next Step <ChevronRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isTermsOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111827] border border-gray-700 rounded-3xl w-full max-w-3xl overflow-hidden flex flex-col shadow-2xl h-[85vh] max-h-[800px]"
            >
              <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#0B1120]">
                <h3 className="text-xl font-bold text-white">Volunteer Agreement Terms</h3>
                <button onClick={() => setIsTermsOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div onScroll={handleTermsScroll} className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-300 text-sm leading-relaxed custom-scrollbar relative">
                <div className="bg-brand-accent/10 border border-brand-accent/30 text-brand-accent p-4 rounded-xl mb-6 font-medium text-center">
                  Scroll to the absolute bottom of this document to enable the Accept button.
                </div>

                <h4 className="font-bold text-white text-base">1. Nature of Participation</h4>
                <p>All positions under HARAMAIN BROADCAST are entirely volunteer-based unless officially stated otherwise in writing by Executive Management. Participation on the team does not constitute an employer-employee relationship and does not create any entitlement to salary, wages, equity, profit-sharing, or ownership rights.</p>

                <h4 className="font-bold text-white text-base mt-6">2. Intellectual Property & Asset Ownership</h4>
                <p>Volunteers, contributors, moderators, and all team members acknowledge that they do not hold any ownership rights over HARAMAIN BROADCAST. This includes, but is not limited to, platforms, social media pages, websites, source code, brand assets, systems, and content, unless formally documented and executed by the Founder/Management.</p>

                <h4 className="font-bold text-white text-base mt-6">3. Respect for Leadership & Decision-Making</h4>
                <p>Team members must respect the established leadership hierarchy and their assigned scopes of responsibility. Final authority regarding organizational strategy, branding, partnerships, security protocols, platform management, and operational direction resides exclusively with Management.</p>

                <h4 className="font-bold text-white text-base mt-6">4. Code of Professional Conduct</h4>
                <p>Every team member is expected to maintain the highest standards of professionalism, honesty, discipline, and respect when representing HARAMAIN BROADCAST. Abusive behavior, harassment, misconduct, or actions that could bring disrepute to the brand are strictly prohibited.</p>

                <h4 className="font-bold text-white text-base mt-6">5. Strict Confidentiality</h4>
                <p>Internal communications, passwords, technical infrastructure, private strategies, operational procedures, financial records, and sensitive organizational data must remain strictly confidential. Sharing such information outside the organization is a severe breach.</p>

                <h4 className="font-bold text-white text-base mt-6">6. Prohibition of Unauthorized Fundraising</h4>
                <p>No team member may solicit donations, sponsorships, payments, or financial contributions in the name of HARAMAIN BROADCAST without formalized, written approval from Management. Unauthorized fundraising is a severe violation of organizational trust.</p>

                <h4 className="font-bold text-white text-base mt-6">7. Upholding Islamic Integrity</h4>
                <p>As an Islamic media platform, all team members are required to uphold core Islamic values of Amanah (trustworthiness), Sidq (honesty), and Adab (respectful conduct). Content creation and personal behavior must align with and reflect the mission and ethical standards of HARAMAIN BROADCAST.</p>
                
                <h4 className="font-bold text-white text-base mt-6">8. Resignation & Offboarding</h4>
                <p>If a volunteer wishes to step down from their role, they must provide reasonable notice to their coordinator to allow for a smooth transition. Upon departure, the volunteer must relinquish all administrative access.</p>
                
                <p className="pt-8 text-center text-gray-500 italic">-- End of Document --</p>
              </div>

              <div className="px-6 py-5 border-t border-gray-800 bg-[#0B1120] flex justify-end gap-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, agreedToTerms: false }));
                    setIsTermsOpen(false);
                  }} 
                  className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white font-medium transition-colors"
                >
                  Reject & Close
                </button>
                <button 
                  type="button" 
                  disabled={!hasScrolledToBottom}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, agreedToTerms: true }));
                    setStepError(""); 
                    setIsTermsOpen(false);
                  }} 
                  className={`px-8 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                    hasScrolledToBottom 
                      ? "bg-brand-accent text-white shadow-[0_0_15px_rgba(14,165,233,0.4)] hover:bg-blue-500 cursor-pointer" 
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  I Accept the Terms
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
