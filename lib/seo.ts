import type { Metadata } from "next";
import { locales, type Locale } from "@/locales/config";

export const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(/\/$/, "");
export const CORE_KEYWORDS = ["Self Loading Concrete Mixer","Self Loading Mixer Truck","Concrete Mixer Truck Manufacturer","China Self Loading Mixer Factory","Automatic Loading Concrete Mixer"];
const hrefLang: Record<Locale,string> = { en:"en", zh:"zh-CN", pt:"pt", es:"es", fr:"fr" };

export function buildMetadata(locale:Locale,path:string,title:string,description:string,extraKeywords:string[]=[]):Metadata {
  const route = path ? `/${locale}/${path}` : `/${locale}`;
  const languages = Object.fromEntries(locales.map(x=>[hrefLang[x],`${SITE_URL}/${x}${path?`/${path}`:""}`]));
  return { title, description, keywords:[...CORE_KEYWORDS,...extraKeywords], alternates:{canonical:`${SITE_URL}${route}`,languages:{...languages,"x-default":`${SITE_URL}/en${path?`/${path}`:""}`},}, openGraph:{type:"website",url:`${SITE_URL}${route}`,siteName:"HANLONG GROUP",locale:hrefLang[locale].replace("-","_"),alternateLocale:locales.filter(x=>x!==locale).map(x=>hrefLang[x].replace("-","_")),title,description,images:[{url:`${SITE_URL}/og.png`,width:1732,height:909,alt:"HANLONG GROUP Self Loading Concrete Mixer"}]}, twitter:{card:"summary_large_image",title,description,images:[`${SITE_URL}/og.png`]}, robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}} };
}

export function organizationSchema(){return {"@context":"https://schema.org","@type":"Organization","@id":`${SITE_URL}/#organization`,name:"HANLONG GROUP",alternateName:"瀚珑集团",url:SITE_URL,logo:`${SITE_URL}/favicon.svg`,description:"Self loading concrete mixer manufacturer in China for global construction projects."}}
export function websiteSchema(){return {"@context":"https://schema.org","@type":"WebSite","@id":`${SITE_URL}/#website`,url:SITE_URL,name:"HANLONG GROUP",publisher:{"@id":`${SITE_URL}/#organization`},inLanguage:["en","zh-CN","pt","es","fr"]}}
