import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, country } = body;

    if (!email || !country) {
      return NextResponse.json(
        { error: "Email and country are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // TODO: Persist to database (e.g., Supabase, Prisma, etc.)
    console.log("Waitlist signup:", { email, country });

    return NextResponse.json(
      { message: "Successfully joined the waitlist." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
