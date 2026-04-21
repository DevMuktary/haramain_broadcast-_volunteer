"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

// Department and Role Mapping
const DEPARTMENTS = {
  BROADCAST_PRODUCTION: ["Broadcast Director", "Live Stream Manager", "Video Editor", "Audio Specialist"],
  CONTENT_EDITORIAL: ["Content Manager", "Content Publisher", "News & Update Coordinator", "Islamic Content Reviewer", "Translation Officer", "Arabic Content Specialist", "English Content Specialist"],
  DESIGN_ENGINEERING: ["Graphics Designer", "Web Developer", "Mobile App Developer", "Technical Support Officer", "Research Assistant"],
  MARKETING_ENGAGEMENT: ["Social Media Manager", "Community Manager", "Digital Marketing Manager", "SEO Specialist", "Audience Engagement Officer", "Moderator", "Brand Development Officer"],
  ADMIN_OPERATIONS: ["Admin Officer", "Finance Officer", "Partnership Manager", "Sponsorship Manager", "Regional Coordinator", "Field Representative", "Volunteer Coordinator", "Support Team Member"]
};

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "", email: "", whatsappNumber: "", country: "", city: "",
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

  // Handle generic text/select changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Reset role if department changes
      if (name === 'department') setFormData(prev => ({ ...prev, role: "" }));
    }
  };

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

        {/* Form Area */}
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-10 border border-gray-100 min-h-[400px]">
          
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                  <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} type="tel" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="+234..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City & Country</label>
                  <input name="city" value={formData.city} onChange={handleChange} type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Lagos, Nigeria" />
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
                  <label className="block text-sm font-medium text-gray-700">Portfolio / GitHub Link</label>
                  <input name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} type="url" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 p-2 border" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume / CV (PDF)</label>
                  <input type="file" accept=".pdf,.doc,.docx" className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border p-1 rounded-md" />
                  <p className="text-xs text-gray-400 mt-1">We will connect Cloudinary to this later.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Why do you want to volunteer for Haramain Broadcast?</label>
                <textarea name="motivation" value={formData.motivation} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 p-2 border" placeholder="Your motivation..." />
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
                      By checking this box, I confirm that I have read and agree to the HARAMAIN BROADCAST Volunteer Team Rules & Terms. I understand this is an unpaid volunteer position and all intellectual property remains with the organization.
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
              disabled={currentStep === 1}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                currentStep === 1 ? "text-gray-400 bg-gray-100 cursor-not-allowed border-transparent" : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={currentStep === 4 ? () => console.log("Submit Form", formData) : handleNext}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {currentStep === 4 ? "Submit Application" : "Next Step"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
