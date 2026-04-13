import { NextRequest, NextResponse } from 'next/server';
import { insertContactMessage } from '@/lib/db';

// Simple in‑memory rate limiting store. Keys are IP addresses and values
// contain a timestamp of the last reset and a count of submissions. This
// resets automatically after an hour. In a real deployment, a shared
// datastore would be used instead.
const rateLimit: Map<string, { timestamp: number; count: number }> = new Map();

/**
 * Handle POST requests to submit contact messages. Validates input,
 * sanitises strings, applies rudimentary rate limiting and stores the
 * message in MongoDB if available. Returns a safe JSON response.
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP. For privacy, use forwarded header if available.
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown';
    const now = Date.now();
    const record = rateLimit.get(ip);
    if (record) {
      // Reset count if more than one hour has passed
      if (now - record.timestamp > 60 * 60 * 1000) {
        rateLimit.set(ip, { timestamp: now, count: 1 });
      } else if (record.count >= 5) {
        return NextResponse.json(
          { success: false, error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      } else {
        record.count += 1;
        rateLimit.set(ip, record);
      }
    } else {
      rateLimit.set(ip, { timestamp: now, count: 1 });
    }

    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ success: false, error: 'Message is too long.' }, { status: 400 });
    }
    // Basic sanitisation: remove angle brackets to mitigate simple XSS vectors.
    const sanitize = (str: string) => str.replace(/[<>]/g, '');
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    // Store in database if configured. Failing silently on error.
    await insertContactMessage(safeName, safeEmail, safeMessage);
    return NextResponse.json({ success: true });
  } catch (err) {
    // Do not expose stack traces or internal errors
    return NextResponse.json({ success: false, error: 'Failed to submit message.' }, { status: 500 });
  }
}