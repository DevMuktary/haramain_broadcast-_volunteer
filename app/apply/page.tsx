"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, UploadCloud, CheckCircle } from "lucide-react";

const DEPARTMENTS = {
  BROADCAST_PRODUCTION: ["Broadcast Director", "Live Stream Manager", "Video Editor", "Audio Specialist"],
  CONTENT_EDITORIAL: ["Content Manager", "Content Publisher", "News & Update Coordinator", "Islamic Content Reviewer", "Translation Officer", "Arabic Content Specialist", "English Content Specialist"],
  DESIGN_ENGINEERING: ["Graphics Designer", "Web Developer", "Mobile App Developer", "Technical Support Officer", "Research Assistant"],
  MARKETING_ENGAGEMENT: ["Social Media Manager", "Community Manager", "Digital Marketing Manager", "SEO Specialist", "Audience Engagement Officer", "Moderator", "Brand Development Officer"],
  ADMIN_OPERATIONS: ["Admin Officer", "Finance Officer", "Partnership Manager", "Sponsorship Manager", "Regional Coordinator", "Field Representative", "Volunteer Coordinator", "Support Team Member"]
};

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Hold the actual file selected by the user
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: "", email: "", whatsappNumber: "", country: "", city: "", languages: "",
    department: "", role: "", experienceLevel: "", currentStatus: "",
    linkedinUrl: "", portfolioUrl: "", motivation: "", relevantExperience: "",
    availableHours: "", timezone: "", agreedToTerms: false
  });

  const steps = [
    { id: 1, name: "Personal Details" },
    { id: 2, name: "Role & Experience" },
    { id: 3, name: "Portfolio & Motivation" },
    { id: 4, name: "Commitment" }
  ];

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'department') setFormData(prev => ({ ...prev, role: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary credentials are missing in environment variables.");
    }

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
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      let finalResumeUrl = "";

      // 1. Upload Resume to Cloudinary if provided
      if (resumeFile) {
        finalResumeUrl = await uploadToCloudinary(resumeFile);
      }

      // 2. Prepare payload for our API
      const payload = {
        ...formData,
        resumeUrl: finalResumeUrl,
      };

      // 3. Send to our backend
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong during submission.");
      }

      // 4. Success! Show success screen
      setIsSuccess(true);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            JazakAllah khair for volunteering. We have received your application and sent a confirmation email to <strong>{formData.email}</strong>. 
          </p>
          <p className="text-sm text-gray-500">
            Our management team will review your details. Shortlisted candidates will be contacted via email or WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header & Progress Bar */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Volunteer Application
          </h2>
          
          <nav aria-label="Progress">
            <ol role="list" className="flex items-center justify-between space-x-2">
              {steps.map((step) => (
                <li key={step.name} className="relative flex-1">
                  <div className={`flex items-center justify-center p-3 text-sm font-medium border-b-2 transition-colors duration-300 ${
                    currentStep === step.id ? "border-blue-600 text-blue-600" : 
                    currentStep > step.id ? "border-green-500 text-green-500" : 
                    "border-gray-200 text-gray-500"
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                    ) : (
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs mr-2">
                        {step.id}
                      </span>
                    )}
                    <span className="hidden sm:block">{step.name}</span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 animate-in fade-in">
            <p className="font-medium">Submission Failed</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}

        {/* Form Area */}
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-10 border border-gray-100 min-h-[400px]">
          
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                  <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} type="tel" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City & Country</label>
                  <input name="city" value={formData.city} onChange={handleChange} type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Lagos, Nigeria" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Languages Spoken</label>
                  <input name="languages" value={formData.languages} onChange={handleChange} type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="English, Arabic, Yoruba (Comma separated)" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Role & Experience */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Role Selection</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select name="department" value={formData.department} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white">
                    <option value="">Select a Department</option>
                    <option value="BROADCAST_PRODUCTION">Broadcast & Production</option>
                    <option value="CONTENT_EDITORIAL">Content & Editorial</option>
                    <option value="DESIGN_ENGINEERING">Design & Engineering</option>
                    <option value="MARKETING_ENGAGEMENT">Marketing & Engagement</option>
                    <option value="ADMIN_OPERATIONS">Administration & Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specific Role</label>
                  <select name="role" value={formData.role} onChange={handleChange} disabled={!formData.department} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white disabled:bg-gray-100">
                    <option value="">Select a Role</option>
                    {formData.department && DEPARTMENTS[formData.department as keyof typeof DEPARTMENTS].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white">
                    <option value="">Select Experience</option>
                    <option value="0-1">0 - 1 Years</option>
                    <option value="1-3">1 - 3 Years</option>
                    <option value="3-5">3 - 5 Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Status</label>
                  <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white">
                    <option value="">Select Status</option>
                    <option value="Student">Student</option>
                    <option value="Employed">Employed</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Portfolio & Motivation */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Portfolio & Motivation</h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Portfolio / GitHub / LinkedIn</label>
                  <input name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} type="url" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 p-2 border" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume / CV (PDF)</label>
                  <div className="mt-1 flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-14 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <UploadCloud className="w-5 h-5 text-gray-500" />
                        <p className="text-sm text-gray-500 font-semibold">
                          {resumeFile ? resumeFile.name : "Click to select file"}
                        </p>
                      </div>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Why do you want to volunteer for Haramain Broadcast?</label>
                <textarea name="motivation" value={formData.motivation} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Briefly describe your relevant experience.</label>
                <textarea name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} rows={2} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 p-2 border" />
              </div>
            </div>
          )}

          {/* Step 4: Commitment */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Commitment & Agreement</h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Available Hours per Week</label>
                  <select name="availableHours" value={formData.availableHours} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 p-2 border bg-white">
                    <option value="">Select Hours</option>
                    <option value="2-5">2 - 5 Hours</option>
                    <option value="5-10">5 - 10 Hours</option>
                    <option value="10-20">10 - 20 Hours</option>
                    <option value="20+">20+ Hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timezone</label>
                  <input name="timezone" value={formData.timezone} onChange={handleChange} type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 p-2 border" placeholder="e.g. GMT+1 (WAT)" />
                </div>
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-900">I agree to the Terms & Conditions</label>
                    <p className="text-gray-500 mt-1">
                      By checking this box, I confirm that I have read and agree to the HARAMAIN BROADCAST Volunteer Team Rules & Terms. I understand this is an unpaid volunteer position.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                currentStep === 1 || isSubmitting ? "text-gray-400 bg-gray-100 cursor-not-allowed border-transparent" : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={currentStep === 4 ? handleSubmit : handleNext}
              disabled={isSubmitting || (currentStep === 4 && !formData.agreedToTerms)}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                currentStep === 4 ? "Submit Application" : "Next Step"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
