import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { Shell } from "@/components/alps/Shell";
import hero from "@/assets/backgrounds/bg-01.jpg";
import textile from "@/assets/backgrounds/hightech-01.jpg";
import designer from "@/assets/brand/mannequin-01.png";
import logoBlack from "@/assets/brand/alps-logo-white.png";
import colorBanner from "@/assets/brand/color-banner.png";
import catInnovation from "@/assets/categories/innovation.png";
import catContemporary from "@/assets/categories/contemporary.png";
import catAccessories from "@/assets/categories/accessories.png";
import catCollab from "@/assets/categories/collaborations.png";
import catPersonal from "@/assets/categories/personal-care.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ALPS Annie Ling — timeless with a twist" },
      {
        name: "description",
        content:
          "ALPS Annie Ling — Hong Kong fashion house where innovation meets timeless design. Shop performance outerwear, contemporary ready-to-wear, accessories and vegan personal care.",
      },
      { property: "og:title", content: "ALPS Annie Ling" },
      { property: "og:description", content: "Timeless with a twist — made to make a difference." },
    ],
  }),
  component: Home,
});

const CAT_IMAGES: Record<string, string> = {
  innovation: catInnovation,
  contemporary: catContemporary,
  accessories: catAccessories,
  collaborations: catCollab,
  "personal-care": catPersonal,
};

const VIDEOS = [
  "ALPS anti-bacteria travel lite face mask",
  "ALPS anti-bacteria travel collection",
  "ALPS anti-bacteria instant warm vest",
  "light fresh self-cleaning short",
  "winter II muted",
  "summer II tropical in iceland",
  "summer III sugar crush",
  "summer IV mutant",
  "summer V warrior",
  "winter V bind",
  "summer VI one and all",
  "CABAS 220",
  "one and all highlight",
  "one and all parade series",
];

function Home() {
  return (
    <Shell>
      <EditorialHero />
      <BrandVideo />
      <Innovation />
      <BrandIntro />
      <Designer />
    </Shell>
  );
}

