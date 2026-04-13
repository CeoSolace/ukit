"use client";

import { useState } from 'react';

/**
 * Contact page with a simple form allowing readers to send messages to the
 * editorial team. Submissions are validated client‑side and sent to the
 * /api/contact endpoint. The page does not expose any secrets and does not
 * perform direct database writes from the client.
 */
export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<null | { type: 'success' | 'error'; message: string }>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    // basic client‑side validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', message: 'All fields are required.' });
      return;
    }
    // simple email pattern
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    if (message.length > 2000) {
      setStatus({ type: 'error', message: 'Message is too long.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ type: 'success', message: 'Thank you for your message! We will review it shortly.' });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again later.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Unable to submit. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">
        Have feedback, corrections or story ideas? Send us a message using
        the form below. We review submissions regularly. Please do not
        include sensitive personal information.
      </p>
      {status && (
        <div
          className={`mb-4 px-4 py-3 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900' : 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'}`}
        >
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-light"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-light"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-light"
            disabled={loading}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}