import { EXTRA_PRODUCTS } from "@/lib/catalog-extra";

export type CategorySlug =
  | "innovation"
  | "contemporary"
  | "accessories"
  | "collaborations"
  | "personal-care";

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  blurb: string;
}[] = [
  { slug: "innovation", name: "alps innovation", blurb: "where fashion meets technology" },
  { slug: "contemporary", name: "alps contemporary", blurb: "timeless with a twist" },
  { slug: "accessories", name: "alps accessories", blurb: "the finishing detail" },
  { slug: "collaborations", name: "alps collaborations", blurb: "designers in dialogue" },
  { slug: "personal-care", name: "alps vegan skin & personal care", blurb: "made to make a difference" },
];

export const PRODUCT_COLORS: Record<string, string> = {
  almond: "#d2c6b6",
  navy: "#112d46",
  titanium: "#a09d9f",
  fuchsia: "#be3366",
  white: "#fefefe",
  ivory: "#fdf3f3",
  red: "#a11929",
  wine: "#5e2934",
  brown: "#825d2b",
  pink: "#e8bfbf",
  lime: "#c0d999",
  khaki: "#3c6029",
  black: "#303030",
  yellow: "#ffd600",
};

export const FEATURES: { key: string; name: string; desc: string }[] = [
  { key: "multi-style", name: "multi style", desc: "engineered to be worn multiple ways — one garment, many silhouettes." },
  { key: "instant-heat", name: "instant heat", desc: "thermo-active fibres warm on contact with the body." },
  { key: "far-infrared", name: "far infrared light", desc: "far-infrared emitting yarns improve micro-circulation." },
  { key: "coolmax", name: "coolmax freshFX", desc: "moisture-wicking fibres keep the body cool and dry." },
  { key: "silver-ion", name: "silver ion", desc: "silver-ion infused fabric inhibits bacterial growth." },
  { key: "anti-virus", name: "anti-virus", desc: "treated surface neutralises common viral particles." },
  { key: "anti-odor", name: "anti-odor", desc: "anti-microbial finish prevents odour build-up." },
  { key: "anti-static", name: "anti-static", desc: "conductive fibres dissipate static charge." },
  { key: "quick-dry", name: "quick-dry", desc: "engineered for rapid moisture release." },
  { key: "breathable", name: "breathable", desc: "high-permeability weave for active comfort." },
  { key: "adhesive", name: "adhesive", desc: "seamless bonded construction without stitching." },
  { key: "self-cleaning", name: "self cleaning light FRESH", desc: "photocatalytic finish breaks down stains under daylight." },
  { key: "silvalight", name: "silvaLIGHT", desc: "proprietary lightweight silver-treated knit." },
  { key: "water-repellent", name: "water repellent", desc: "DWR finish sheds water without coating." },
  { key: "uv-resistant", name: "UV resistant", desc: "UPF50+ protection from solar radiation." },
  { key: "recycle", name: "recycle", desc: "made from post-consumer recycled fibres." },
  { key: "bluesign", name: "bluesign approved", desc: "bluesign® certified responsible production." },
  { key: "oeko-tex", name: "OEKO-TEX standard 100", desc: "tested free from harmful substances." },
  { key: "super-soft", name: "super soft", desc: "brushed micro-fibre hand-feel." },
  { key: "stretch", name: "stretch", desc: "4-way stretch construction for unrestricted movement." },
  { key: "natural", name: "natural", desc: "natural-origin fibres, ethically sourced." },
  { key: "vegan", name: "vegan", desc: "100% animal-free materials and processes." },
];

export type AccessoryTag =
  | "all-season"
  | "fall-winter"
  | "women"
  | "unisex"
  | "kids"
  | "handbag"
  | "home"
  | "travel"
  | "wearable";

export type Product = {
  id: string;
  name: string;
  category: CategorySlug;
  priceCAD: number;
  priceHKD: number;
  colors: string[];
  sizes: string[];
  features: string[];
  tags?: AccessoryTag[];
};

export const ACCESSORY_TAGS: { key: "all" | AccessoryTag; label: string }[] = [
  { key: "all", label: "all" },
  { key: "all-season", label: "all season" },
  { key: "fall-winter", label: "fall/ winter" },
  { key: "women", label: "women" },
  { key: "unisex", label: "unisex" },
  { key: "kids", label: "kids" },
  { key: "handbag", label: "handbag" },
  { key: "home", label: "home" },
  { key: "travel", label: "travel" },
  { key: "wearable", label: "wearable" },
];



