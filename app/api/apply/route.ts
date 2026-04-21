import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming form data
    const body = await request.json();

    // 2. Map string department to the Prisma Enum
    const departmentEnum = body.department as any; // Bypassing strict type check for the payload

    // 3. Save the applicant to the database
    const newApplicant = await prisma.applicant.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        whatsappNumber: body.whatsappNumber,
        country: body.country,
        city: body.city,
        // If languages are passed as a comma-separated string, split them. Otherwise, default to empty array.
        languages: body.languages ? body.languages.split(",").map((l: string) => l.trim()) : [],
        
        department: departmentEnum,
        role: body.role,
        experienceLevel: body.experienceLevel,
        currentStatus: body.currentStatus,
        
        linkedinUrl: body.linkedinUrl || null,
        portfolioUrl: body.portfolioUrl || null,
        // We will pass the Cloudinary URL here later once uploaded
        resumeUrl: body.resumeUrl || null, 
        motivation: body.motivation,
        relevantExperience: body.relevantExperience,
        
        availableHours: body.availableHours,
        timezone: body.timezone,
        agreedToTerms: body.agreedToTerms,
      },
    });

    // 4. TODO: Trigger ZeptoMail confirmation email here
    // await sendConfirmationEmail(newApplicant.email, newApplicant.fullName);

    // 5. Return success response to the frontend
    return NextResponse.json(
      { message: "Application submitted successfully!", applicantId: newApplicant.id },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error submitting application:", error);
    
    // Handle specific Prisma unique constraint error (e.g., email already applied)
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
  } finally {
    // Disconnect Prisma to prevent memory leaks in serverless environments
    await prisma.$disconnect();
  }
}
