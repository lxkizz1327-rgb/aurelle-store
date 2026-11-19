import { siteConfig } from "@/data/site-config";

export type FormResult = { ok: boolean; mode: "endpoint" | "mailto" };

/**
 * Sends a form.
 * - If an endpoint (e.g. Formspree) is set in site-config.ts, the form is posted there.
 * - Otherwise the visitor's email app opens with the message ready to send to your contact email.
 */
export async function submitForm(kind: string, fields: Record<string, string>): Promise<FormResult> {
  const endpoint = siteConfig.forms.endpoint;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ form: kind, ...fields }),
      });
      return { ok: res.ok, mode: "endpoint" };
    } catch {
      return { ok: false, mode: "endpoint" };
    }
  }
  const subject = encodeURIComponent(`[${siteConfig.name}] ${kind}`);
  const body = encodeURIComponent(
    Object.entries(fields)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n"),
  );
  window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  return { ok: true, mode: "mailto" };
}