export const PRODUCTS: Product[] = [
  ...EXTRA_PRODUCTS,


  // accessories — wearable / women / unisex
  { id: "little-prince-bucket-ivory", name: "the little prince® anti-bacterial silver ion COOLMAX® reversible bucket hat", category: "accessories", priceCAD: 150, priceHKD: 880, colors: ["ivory","navy"], sizes: ["one size"], features: ["silver-ion","anti-virus","uv-resistant"], tags: ["all-season","women","unisex","wearable"] },
  { id: "little-prince-bucket-navy", name: "the little prince® anti-bacterial reversible bucket hat", category: "accessories", priceCAD: 150, priceHKD: 880, colors: ["navy"], sizes: ["one size"], features: ["silver-ion","uv-resistant"], tags: ["all-season","women","unisex","wearable"] },
  { id: "little-prince-mask-adult", name: "the little prince® silver ion anti-bacterial COOLMAX® 3D adult fabric face mask", category: "accessories", priceCAD: 62, priceHKD: 360, colors: ["red","navy"], sizes: ["adult"], features: ["silver-ion","anti-virus","breathable"], tags: ["all-season","women","unisex","wearable"] },
  { id: "little-prince-mask-kids", name: "the little prince® silver ion anti-bacterial COOLMAX® 3D kids fabric face mask", category: "accessories", priceCAD: 48, priceHKD: 280, colors: ["navy","red"], sizes: ["kids"], features: ["silver-ion","anti-virus","breathable"], tags: ["all-season","kids","wearable"] },
  { id: "vegan-fur-neck-magnet", name: "vegan fur neck cover with magnet closure", category: "accessories", priceCAD: 55, priceHKD: 320, colors: ["black","brown"], sizes: ["one size"], features: ["super-soft","vegan"], tags: ["fall-winter","women","wearable"] },
  { id: "vegan-fur-neck-toggle", name: "vegan fur neck cover with back metal toggle", category: "accessories", priceCAD: 55, priceHKD: 320, colors: ["brown","black"], sizes: ["one size"], features: ["super-soft","vegan"], tags: ["fall-winter","women","wearable"] },
  { id: "light-fresh-bucket-blue", name: "anti-bacterial light fresh® reversible bucket hat", category: "accessories", priceCAD: 116, priceHKD: 680, colors: ["navy","black"], sizes: ["one size"], features: ["self-cleaning","silver-ion"], tags: ["all-season","women","unisex","wearable"] },
  { id: "light-fresh-bucket-navy", name: "anti-bacterial light fresh® reversible bucket hat", category: "accessories", priceCAD: 116, priceHKD: 680, colors: ["navy"], sizes: ["one size"], features: ["self-cleaning"], tags: ["all-season","women","unisex","wearable"] },
  { id: "checker-socks", name: "black and white checker pattern comfort crew socks", category: "accessories", priceCAD: 18, priceHKD: 98, colors: ["black","white"], sizes: ["S","M","L"], features: ["anti-odor","stretch"], tags: ["all-season","women","unisex","wearable"] },
  { id: "handkerchief", name: "silver ion anti-bacterial COOLMAX® quick dry button long handkerchief", category: "accessories", priceCAD: 14, priceHKD: 70, colors: ["black"], sizes: ["one size"], features: ["silver-ion","quick-dry"], tags: ["all-season","unisex","wearable"] },
  { id: "visor", name: "silver ion anti-bacterial COOLMAX® quick dry visor", category: "accessories", priceCAD: 48, priceHKD: 280, colors: ["black"], sizes: ["one size"], features: ["silver-ion","uv-resistant","quick-dry"], tags: ["all-season","unisex","wearable"] },
  { id: "mask-adult-3d", name: "silver ion anti-bacterial COOLMAX® 3D adult fabric face mask", category: "accessories", priceCAD: 52, priceHKD: 300, colors: ["navy","black"], sizes: ["adult"], features: ["silver-ion","anti-virus","breathable"], tags: ["all-season","women","unisex","wearable"] },
  { id: "eye-mask", name: "silver ion anti-bacterial COOLMAX® eye mask", category: "accessories", priceCAD: 30, priceHKD: 180, colors: ["navy"], sizes: ["one size"], features: ["silver-ion","super-soft"], tags: ["all-season","travel","unisex","wearable"] },
  { id: "travel-mask-adult", name: "silver ion anti-bacterial COOLMAX® quick dry laser cut travel lite adult face mask", category: "accessories", priceCAD: 42, priceHKD: 250, colors: ["black"], sizes: ["adult"], features: ["silver-ion","quick-dry","anti-virus"], tags: ["all-season","travel","unisex","wearable"] },
  { id: "travel-mask-kids", name: "silver ion anti-bacterial COOLMAX® quick dry laser cut travel lite kids face mask", category: "accessories", priceCAD: 38, priceHKD: 220, colors: ["navy","fuchsia"], sizes: ["kids"], features: ["silver-ion","quick-dry"], tags: ["all-season","travel","kids","wearable"] },
  { id: "protect-mask-adult", name: "silver ion anti-bacterial COOLMAX® quick dry protection adult fabric face mask", category: "accessories", priceCAD: 48, priceHKD: 280, colors: ["navy"], sizes: ["adult"], features: ["silver-ion","anti-virus"], tags: ["all-season","unisex","wearable"] },

  // accessories — handbag
  { id: "petit-pouch-red", name: "the little prince® silver ion anti-bacterial COOLMAX® petit pouch", category: "accessories", priceCAD: 16, priceHKD: 95, colors: ["red"], sizes: ["one size"], features: ["silver-ion"], tags: ["all-season","handbag","women"] },
  { id: "petit-pouch-print", name: "silver ion anti-bacterial COOLMAX® petit pouch", category: "accessories", priceCAD: 14, priceHKD: 80, colors: ["red","white"], sizes: ["one size"], features: ["silver-ion"], tags: ["all-season","handbag","women","unisex"] },
  { id: "vegan-fur-pouch", name: "vegan fur pouch", category: "accessories", priceCAD: 28, priceHKD: 160, colors: ["black"], sizes: ["one size"], features: ["vegan","super-soft"], tags: ["fall-winter","handbag","women"] },
  { id: "backpack-light-fresh-ivory", name: "anti-bacterial light fresh® back pack sac à dos", category: "accessories", priceCAD: 286, priceHKD: 1680, colors: ["ivory"], sizes: ["one size"], features: ["self-cleaning"], tags: ["all-season","handbag","women","unisex"] },
  { id: "backpack-silver-red", name: "anti-bacterial silver ion COOLMAX® light fresh® back pack sac à dos", category: "accessories", priceCAD: 286, priceHKD: 1680, colors: ["red"], sizes: ["one size"], features: ["silver-ion","self-cleaning"], tags: ["all-season","handbag","women","unisex"] },
  { id: "boulette-sac-ivory", name: "anti-bacterial light fresh® drawstring boulette SAC", category: "accessories", priceCAD: 286, priceHKD: 1680, colors: ["ivory"], sizes: ["one size"], features: ["self-cleaning"], tags: ["all-season","handbag","women"] },
  { id: "boulette-sac-checker", name: "anti-bacterial silver ion COOLMAX® light fresh® drawstring boulette SAC", category: "accessories", priceCAD: 286, priceHKD: 1680, colors: ["black","white"], sizes: ["one size"], features: ["silver-ion","self-cleaning"], tags: ["all-season","handbag","women"] },
  { id: "enorme-silver-checker", name: "ènorme drawstring anti-bacterial silver ion COOLMAX® shoulder bag", category: "accessories", priceCAD: 286, priceHKD: 1680, colors: ["red","white"], sizes: ["one size"], features: ["silver-ion"], tags: ["all-season","handbag","women"] },
  { id: "enorme-light-navy", name: "ènorme drawstring anti-bacterial light fresh® shoulder bag", category: "accessories", priceCAD: 286, priceHKD: 1680, colors: ["navy"], sizes: ["one size"], features: ["self-cleaning"], tags: ["all-season","handbag","women"] },
  { id: "enorme-silver-light", name: "ènorme drawstring anti-bacterial silver ion COOLMAX® light fresh® shoulder bag", category: "accessories", priceCAD: 286, priceHKD: 1680, colors: ["red","white"], sizes: ["one size"], features: ["silver-ion","self-cleaning"], tags: ["all-season","handbag","women"] },
  { id: "cabas-mini-light", name: "CABAS mini anti-bacterial light fresh® shoulder bag", category: "accessories", priceCAD: 252, priceHKD: 1480, colors: ["navy"], sizes: ["mini"], features: ["self-cleaning"], tags: ["all-season","handbag","women"] },
  { id: "cabas-mini-silver", name: "CABAS mini anti-bacterial silver ion COOLMAX® light fresh® shoulder bag", category: "accessories", priceCAD: 252, priceHKD: 1480, colors: ["navy","white"], sizes: ["mini"], features: ["silver-ion","self-cleaning"], tags: ["all-season","handbag","women"] },
  { id: "bouffie-bag", name: "bouffie bag anti-bacterial silver ion COOLMAX® shoulder bag", category: "accessories", priceCAD: 235, priceHKD: 1380, colors: ["black"], sizes: ["one size"], features: ["silver-ion","super-soft"], tags: ["all-season","handbag","women"] },
  { id: "cravate-bag", name: "silver ion anti-bacterial COOLMAX® quick dry water proof cravate bag", category: "accessories", priceCAD: 44, priceHKD: 260, colors: ["white","navy"], sizes: ["one size"], features: ["silver-ion","water-repellent"], tags: ["all-season","handbag","unisex"] },
  { id: "reves-tote", name: "silver ion anti-bacterial COOLMAX® quick dry rêves tote bag", category: "accessories", priceCAD: 55, priceHKD: 320, colors: ["navy"], sizes: ["one size"], features: ["silver-ion","quick-dry"], tags: ["all-season","handbag","women","unisex"] },
  { id: "cabas-220", name: "CABAS 220 anti-bacterial light fresh® shoulder bag", category: "accessories", priceCAD: 302, priceHKD: 1780, colors: ["ivory","navy","black"], sizes: ["one size"], features: ["self-cleaning","water-repellent"], tags: ["all-season","handbag","women"] },
  { id: "cabas-220-silver", name: "CABAS 220 anti-bacterial silver ion COOLMAX® light fresh® shoulder bag", category: "accessories", priceCAD: 302, priceHKD: 1780, colors: ["navy"], sizes: ["one size"], features: ["silver-ion","self-cleaning"], tags: ["all-season","handbag","women"] },
  { id: "duffle-bag", name: "silver ion anti-bacterial COOLMAX® quick dry foldable travel / gym duffle bag", category: "accessories", priceCAD: 167, priceHKD: 980, colors: ["navy"], sizes: ["one size"], features: ["silver-ion","quick-dry"], tags: ["all-season","handbag","travel","unisex"] },
  { id: "tote-bag", name: "silver ion anti-bacterial COOLMAX® quick dry tote bag", category: "accessories", priceCAD: 55, priceHKD: 320, colors: ["navy"], sizes: ["one size"], features: ["silver-ion","quick-dry"], tags: ["all-season","handbag","unisex"] },

  // accessories — travel
  { id: "pocket-square", name: "silver ion anti-bacterial COOLMAX® quick dry pocket square", category: "accessories", priceCAD: 9, priceHKD: 55, colors: ["fuchsia","navy","almond"], sizes: ["one size"], features: ["silver-ion","quick-dry"], tags: ["all-season","travel","unisex"] },
  { id: "placemat", name: "silver ion anti-bacterial COOLMAX® quick dry water proof placemat", category: "accessories", priceCAD: 55, priceHKD: 320, colors: ["navy"], sizes: ["one size"], features: ["silver-ion","water-repellent"], tags: ["all-season","travel","home"] },
  { id: "toiletry-bag", name: "silver ion anti-bacterial COOLMAX® quick dry foldable travel toiletry bag", category: "accessories", priceCAD: 74, priceHKD: 430, colors: ["navy"], sizes: ["one size"], features: ["silver-ion","quick-dry"], tags: ["all-season","travel","unisex"] },
  { id: "packing-cube-sm", name: "silver ion anti-bacterial COOLMAX® quick dry foldable small packing cube", category: "accessories", priceCAD: 44, priceHKD: 260, colors: ["navy"], sizes: ["S"], features: ["silver-ion","quick-dry"], tags: ["all-season","travel","unisex"] },
  { id: "packing-cube-lg", name: "silver ion anti-bacterial COOLMAX® quick dry foldable large packing cube", category: "accessories", priceCAD: 55, priceHKD: 320, colors: ["navy"], sizes: ["L"], features: ["silver-ion","quick-dry"], tags: ["all-season","travel","unisex"] },
  { id: "sleepbag", name: "silver ion anti-bacterial COOLMAX® quick dry sleepbag", category: "accessories", priceCAD: 167, priceHKD: 980, colors: ["navy"], sizes: ["one size"], features: ["silver-ion","quick-dry"], tags: ["all-season","travel","unisex"] },
  { id: "naturfan-spray", name: "naturfan insect repellent spray", category: "accessories", priceCAD: 14, priceHKD: 80, colors: ["white"], sizes: ["100ml"], features: ["natural","vegan"], tags: ["all-season","travel"] },
  { id: "silvalight-spray", name: "silvaLIGHT covid-virus elimination spray", category: "accessories", priceCAD: 30, priceHKD: 180, colors: ["white"], sizes: ["100ml"], features: ["silvalight","anti-virus"], tags: ["all-season","travel"] },

  // accessories — home
  { id: "bedsheet-single", name: "anti-bacterial silver ion COOLMAX® single size fitted bedsheet", category: "accessories", priceCAD: 102, priceHKD: 599, colors: ["navy"], sizes: ["single"], features: ["silver-ion","super-soft"], tags: ["all-season","home"] },
  { id: "blanket-single", name: "anti-bacterial silver ion COOLMAX® single size blanket", category: "accessories", priceCAD: 119, priceHKD: 699, colors: ["navy"], sizes: ["single"], features: ["silver-ion","super-soft"], tags: ["all-season","home"] },
  { id: "bedsheet-queen", name: "anti-bacterial silver ion COOLMAX® queen size fitted bedsheet", category: "accessories", priceCAD: 136, priceHKD: 799, colors: ["navy"], sizes: ["queen"], features: ["silver-ion","super-soft"], tags: ["all-season","home"] },
  { id: "blanket-queen", name: "anti-bacterial silver ion COOLMAX® queen size blanket", category: "accessories", priceCAD: 153, priceHKD: 899, colors: ["navy"], sizes: ["queen"], features: ["silver-ion","super-soft"], tags: ["all-season","home"] },
  { id: "pillow-2", name: "anti-bacterial silver ion COOLMAX® pillow case x 2", category: "accessories", priceCAD: 39, priceHKD: 229, colors: ["navy"], sizes: ["pair"], features: ["silver-ion"], tags: ["all-season","home"] },
  { id: "pillow-1", name: "anti-bacterial silver ion COOLMAX® pillow case x 1", category: "accessories", priceCAD: 22, priceHKD: 129, colors: ["navy"], sizes: ["one"], features: ["silver-ion"], tags: ["all-season","home"] },
  { id: "bedsheet-double", name: "anti-bacterial silver ion COOLMAX® double size fitted bedsheet", category: "accessories", priceCAD: 119, priceHKD: 699, colors: ["navy"], sizes: ["double"], features: ["silver-ion"], tags: ["all-season","home"] },
  { id: "blanket-double", name: "anti-bacterial silver ion COOLMAX® small double size blanket", category: "accessories", priceCAD: 136, priceHKD: 799, colors: ["navy"], sizes: ["double"], features: ["silver-ion"], tags: ["all-season","home"] },

];

