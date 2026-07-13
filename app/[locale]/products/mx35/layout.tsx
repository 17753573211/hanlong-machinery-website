import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/locales";
import { isLocale } from "@/locales/config";
import { SITE_URL } from "@/lib/seo";
import { products } from "@/src/data/products";

export default async function ProductLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;
  if(!isLocale(locale)) return children;
  const d=getDictionary(locale),p=products.find(x=>x.model==="HL-3.5")!,url=`${SITE_URL}/${locale}/products/mx35`;
  const product={"@context":"https://schema.org","@type":"Product","@id":`${url}#product`,name:`HL-3.5 ${d.detail.eyebrow}`,sku:"HL-3.5",category:"Self Loading Concrete Mixer",description:d.detail.description,url,image:[`${SITE_URL}${p.image}`],brand:{"@type":"Brand",name:"HANLONG GROUP"},manufacturer:{"@id":`${SITE_URL}/#organization`},additionalProperty:p.specs.map(s=>({"@type":"PropertyValue",name:s.label,value:s.value}))};
  const breadcrumbs={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:d.nav.home,item:`${SITE_URL}/${locale}`},{"@type":"ListItem",position:2,name:d.nav.products,item:`${SITE_URL}/${locale}/products`},{"@type":"ListItem",position:3,name:"HL-3.5",item:url}]};
  return <><JsonLd data={[product,breadcrumbs]}/>{children}</>;
}
