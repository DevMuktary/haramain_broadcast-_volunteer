export async function sendConfirmationEmail(toEmail: string, applicantName: string) {
  const token = process.env.ZEPTOMAIL_TOKEN;
  const bounceAddress = process.env.ZEPTOMAIL_BOUNCE_ADDRESS;
  const fromAddress = process.env.ZEPTOMAIL_FROM_ADDRESS;
  
  // REPLACE THIS with your actual live Railway domain
  const LIVE_DOMAIN = "https://volunteer.haramainbroadcast.live"; 

  console.log("--- INITIATING ZEPTOMAIL REQUEST ---");
  console.log(`To: ${toEmail} | Name: ${applicantName}`);
  
  if (!token || !bounceAddress || !fromAddress) {
    console.error("❌ ZEPTOMAIL ERROR: Missing Environment Variables!");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Received - Haramain Broadcast</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; padding: 40px 20px;">
        <tr>
          <td align="center">
            
            <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              
              <tr>
                <td align="center" style="background-color: #0B1120; padding: 40px 20px; border-bottom: 3px solid #0ea5e9;">
                  <img src="${LIVE_DOMAIN}/logo.png" alt="Haramain Broadcast" width="60" style="display: block; margin-bottom: 15px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Haramain Broadcast</h1>
                  <p style="color: #9ca3af; margin: 8px 0 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Volunteer Recruitment</p>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 40px 20px 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px;">As-salamu alaykum, ${applicantName},</h2>
                  <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                    JazakAllah khair for your interest in joining the Haramain Broadcast team. We are writing to officially confirm that your volunteer application has been successfully received.
                  </p>
                  <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                    Our executive and editorial teams are currently reviewing applications. We are looking for individuals who align with our technical standards and organizational values. If your portfolio and experience match our current openings, a coordinator will reach out to you directly for the next phase.
                  </p>

                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px;">
                    <tr>
                      <td>
                        <span style="color: #166534; font-size: 13px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Current Status</span><br>
                        <strong style="color: #15803d; font-size: 16px; display: block; margin-top: 4px;">Application Under Review</strong>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 30px 40px; background-color: #ffffff; border-top: 1px solid #f3f4f6;">
                  <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.5;">
                    BarakAllahu feek,<br>
                    <strong>The Management Team</strong><br>
                    Haramain Broadcast
                  </p>
                  
                  <div style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #e5e7eb;">
                    <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                      <strong>Important:</strong> To ensure you do not miss critical updates regarding your application, please add this email address to your trusted contacts or mark this email as "Not Spam."
                    </p>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>

    </body>
    </html>
  `;

  const payload = {
    bounce_address: bounceAddress,
    from: { address: fromAddress, name: "Haramain Broadcast" },
    to: [{ email_address: { address: toEmail, name: applicantName } }],
    subject: "Your Application to Haramain Broadcast",
    htmlbody: htmlContent
  };

  try {
    const response = await fetch("https://api.zeptomail.com/v1.1/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token.startsWith("Zoho-enczapikey") ? token : `Zoho-enczapikey ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
       console.error("❌ ZEPTOMAIL REJECTED:", await response.text());
    } else {
       console.log(`✅ SUCCESS! Confirmation email delivered to ${toEmail}`);
    }
  } catch (error) {
    console.error("❌ ZEPTOMAIL FATAL ERROR:", error);
  }
}
