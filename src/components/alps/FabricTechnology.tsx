import { useState } from "react";
import { X } from "lucide-react";
import { FEATURES } from "@/lib/alps-data";
import { featureIcon } from "@/lib/feature-icons";

// Existing macro photos (icons baked in)
import silverIon from "@/assets/fabric-tech/silver-ion.jpg";
import antiBacteria from "@/assets/fabric-tech/anti-bacteria.jpg";
import antiOdor from "@/assets/fabric-tech/anti-odor.jpg";
import antiStatic from "@/assets/fabric-tech/anti-static.jpg";
import spfUv from "@/assets/fabric-tech/spf-uv50.jpg";
import selfCleaning from "@/assets/fabric-tech/self-cleaning.jpg";
import instantHeat from "@/assets/fabric-tech/instant-heat.jpg";
import farInfrared from "@/assets/fabric-tech/far-infrared.jpg";
import breathable from "@/assets/fabric-tech/breathable.jpg";
import quickDry from "@/assets/fabric-tech/quick-dry.jpg";
import waterRepellent from "@/assets/fabric-tech/water-repellent.jpg";
import selfAdhesive from "@/assets/fabric-tech/self-adhesive.jpg";

// Newly generated macro photos
import multiStyle from "@/assets/fabric-tech/multi-style.jpg";
import coolmax from "@/assets/fabric-tech/coolmax.jpg";
import antiVirus from "@/assets/fabric-tech/anti-virus.jpg";
import silvaLight from "@/assets/fabric-tech/silvalight.jpg";
import recycle from "@/assets/fabric-tech/recycle.jpg";
import bluesign from "@/assets/fabric-tech/bluesign.jpg";
import oekoTex from "@/assets/fabric-tech/oeko-tex.jpg";
import superSoft from "@/assets/fabric-tech/super-soft.jpg";
import stretch from "@/assets/fabric-tech/stretch.jpg";
import natural from "@/assets/fabric-tech/natural.jpg";
import vegan from "@/assets/fabric-tech/vegan.jpg";

const IMAGES: Record<string, string> = {
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
  "adhesive": selfAdhesive,
  "self-cleaning": selfCleaning,
  "silvalight": silvaLight,
  "water-repellent": waterRepellent,
  "uv-resistant": spfUv,
  "recycle": recycle,
  "bluesign": bluesign,
  "oeko-tex": oekoTex,
  "super-soft": superSoft,
  "stretch": stretch,
  "natural": natural,
  "vegan": vegan,
};

// Provide a fallback (anti-bacteria photo) for any key without a dedicated image.
const fallback = antiBacteria;

export function FabricTechnology() {
  const [active, setActive] = useState<null | (typeof FEATURES)[number]>(null);

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Textile Science</p>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight">Engineered fabric technology</h2>
        <p className="text-sm text-muted-foreground mt-3">Click any feature to read about the technology behind it.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
        {FEATURES.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f)}
            className="flex flex-col text-left group"
          >
            <p className="text-sm leading-snug mb-3 min-h-[2.5rem]">{f.name}</p>
            <div className="border-t border-border pt-3">
              <div className="w-full aspect-square bg-muted flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
                {featureIcon(f.key) ? (
                  <img
                    src={featureIcon(f.key)}
                    alt={f.name}
                    loading="lazy"
                    className="w-1/2 h-1/2 object-contain"
                  />
                ) : (
                  <img
                    src={IMAGES[f.key] ?? fallback}
                    alt={f.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <div className="bg-card max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="close"
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-foreground/60 hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={IMAGES[active.key] ?? fallback}
              alt={active.name}
              className="w-full aspect-[16/9] object-cover mb-6"
            />
            <span className="num text-[11px] text-primary tracking-[0.3em] uppercase">feature</span>
            <h3 className="text-2xl font-light mt-2">{active.name}</h3>
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{active.desc}</p>
          </div>
        </div>
      )}
    </section>
  );
}
