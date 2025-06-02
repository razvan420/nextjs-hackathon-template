import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

interface FlagSubmissionData {
  name: string;
  flag1: string;
  flag2: string;
  flag3: string;
  flag4: string;
}

export async function POST(request: NextRequest) {
  let body: FlagSubmissionData = {
    name: '',
    flag1: '',
    flag2: '',
    flag3: '',
    flag4: ''
  };
  try {
    body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Check if SMTP credentials are provided
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.log("SMTP credentials not configured. Please check your .env.local file");
      console.log("Required variables: SMTP_HOST, SMTP_USER, SMTP_PASSWORD");
      console.log("Flag submission received:", body);
      
      return NextResponse.json(
        { error: "SMTP not configured. Check server logs." },
        { status: 500 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      // Additional options for better compatibility
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      throw new Error("SMTP connection failed");
    }

    // Format the email content
    const emailContent = `
CTF Flag Submission

Participant: ${body.name}
Submission Time: ${new Date().toLocaleString()}

=== SUBMITTED FLAGS ===

Flag 1 (Network/DNS): ${body.flag1 || 'Not submitted'}
Flag 2 (Crypto/XOR): ${body.flag2 || 'Not submitted'}  
Flag 3 (Web/Email): ${body.flag3 || 'Not submitted'}
Flag 4 (Steganography): ${body.flag4 || 'Not submitted'}

=== SUBMISSION DETAILS ===

IP Address: ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}
User Agent: ${request.headers.get('user-agent') || 'Unknown'}
Timestamp: ${new Date().toISOString()}

---
This submission was sent automatically from the Stefanini CTF platform.
    `;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>CTF Flag Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1B365D, #37c598); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">🏴 CTF Flag Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Stefanini Hacks - DEV Talks 2025</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1B365D; margin-top: 0;">Participant Information</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div style="background-color: #fff; border: 2px solid #37c598; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #37c598; margin-top: 0;">Submitted Flags</h2>
            
            <div style="margin: 15px 0;">
                <h3 style="color: #8142df; margin: 10px 0 5px 0; font-size: 16px;">🌐 Flag 1: Network/DNS</h3>
                <div style="background: ${body.flag1 ? '#d4edda' : '#f8d7da'}; padding: 10px; border-radius: 4px; font-family: monospace;">
                    ${body.flag1 || '<em>Not submitted</em>'}
                </div>
            </div>

            <div style="margin: 15px 0;">
                <h3 style="color: #8142df; margin: 10px 0 5px 0; font-size: 16px;">🔐 Flag 2: Crypto/XOR</h3>
                <div style="background: ${body.flag2 ? '#d4edda' : '#f8d7da'}; padding: 10px; border-radius: 4px; font-family: monospace;">
                    ${body.flag2 || '<em>Not submitted</em>'}
                </div>
            </div>

            <div style="margin: 15px 0;">
                <h3 style="color: #8142df; margin: 10px 0 5px 0; font-size: 16px;">🌍 Flag 3: Web/Email</h3>
                <div style="background: ${body.flag3 ? '#d4edda' : '#f8d7da'}; padding: 10px; border-radius: 4px; font-family: monospace;">
                    ${body.flag3 || '<em>Not submitted</em>'}
                </div>
            </div>

            <div style="margin: 15px 0;">
                <h3 style="color: #8142df; margin: 10px 0 5px 0; font-size: 16px;">🖼️ Flag 4: Steganography</h3>
                <div style="background: ${body.flag4 ? '#d4edda' : '#f8d7da'}; padding: 10px; border-radius: 4px; font-family: monospace;">
                    ${body.flag4 || '<em>Not submitted</em>'}
                </div>
            </div>
        </div>

        <div style="background-color: #f1f3f4; padding: 15px; border-radius: 8px; font-size: 12px; color: #666;">
            <h3 style="margin-top: 0; color: #333;">Submission Details</h3>
            <p><strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>User Agent:</strong> ${request.headers.get('user-agent') || 'Unknown'}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
            <p>This email was sent automatically from the Stefanini CTF platform.<br>
            © 2025 <a href="https://secforit.ro" style="color: #37c598;">SECFORIT</a> - All rights reserved.</p>
        </div>
    </body>
    </html>
    `;

    // Email options
    const mailOptions = {
      from: {
        name: 'Stefanini CTF Platform',
        address: process.env.SMTP_USER
      },
      to: process.env.SUBMISSION_EMAIL || 'contact@secforit.ro',
      subject: `🏴 CTF Flag Submission - ${body.name}`,
      text: emailContent,
      html: htmlContent,
      // Optional: Add headers for better deliverability
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log("Email sent successfully:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return NextResponse.json(
      { 
        message: "Flags submitted successfully",
        messageId: info.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error submitting flags:", error);
    
    // Log the submission details for manual processing
    console.log("=== FLAG SUBMISSION (EMAIL FAILED) ===");
    console.log(JSON.stringify(body, null, 2));
    console.log("=== END SUBMISSION ===");
    
    return NextResponse.json(
      { error: "Failed to send email. Submission logged to server." },
      { status: 500 }
    );
  }
}