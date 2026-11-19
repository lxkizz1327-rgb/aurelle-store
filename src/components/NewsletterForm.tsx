"use client";

import { useState, type FormEvent } from "react";
import { submitForm } from "@/lib/forms";
import { useStore } from "@/context/StoreContext";

export default function NewsletterForm({ buttonLabel = "Subscribe", dark = false }: { buttonLabel?: string; dark?: boolean }) {
  const { notify } = useStore();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    const result = await submitForm("Newsletter signup", { email: email.trim() });
    setBusy(false);
    if (result.ok) {
      setEmail("");
      const text =
        result.mode === "mailto"
          ? "Your email app should open with a signup message ready to send."
          : "Thank you! You are subscribed.";
      setMessage(text);
      notify(text);
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate={false}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className={`field flex-1 ${dark ? "border-white bg-transparent text-white placeholder:text-white" : ""}`}
        />
        <button type="submit" disabled={busy} className={`btn ${dark ? "btn-light" : "btn-primary"}`}>
          {busy ? "Sending…" : buttonLabel}
        </button>
      </div>
      {message ? (
        <p className={`mt-3 text-sm ${dark ? "text-white" : "text-muted"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
