import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { sendStatusUpdateEmail } from '@/lib/email';

const prisma = new PrismaClient();

// Security Check Function
async function isAuthenticated() {
  const token = cookies().get('admin_token')?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const applications = await prisma.applicant.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    // 1. Get the current status from the DB before updating
    const currentApp = await prisma.applicant.findUnique({ where: { id } });
    if (!currentApp) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // 2. Update the status in the database
    const updatedApplication = await prisma.applicant.update({
      where: { id },
      data: { status }
    });

    // 3. Automatically send an email IF the status is officially finalized AND it actually changed
    const finalStatuses = ["SHORTLISTED", "ACCEPTED", "REJECTED"];
    if (currentApp.status !== status && finalStatuses.includes(status)) {
      console.log(`[ADMIN] Triggering Status Email to ${updatedApplication.email} for ${status}`);
      
      await sendStatusUpdateEmail(
        updatedApplication.email, 
        updatedApplication.fullName, 
        status, 
        updatedApplication.role
      );
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
