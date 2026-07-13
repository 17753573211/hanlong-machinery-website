"use client";

import type { FormEvent } from "react";

type Labels = {
  name: string; namePlaceholder: string; country: string; countryPlaceholder: string;
  model: string; select: string; requirements: string; messagePlaceholder: string; send: string;
};

export function WhatsAppInquiryForm({ labels, whatsappUrl }: { labels: Labels; whatsappUrl: string }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "HANLONG GROUP — Website Inquiry",
      "",
      `Name: ${data.get("name") || "-"}`,
      `Country / Region: ${data.get("country") || "-"}`,
      `Interested Model: ${data.get("model") || "-"}`,
      `Requirements: ${data.get("message") || "-"}`,
    ].join("\n");
    const target = `${whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(target, "_blank", "noopener,noreferrer");
  }

  return <form onSubmit={submit} className="whatsapp-inquiry-form">
    <div className="form-row">
      <label>{labels.name}<input name="name" required autoComplete="name" placeholder={labels.namePlaceholder}/></label>
      <label>{labels.country}<input name="country" required autoComplete="country-name" placeholder={labels.countryPlaceholder}/></label>
    </div>
    <label>{labels.model}<select name="model" required defaultValue=""><option value="" disabled>{labels.select}</option><option>HL-0.8</option><option>HL-1.5</option><option>HL-2</option><option>HL-2.6</option><option>HL-3.5</option><option>HL-4</option><option>HL-5</option></select></label>
    <label>{labels.requirements}<textarea name="message" required placeholder={labels.messagePlaceholder}/></label>
    <button className="button button-whatsapp" type="submit">{labels.send} ↗</button>
  </form>;
}
