// app/api/csrf-token/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    // Generate a random CSRF token
    const token = crypto.randomBytes(32).toString('hex');
    
    // In a production app, you'd store this token in a session or database
    // For this CTF, we'll use a simple approach
    
    return NextResponse.json({ 
      token,
      expires: Date.now() + (60 * 60 * 1000) // 1 hour
    });
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}