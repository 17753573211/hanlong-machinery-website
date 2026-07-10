export type ProductSpec = { label: string; value: string; status?: "verified" | "review" };
export type Product = {
  slug: string; model: string; capacity: string; name: string; image: string;
  sourceFolder: string; summary: string; specs: ProductSpec[]; galleryCategory: string;
};

// Values marked "verified" were read from model-specific PDFs in /assets.
// "review" means the value must be checked against the final factory configuration sheet.
export const products: Product[] = [
  { slug:"hl-08", model:"HL-0.8", capacity:"0.8 m³", name:"0.8 m³ Self Loading Concrete Mixer", image:"/media/products/hl-08/hero.jpg", sourceFolder:"assets/瀚陇0.8方自上料搅拌车", galleryCategory:"HL-0.8", summary:"Compact self-loading mixer for narrow jobsites and small-volume concrete production.", specs:[
    {label:"Concrete output",value:"0.8 m³ / batch",status:"verified"},{label:"Engine",value:"Yunnei 490",status:"verified"},{label:"Rated power",value:"42 kW",status:"verified"},{label:"Top speed",value:"≤ 35 km/h",status:"verified"},{label:"Drive",value:"Full-time four-wheel drive",status:"verified"},{label:"Dimensions",value:"4576 × 2510 × 1880 mm",status:"verified"},{label:"Curb weight",value:"3100 kg",status:"verified"},{label:"Ground clearance",value:"250 mm",status:"verified"},{label:"Gradeability",value:"30°",status:"verified"},{label:"Water tank",value:"400 L",status:"verified"},{label:"Bucket capacity",value:"0.25 m³",status:"verified"}
  ]},
  { slug:"hl-15", model:"HL-1.5", capacity:"1.5 m³", name:"1.5 m³ Self Loading Concrete Mixer", image:"/media/products/hl-15/hero.jpg", sourceFolder:"assets/瀚陇1.5方自上料搅拌车", galleryCategory:"HL-1.5", summary:"Compact articulated mixer balancing maneuverability and daily output.", specs:[{label:"Concrete output",value:"1.5 m³ / batch",status:"review"}] },
  { slug:"hl-20", model:"HL-2", capacity:"2.0 m³", name:"2.0 m³ Self Loading Concrete Mixer", image:"/media/products/hl-20/hero.jpg", sourceFolder:"assets/瀚陇2方自上料搅拌车", galleryCategory:"HL-2", summary:"Front dual-wheel configuration for construction and infrastructure work.", specs:[{label:"Concrete output",value:"2.0 m³ / batch",status:"review"}] },
  { slug:"hl-26", model:"HL-2.6", capacity:"2.6 m³", name:"2.6 m³ Self Loading Concrete Mixer", image:"/media/products/hl-26/hero.jpg", sourceFolder:"assets/瀚陇2.6方双轮自上料搅拌车", galleryCategory:"HL-2.6", summary:"Mid-size dual-wheel mixer designed for flexible on-site concrete production.", specs:[{label:"Concrete output",value:"2.6 m³ / batch",status:"review"}] },
  { slug:"hl-35", model:"HL-3.5", capacity:"3.5 m³", name:"3.5 m³ Self Loading Concrete Mixer", image:"/media/products/hl-35/hero.png", sourceFolder:"assets/瀚陇3.5方自上料搅拌车", galleryCategory:"HL-3.5", summary:"High-utility model integrating loading, weighing, mixing, transport and discharge.", specs:[
    {label:"Concrete output",value:"3.5 m³ / batch",status:"verified"},{label:"Engine",value:"Yuchai 4105 turbocharged",status:"verified"},{label:"Rated power",value:"85 kW",status:"verified"},{label:"Water tank",value:"850 L",status:"verified"},{label:"Dimensions",value:"7600 × 2872 × 3474 mm",status:"verified"},{label:"Total weight",value:"8300 kg",status:"verified"}
  ]},
  { slug:"hl-40", model:"HL-4", capacity:"4.0 m³", name:"4.0 m³ Self Loading Concrete Mixer", image:"/media/products/hl-40/hero.jpg", sourceFolder:"assets/瀚陇4方自上料搅拌车", galleryCategory:"HL-4", summary:"High-output self-loading mixer for larger building and infrastructure jobsites.", specs:[{label:"Concrete output",value:"4.0 m³ / batch",status:"review"}] },
  { slug:"hl-50", model:"HL-5", capacity:"5.0 m³", name:"5.0 m³ Self Loading Concrete Mixer", image:"/media/products/hl-50/hero.png", sourceFolder:"assets/瀚陇5方自上料搅拌车", galleryCategory:"HL-5", summary:"Large-capacity mixer developed for intensive concrete production and heavy-duty work.", specs:[{label:"Concrete output",value:"5.0 m³ / batch",status:"review"}] },
];
