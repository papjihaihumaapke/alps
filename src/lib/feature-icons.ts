// Official ALPS feature icons (line-art glyphs). Use as overlay/badge alongside
// macro photos and on product detail feature chips.

import multiStyle from "@/assets/features/multi-style.png";
import instantHeat from "@/assets/features/instant-heat.png";
import farInfrared from "@/assets/features/far-infrared.png";
import coolmax from "@/assets/features/coolmax.png";
import silverIon from "@/assets/features/silver-ion.png";
import antiVirus from "@/assets/features/anti-virus.png";
import antiOdor from "@/assets/features/anti-odor.png";
import antiStatic from "@/assets/features/anti-static.png";
import quickDry from "@/assets/features/quick-dry.png";
import breathable from "@/assets/features/breathable.png";
import adhesive from "@/assets/features/adhesive.png";
import lightfresh from "@/assets/features/lightfresh.png";
import silvalight from "@/assets/features/silvalight.png";
import waterRepellent from "@/assets/features/water-repellent.png";
import uvResistant from "@/assets/features/uv-resistant.png";
import recycled from "@/assets/features/recycled.png";
import bluesign from "@/assets/features/bluesign.png";
import oekoTex from "@/assets/features/oeko-tex.png";
import superSoft from "@/assets/features/super-soft.png";
import stretch from "@/assets/features/stretch.png";
import natural from "@/assets/features/natural.png";

export const FEATURE_ICONS: Record<string, string> = {
  "multi-style": multiStyle,
  "instant-heat": instantHeat,
  "far-infrared": farInfrared,
  "coolmax": coolmax,
  "silver-ion": silverIon,
  "anti-virus": antiVirus,
  "anti-odor": antiOdor,
  "anti-static": antiStatic,
  "quick-dry": quickDry,
  "breathable": breathable,
  "adhesive": adhesive,
  "lightfresh": lightfresh,
  "light-fresh": lightfresh,
  "self-cleaning": lightfresh,
  "silvalight": silvalight,
  "silva-light": silvalight,
  "water-repellent": waterRepellent,
  "uv-resistant": uvResistant,
  "uv-protection": uvResistant,
  "recycled": recycled,
  "recycled-material": recycled,
  "bluesign": bluesign,
  "bluesign-approved": bluesign,
  "oeko-tex": oekoTex,
  "oekotex": oekoTex,
  "super-soft": superSoft,
  "stretch": stretch,
  "natural": natural,
  "natural-fiber": natural,
};

export function featureIcon(key: string): string | undefined {
  return FEATURE_ICONS[key.toLowerCase().trim()];
}
