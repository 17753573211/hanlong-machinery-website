import { WHATSAPP_URL } from "@/lib/whatsapp";

function WhatsAppIcon() {
  return <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a9.84 9.84 0 0 0-8.41 14.94L2.05 22l5.19-1.5A9.9 9.9 0 1 0 12 2Zm0 17.8a7.8 7.8 0 0 1-3.98-1.09l-.29-.17-3.08.89.91-3-.19-.3A7.8 7.8 0 1 1 12 19.8Zm4.28-5.85c-.23-.12-1.39-.69-1.61-.76-.21-.08-.37-.12-.53.12-.15.23-.6.76-.74.91-.13.16-.27.18-.5.06-.23-.12-.98-.36-1.87-1.15a7 7 0 0 1-1.29-1.6c-.13-.24-.01-.36.1-.48l.35-.41c.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.53-1.28-.72-1.75-.19-.46-.38-.39-.53-.4h-.45c-.16 0-.41.06-.63.29-.21.23-.82.8-.82 1.96s.84 2.28.96 2.44c.12.15 1.66 2.53 4.02 3.55.56.24 1 .39 1.34.5.56.18 1.08.15 1.48.09.45-.07 1.39-.57 1.59-1.12.19-.55.19-1.02.13-1.12-.05-.1-.21-.16-.45-.27Z"/></svg>;
}

export function WhatsAppButton({ label, className = "button whatsapp-button" }: { label: string; className?: string }) {
  return <a className={className} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <WhatsAppIcon/><span className="whatsapp-label">{label}</span><span className="whatsapp-arrow" aria-hidden="true">↗</span>
  </a>;
}
