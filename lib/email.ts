export async function sendConfirmationEmail(toEmail: string, applicantName: string) {
  // ZeptoMail API Endpoint
  const url = "https://api.zeptomail.com/v1.1/email";
  
  // These will come from your Railway environment variables later
  const token = process.env.ZEPTOMAIL_TOKEN;
  const bounceAddress = process.env.ZEPTOMAIL_BOUNCE_ADDRESS;
  const fromAddress = process.env.ZEPTOMAIL_FROM_ADDRESS; 

  if (!token || !bounceAddress || !fromAddress) {
    console.warn("ZeptoMail credentials are missing. Email not sent.");
    return;
  }

  const payload = {
    bounce_address: bounceAddress,
    from: {
      address: fromAddress,
      name: "Haramain Broadcast"
    },
    to: [
      {
        email_address: {
          address: toEmail,
          name: applicantName
        }
      }
    ],
    subject: "Application Received - Haramain Broadcast",
    htmlbody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #111827;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e5e7eb;">
          <h2 style="color: #0ea5e9; margin-bottom: 0;">HARAMAIN BROADCAST</h2>
          <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Volunteer Recruitment</p>
        </div>
        <div style="padding: 20px 0;">
          <p>As-salamu alaykum, <strong>${applicantName}</strong>,</p>
          <p>JazakAllah khair for your interest in volunteering with Haramain Broadcast.</p>
          <p>This email is to confirm that we have successfully received your application. Our management team will carefully review your details, portfolio, and experience against our requirements.</p>
          <p>Please note that due to the high volume of applications, we will only contact shortlisted candidates for the next phase. Keep an eye on your email and WhatsApp for any updates.</p>
        </div>
        <div style="padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
          <p>BarakAllahu feek,<br/><strong>Haramain Broadcast Management Team</strong></p>
        </div>
      </div>
    `
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `SendBounceToken ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
       const errorData = await response.text();
       console.error("ZeptoMail API Error:", errorData);
    } else {
       console.log(`Confirmation email sent successfully to ${toEmail}`);
    }
  } catch (error) {
    console.error("Failed to send email request:", error);
  }
}
