import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WhatsAppInquiryForm } from "@/components/WhatsAppInquiryForm";
import { getDictionary } from "@/locales";
import { isLocale } from "@/locales/config";
import { WHATSAPP_URL } from "@/lib/whatsapp";

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale), c = d.contact;
  return <main><PageHero eyebrow={c.eyebrow} title={c.title} description={c.description}/><section className="section contact-section"><div className="container contact-grid"><div>
    <p className="eyebrow dark"><span/> {c.direct}</p><h2>{c.team}</h2>
    <div className="contact-details"><div><small>{c.whatsapp}</small><WhatsAppButton label={d.common.whatsapp} className="button button-whatsapp contact-whatsapp"/></div><div><small>{c.location}</small><p>Shandong, China</p></div></div>
  </div><WhatsAppInquiryForm labels={c} whatsappUrl={WHATSAPP_URL}/></div></section></main>;
}
