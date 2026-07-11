import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, FactoryIcon, GaugeIcon, GlobeIcon, ShieldIcon } from "@/components/Icons";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDictionary } from "@/locales";
import { isLocale } from "@/locales/config";
import { products } from "@/src/data/products";
import assetLibrary from "@/src/data/asset-library.json";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale), h = d.home;
  const icons = [<GaugeIcon key="1"/>, <FactoryIcon key="2"/>, <ShieldIcon key="3"/>, <GlobeIcon key="4"/>];
  const homeVideo = assetLibrary.videos.find((item) => item.usedOn.includes("home")) ?? assetLibrary.videos[0];
  return <main>
    <section className="hero"><div className="hero-shade"/><div className="container hero-content">
      <p className="eyebrow"><span/> {h.eyebrow}</p><h1>{h.title1}<br/><em>{h.title2}</em></h1><p className="hero-copy">{h.intro}</p>
      <div className="button-row"><Link className="button button-light" href={`/${locale}/products`}>{h.explore}<ArrowIcon/></Link><WhatsAppButton label={d.common.whatsapp} className="button button-whatsapp"/><Link className="button button-ghost" href={`/${locale}/contact`}>{d.common.requestQuote}</Link></div>
    </div><div className="hero-specs"><div><small>{h.range}</small><strong>0.8—5.0 m³</strong></div><div><small>{h.drive}</small><strong>{h.driveValue}</strong></div><div><small>{h.manufacturing}</small><strong>{h.manufacturingValue}</strong></div></div></section>
    <section className="section"><div className="container split-heading"><div><p className="eyebrow dark"><span/> {h.why}</p><h2>{h.processTitle}</h2></div><p className="lead">{h.processText}</p></div><div className="container feature-grid">{h.features.map((x,i)=><article key={x.title}><span>0{i+1}</span>{icons[i]}<h3>{x.title}</h3><p>{x.text}</p></article>)}</div></section>
    <section className="section machines-section"><div className="container section-top"><div><p className="eyebrow"><span/> {h.productRange}</p><h2>{h.machinesTitle}</h2></div><Link href={`/${locale}/products`} className="text-link">{d.common.viewAll}<ArrowIcon/></Link></div><div className="container product-grid">{products.slice(2,5).map((p,i)=><article className="product-card" key={p.model}><div className="card-top"><span>{p.capacity}</span><small>0{i+1}</small></div><div className="machine-silhouette"><span className="drum"/><span className="cab"/><span className="bucket"/><span className="wheel w1"/><span className="wheel w2"/></div><div className="product-meta"><div><p>{p.capacity}</p><h3>{p.model}</h3></div><Link href={`/${locale}/products/${p.slug}`}><ArrowIcon/></Link></div></article>)}</div></section>
    <section className="factory-band"><div className="container factory-content"><div><p className="eyebrow"><span/> {h.manufacturing}</p><h2>{h.factoryTitle}</h2></div><div className="factory-copy"><p>{h.factoryText}</p><Link className="button button-light" href={`/${locale}/factory`}>{h.insideFactory}<ArrowIcon/></Link></div></div></section>
    <section className="section home-video"><div className="container"><div className="section-top"><div><p className="eyebrow dark"><span/> {h.videoLabel}</p><h2>{h.videoTitle}</h2></div><Link href={`/${locale}/videos`} className="text-link">{d.common.viewAll}<ArrowIcon/></Link></div><video controls preload="none" poster={homeVideo.poster} playsInline data-loading="lazy"><source src={homeVideo.publicPath} type="video/mp4"/></video></div></section>
    <section className="quote-band"><div className="container"><div><small>{h.start}</small><h2>{h.cta}</h2></div><Link className="button button-dark" href={`/${locale}/contact`}>{d.common.contactExpert}<ArrowIcon/></Link></div></section>
  </main>;
}
