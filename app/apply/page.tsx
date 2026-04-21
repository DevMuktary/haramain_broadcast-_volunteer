"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "", email: "", whatsappNumber: "", country: "", city: "", languages: [],
    // Step 2
    department: "", role: "", experienceLevel: "", currentStatus: "",
    // Step 3
    linkedinUrl: "", portfolioUrl: "", motivation: "", relevantExperience: "",
    // Step 4
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
                  <div className={`flex items-center justify-center p-3 text-sm font-medium border-b-2 ${
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
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-10 border border-gray-100">
          
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                  <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" placeholder="+234..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City & Country</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" placeholder="Lagos, Nigeria" />
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for Steps 2, 3, 4 */}
          {currentStep > 1 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <p className="text-gray-500 text-center py-10">Step {currentStep} fields will go here.</p>
             </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentStep === 1 ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {currentStep === 4 ? "Submit Application" : "Next Step"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
