import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    // Cleaned sanitized payload
    const sanitized = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 150),
      message: message.trim().slice(0, 2000),
      timestamp: new Date().toISOString(),
      recipient: "Aryanjyadav@gmail.com",
    };

    console.log("[INCOMING CONTACT INQUIRY]:", sanitized);

    return NextResponse.json({
      success: true,
      message: "Message received successfully. Aryan will review your transmission promptly.",
      data: {
        timestamp: sanitized.timestamp,
        name: sanitized.name,
      },
    });
  } catch (error) {
    console.error("[CONTACT API ERROR]:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
