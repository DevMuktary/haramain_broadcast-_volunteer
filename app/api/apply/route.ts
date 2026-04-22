import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendConfirmationEmail, sendAdminAlertEmail } from "@/lib/email"; // Imported the admin alert

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(`[API] Received new application for: ${body.email}`);

    // 1. Save the applicant to the database
    const newApplicant = await prisma.applicant.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        whatsappNumber: body.whatsappNumber,
        country: body.country,
        city: body.city || "",
        languages: body.languages ? body.languages.split(",").map((l: string) => l.trim()) : [],
        
        department: body.department as any,
        role: body.role,
        experienceLevel: body.experienceLevel,
        currentStatus: body.currentStatus,
        
        linkedinUrl: body.linkedinUrl || null,
        portfolioUrl: body.portfolioUrl || null,
        resumeUrl: body.resumeUrl || null, 
        motivation: body.motivation,
        relevantExperience: body.relevantExperience,
        
        availableHours: body.availableHours,
        timezone: body.timezone,
        agreedToTerms: body.agreedToTerms,
      },
    });

    console.log(`[API] Database save successful. ID: ${newApplicant.id}`);

    // 2. Trigger Emails Concurrently
    console.log("[API] Firing ZeptoMail routines...");
    
    // We use Promise.all to send both emails at the exact same time without slowing down the server
    await Promise.all([
      sendConfirmationEmail(newApplicant.email, newApplicant.fullName),
      sendAdminAlertEmail(newApplicant.fullName, newApplicant.role, newApplicant.department)
    ]);

    console.log("[API] Email execution complete.");

    // 3. Return success response to the frontend
    return NextResponse.json(
      { message: "Application submitted successfully!", applicantId: newApplicant.id },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("❌ [API] FATAL ERROR IN ROUTE:", error);
    
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json(
        { error: "An application with this email address already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