export const SOCIALS = {
  website: "https://www.annieling.com",
  instagram: "https://www.instagram.com/alpsannieling/",
  instagram2: "https://www.instagram.com/alps.annieling/",
  instagram3: "https://www.instagram.com/alpsbyannieling/",
  facebook: "https://www.facebook.com/alps.annieling/",
  facebookPersonal: "https://www.facebook.com/annieling.alps",
  x: "https://x.com/annie_ling_",
  threads: "https://www.threads.com/@alpsannieling",
  youtube: "https://www.youtube.com/channel/UCQkObngC_R1tDpdfV5Ebcmg",
  asiaMiles:
    "https://lifestyle.asiamiles.com/en/HK/p/IFC_0152_60001/ac0015-light-fresh-technology-cabas-220-shoulder-bag",
  skincareInstagram: "https://www.instagram.com/riman.yvr/",
  skincareInstagramBilingual: "https://www.instagram.com/annieling.riman/",
  skincareFacebook: "https://www.facebook.com/profile.php?id=61580586214011",
  dipAlumni:
    "https://www.hkdesignincubation.org/?route=incubation_inner&category=11&company=2",
  fipAlumni: "https://hkfip.org/en/brand/alps-annie-ling/",
  email: "cs@ALPSannieling.com",
};

export const TAGLINES = [
  "timeless with a twist",
  "made to make a difference",
  "when fashion meets innovation",
  "everyday designs that endure",
  "new age accessories for the organised mind and body",
];

export const BRAND_HASHTAGS = [
  "#ALPScollection",
  "#simplicitywithdetails",
  "#timelessdesigns",
  "#effortlesschic",
  "#purposefuldesign",
  "#practical",
  "#pleasant",
  "#seasonless",
];
