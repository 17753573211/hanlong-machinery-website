import { WHATSAPP_URL } from "@/lib/whatsapp";
export function WhatsAppButton({label,className="button whatsapp-button"}:{label:string;className?:string}){return <a className={className} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={label}><span className="whatsapp-dot">●</span>{label}<span aria-hidden="true">↗</span></a>}
