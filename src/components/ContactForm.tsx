"use client";

import { useState, type FormEvent } from "react";
import { submitForm } from "@/lib/forms";
import { siteConfig } from "@/data/site-config";

export default function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields: Record<string, string> = {
      Name: String(data.get("name") ?? ""),
      Email: String(data.get("email") ?? ""),
      Subject: String(data.get("subject") ?? ""),
      Message: String(data.get("message") ?? ""),
    };
    setBusy(true);
    const result = await submitForm("Contact message", fields);
    setBusy(false);
    if (result.ok) {
      form.reset();
      setStatus({
        ok: true,
        text:
          result.mode === "mailto"
            ? `Your email app should now open with the message ready to send to ${siteConfig.contact.email}.`
            : "Thank you! Your message has been sent. We will reply within one working day.",
      });
    } else {
      setStatus({ ok: false, text: "Sorry, something went wrong. Please try again or email us directly." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="label">
            Name
          </label>
          <input id="c-name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="c-email" className="label">
            Email
          </label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
      </div>
      <div>
        <label htmlFor="c-subject" className="label">
          Subject
        </label>
        <input id="c-subject" name="subject" required className="field" />
      </div>
      <div>
        <label htmlFor="c-message" className="label">
          Message
        </label>
        <textarea id="c-message" name="message" required rows={6} className="field resize-y" />
      </div>
      <button type="submit" disabled={busy} className="btn btn-primary">
        {busy ? "Sending…" : "Send message"}
      </button>
      {status ? (
        <p role="status" className={status.ok ? "text-sm text-ink" : "text-sm text-accent"}>
          {status.text}
        </p>
      ) : null}
    </form>
  );
}