function EditorialHero() {
  const cards = [
    { slug: "innovation", label: "innovation", img: catInnovation },
    { slug: "contemporary", label: "contemporary", img: catContemporary },
    { slug: "accessories", label: "accessories", img: catAccessories },
    { slug: "collaborations", label: "collaborations", img: catCollab },
    { slug: "personal-care", label: "vegan skin & personal care", img: catPersonal },
  ] as const;

  return (
    <section className="relative bg-background px-6 lg:px-10 pt-6 pb-32 md:pb-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-3">
          {/* Top-left: hero image, half height */}
          <div className="col-span-12 lg:col-span-9">
            <div className="aspect-[16/4] w-full border border-border bg-card overflow-hidden">
              <img src={hero} alt="ALPS editorial" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Top-right: solid red */}
          <div className="col-span-6 lg:col-span-3">
            <div className="aspect-[16/4] lg:aspect-auto lg:h-full w-full bg-primary" />
          </div>

          {/* Bottom-left: black band */}
          <div className="col-span-12 lg:col-span-9">
            <div className="aspect-[16/6] w-full bg-brand-black" />
          </div>

          {/* Bottom-right: two grey blocks stacked */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-3">
            <div className="flex-[3] min-h-[140px] bg-muted" />
            <div className="flex-[1] min-h-[40px] bg-muted-foreground/40" />
          </div>
        </div>

        {/* Floating category cards — full width on mobile, bigger on desktop */}
        <div className="relative -mt-20 md:-mt-32 flex justify-center pointer-events-none">
          <div className="pointer-events-auto bg-background px-4 md:px-10 pt-8 pb-10 w-full max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
              {cards.map((c) => (
                <Link key={c.slug} to={`/${c.slug}`} className="group flex flex-col items-center text-center">
                  <div className="text-[11px] tracking-[0.15em] leading-tight">
                    <div className="font-medium">ALPS</div>
                    <div className="text-foreground/80">{c.label}</div>
                  </div>
                  <div className="mt-3 w-full aspect-square overflow-hidden bg-muted">
                    <img
                      src={c.img}
                      alt={`ALPS ${c.label}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="link-red text-[11px] mt-3 inline-block">view all</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandVideo() {
  return (
    <section className="bg-brand-black text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-light">ALPS fashion shows</h2>
        </div>
        <div className="relative aspect-video bg-zinc-900 overflow-hidden group cursor-pointer">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/videoseries?list=UUQkObngC_R1tDpdfV5Ebcmg&autoplay=1&mute=1&loop=1"
            title="ALPS Annie Ling — fashion shows"
            allow="autoplay; encrypted-media"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {VIDEOS.map((v, i) => (
            <button
              key={v}
              className="aspect-video bg-zinc-800 hover:bg-zinc-700 transition p-3 text-left text-[10px] leading-tight"
            >
              <span className="num text-primary block mb-2">{String(i + 1).padStart(2, "0")}</span>
              {v}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Innovation() {
  return (
    <section className="bg-brand-light py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <img src={textile} alt="performance textile" loading="lazy" className="aspect-square object-cover" />
        <div>
          <span className="num text-[11px] tracking-[0.3em] text-primary">03 / innovation</span>
          <h2 className="text-3xl md:text-5xl mt-3 font-light text-primary">alps fashion innovation</h2>
          <p className="mt-6 text-foreground/80 leading-relaxed">
            we build garments around performance science — far-infrared yarns, silver-ion antimicrobial knits,
            photocatalytic self-cleaning finishes and bluesign-approved recycled fibres. each piece is engineered
            to behave like technology and read like fashion.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            the result is clothing made to make a difference — quietly, precisely, every day.
          </p>
          <Link to="/innovation" className="link-red text-[12px] tracking-wide mt-8 inline-block">
            explore the innovation collection →
          </Link>
        </div>
      </div>
    </section>
  );
}

function BrandIntro() {
  return (
    <section className="bg-primary text-primary-foreground py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <img src={logoBlack} alt="ALPS annie ling logo" className="w-full max-w-md" />
        <div>
          <span className="num text-[11px] tracking-[0.3em] opacity-80">brand introduction</span>
          <h2 className="text-3xl md:text-4xl mt-3 font-light leading-tight">
            timeless with a twist — <br />made to make a difference.
          </h2>
          <p className="mt-8 leading-relaxed opacity-90">
            driven by the desire to unite fashion and craftsmanship, ALPS aims to bring work and life
            balance into its design. inspired by a new age of active living and cutting-edge textile
            innovations, the brand is committed to designing enduring clothing that supports wellbeing.
          </p>
          <p className="mt-4 leading-relaxed opacity-90">
            ALPS integrates fun and unexpected details with sports and technology elements into its
            designs. this unique combination differentiates ALPS from normal fashion brands —
            effortlessly stylish, highly versatile and wearable every day.
          </p>
        </div>
      </div>
    </section>
  );
}

function Designer() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="num text-[11px] tracking-[0.3em] text-primary">04 / designer</span>
          <h2 className="text-3xl md:text-4xl mt-3 font-light">annie ling</h2>
          <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
            <p>
              annie ling trained at central saint martins and the hong kong polytechnic university school of design.
              her work has been recognised by the dfa awards, hktdc and asia miles for its precision tailoring and
              material innovation.
            </p>
            <p>
              her practice is grounded in a single principle — clothing should be functional, modern, scientific
              and aspirational. nothing decorative. nothing without purpose.
            </p>
            <Link to="/my-journey" className="link-red text-[12px] tracking-wide inline-block mt-4">
              read my journey →
            </Link>
          </div>
        </div>
        <img src={designer} alt="atelier — mannequins" loading="lazy" className="aspect-[5/6] object-cover" />
      </div>
    </section>
  );
}

