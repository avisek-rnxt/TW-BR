"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function requestUpdate(userName: string, userEmail: string) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })

  try {
    const { error } = await resend.emails.send({
      from: "Bamboo Reports <updates@updates.bambooreports.io>",
      to: (process.env.RESEND_UPDATE_RECIPIENTS || "").split(",").map((e) => e.trim()).filter(Boolean),
      subject: "Update Requested",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px;">
                Data Refresh Requested
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
                A user has requested a data refresh and updates to their instance.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
                    <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Requested By</span>
                    <p style="margin:4px 0 0;color:#1e293b;font-size:15px;font-weight:600;">${userName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
                    <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Email</span>
                    <p style="margin:4px 0 0;">
                      <a href="mailto:${userEmail}" style="color:#2563eb;font-size:15px;text-decoration:none;font-weight:500;">${userEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Requested At</span>
                    <p style="margin:4px 0 0;color:#1e293b;font-size:15px;">${now} IST</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:0 32px 24px;">
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 16px;" />
              <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">
                Sent from Bamboo Reports
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    })

    if (error) {
      console.error("Failed to send update request email:", error)
      return { success: false, error: "Failed to send request" }
    }

    return { success: true }
  } catch (err) {
    console.error("Error sending update request email:", err)
    return { success: false, error: "Failed to send request" }
  }
}
