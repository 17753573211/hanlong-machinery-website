import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/locales";
import { isLocale } from "@/locales/config";
import library from "@/src/data/asset-library.json";
import { getAssetLabels } from "@/src/data/asset-labels";
import { MobileVideo } from "@/components/MobileVideo";
import { getShippingVideoTitle } from "@/src/data/shipping-video-titles";

export default async function Videos({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const v = getDictionary(locale).videos, l = getAssetLabels(locale);
  let work = 0, shipping = 0;
  return <main><PageHero eyebrow={v.eyebrow} title={v.title} description={v.description}/><section className="section"><div className="container video-library">{library.videos.map(item => {
    const isShipping = item.category === "shipping", number = isShipping ? ++shipping : ++work;
    const title = isShipping ? (getShippingVideoTitle(item.id, locale) ?? `${l.shipping} ${String(number).padStart(2, "0")}`) : `${l.work} ${String(number).padStart(2, "0")}`;
    return <article key={item.id}><MobileVideo src={item.publicPath} poster={item.poster} label={title}/><span>{isShipping ? l.shipping : l.work}</span><h2>{title}</h2><p>{item.model?.toUpperCase() || "HANLONG GROUP"}</p></article>;
  })}</div></section></main>;
}
