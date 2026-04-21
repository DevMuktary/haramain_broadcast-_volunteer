export async function sendConfirmationEmail(toEmail: string, applicantName: string) {
  // 1. Initialize Credentials
  const token = process.env.ZEPTOMAIL_TOKEN;
  const bounceAddress = process.env.ZEPTOMAIL_BOUNCE_ADDRESS;
  const fromAddress = process.env.ZEPTOMAIL_FROM_ADDRESS;
  
  // REPLACE THIS with your actual live Railway domain once deployed
  const LIVE_DOMAIN = "https://haramainbroadcast.live"; 

  // 2. Strict Logging for Debugging in Railway
  console.log("--- INITIATING ZEPTOMAIL REQUEST ---");
  console.log(`To: ${toEmail} | Name: ${applicantName}`);
  
  if (!token || !bounceAddress || !fromAddress) {
    console.error("❌ ZEPTOMAIL ERROR: Missing Environment Variables!");
    console.error(`Token present: ${!!token}, Bounce present: ${!!bounceAddress}, From present: ${!!fromAddress}`);
    return; // Stop execution if variables are missing
  }

  // 3. The World-Class HTML Table Template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Received</title>
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
                  <p style="color: #9ca3af; margin: 8px 0 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Official Recruitment Portal</p>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 40px 20px 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px;">As-salamu alaykum, ${applicantName},</h2>
                  <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                    JazakAllah khair for your interest in volunteering with the <strong>Haramain Broadcast</strong> team.
                  </p>
                  <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                    This is an automated receipt confirming that your application and portfolio have been successfully securely transmitted to our management database.
                  </p>

                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6; border-radius: 8px; padding: 20px;">
                    <tr>
                      <td style="padding-bottom: 10px;">
                        <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600;">Status</span><br>
                        <strong style="color: #059669; font-size: 15px;">Application Received (Under Review)</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 10px; border-top: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600;">Next Steps</span><br>
                        <span style="color: #111827; font-size: 14px;">Our technical and editorial leads will review your credentials against our corporate standards. If shortlisted, you will be contacted directly via Email or WhatsApp.</span>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 30px 40px; background-color: #ffffff; border-top: 1px solid #f3f4f6;">
                  <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                    BarakAllahu feek,<br>
                    <strong>Haramain Broadcast Executive Management</strong>
                  </p>
                  <p style="margin: 15px 0 0 0; color: #d1d5db; font-size: 11px;">
                    This is an automated transactional email. Please do not reply directly to this address.
                  </p>
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
    htmlbody: htmlContent
  };

  try {
    console.log("Sending payload to ZeptoMail API...");
    
    const response = await fetch("https://api.zeptomail.com/v1.1/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // Most ZeptoMail tokens require the "Zoho-enczapikey " prefix. 
        // If your token already includes it, this might fail, but usually, they give you the raw string.
        "Authorization": token.startsWith("Zoho-enczapikey") ? token : `Zoho-enczapikey ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
       const errorData = await response.text();
       console.error("❌ ZEPTOMAIL API REJECTED THE REQUEST:");
       console.error(`Status: ${response.status} ${response.statusText}`);
       console.error(`Error Details: ${errorData}`);
    } else {
       console.log(`✅ SUCCESS! Confirmation email delivered to ${toEmail}`);
    }
  } catch (error) {
    console.error("❌ ZEPTOMAIL FATAL FETCH ERROR:");
    console.error(error);
  }
}
