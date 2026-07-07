import { NextResponse } from 'next/server';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    // Portfolio demo endpoint.
    // In a real client project, this is where you would connect Mailchimp,
    // Resend, ConvertKit, Supabase, Firebase, Airtable, or a CRM.
    return NextResponse.json({
      ok: true,
      message: 'You are on the Xans drop list.',
      subscriber: {
        email,
        source: 'xans-premium-landing-page',
        subscribedAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
