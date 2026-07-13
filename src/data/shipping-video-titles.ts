import type { Locale } from "@/locales/config";

const titles: Record<string, Record<Locale, string>> = {
  "video-01": { zh:"1.5立方米搅拌车发往乌兹别克斯坦", en:"1.5 m³ Mixer Shipped to Uzbekistan", pt:"Betoneira de 1,5 m³ enviada ao Uzbequistão", es:"Hormigonera de 1,5 m³ enviada a Uzbekistán", fr:"Bétonnière de 1,5 m³ expédiée en Ouzbékistan" },
  "video-02": { zh:"3.5方搅拌车装柜发货", en:"3.5 m³ Mixer Container Loading", pt:"Carregamento em contêiner da betoneira de 3,5 m³", es:"Carga en contenedor de hormigonera de 3,5 m³", fr:"Chargement en conteneur d’une bétonnière de 3,5 m³" },
  "video-03": { zh:"八柜齐发，品质与效率并行", en:"Eight Containers Dispatched Together", pt:"Oito contêineres despachados juntos", es:"Ocho contenedores enviados juntos", fr:"Huit conteneurs expédiés ensemble" },
  "video-04": { zh:"三台3.5方搅拌车发往乌兹别克斯坦", en:"Three 3.5 m³ Mixers Shipped to Uzbekistan", pt:"Três betoneiras de 3,5 m³ enviadas ao Uzbequistão", es:"Tres hormigoneras de 3,5 m³ enviadas a Uzbekistán", fr:"Trois bétonnières de 3,5 m³ expédiées en Ouzbékistan" },
  "video-05": { zh:"两台3.5方自上料搅拌车发货", en:"Two 3.5 m³ Self-Loading Mixers Dispatched", pt:"Duas betoneiras autocarregáveis de 3,5 m³ despachadas", es:"Dos hormigoneras autocargables de 3,5 m³ despachadas", fr:"Deux bétonnières autochargeuses de 3,5 m³ expédiées" },
  "video-06": { zh:"两台3.5方搅拌车再次发往霍尔果斯口岸", en:"Two 3.5 m³ Mixers Bound for Khorgos Port", pt:"Duas betoneiras de 3,5 m³ a caminho do porto de Khorgos", es:"Dos hormigoneras de 3,5 m³ rumbo al puerto de Khorgos", fr:"Deux bétonnières de 3,5 m³ à destination du port de Khorgos" },
  "video-07": { zh:"保质保量，准时发货", en:"Quality Assured, Delivered on Schedule", pt:"Qualidade garantida e entrega pontual", es:"Calidad garantizada y entrega puntual", fr:"Qualité garantie et expédition ponctuelle" },
  "video-08": { zh:"以品质交付建立长期合作", en:"Building Partnerships Through Quality Delivery", pt:"Construindo parcerias com entregas de qualidade", es:"Creando alianzas mediante entregas de calidad", fr:"Construire des partenariats grâce à des livraisons de qualité" },
};

export function getShippingVideoTitle(id: string, locale: Locale) {
  return titles[id]?.[locale];
}
