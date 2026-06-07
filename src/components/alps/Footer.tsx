import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Twitter, MessageCircle } from "lucide-react";
import { SOCIALS, FEATURES } from "@/lib/alps-data";

const AWARDS = [
  { year: "2022", outlet: "NY Product Design — gold · ONE and ALL" },
  { year: "2022", outlet: "HK Most Outstanding Business — fashion innovation" },
  { year: "2021", outlet: "NY Product Design — gold · warrior" },
  { year: "2021", outlet: "International Design Awards — silver · warrior" },
  { year: "2018", outlet: "International Design Awards — silver · instant warming vest" },
];

export function Footer() {
  return (
    <footer className="bg-background text-foreground mt-24 border-t border-border">
      <div className="mx-auto max-w-[1760px] px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 text-[12px]">
        <Col title="asia miles">
          <a href={SOCIALS.asiaMiles} target="_blank" rel="noreferrer" className="text-foreground/80 hover:text-primary leading-snug">
            light fresh® technology CABAS 220 shoulder bag
          </a>
          <span className="text-foreground/80 leading-snug">
            kenichi multi function self cleaning backpack include one inner tie bag and one inner carry bag
          </span>
        </Col>

        <Col title="size info">
          <span className="text-foreground/80">kids</span>
          <span className="text-foreground/80">men</span>
          <span className="text-foreground/80">women</span>
          <span className="text-foreground/80">unisex</span>
        </Col>

        <Col title="features">
          <div className="grid gap-1.5">
            {FEATURES.slice(0, 22).map((f) => (
              <span key={f.key} className="text-foreground/80 truncate">{f.name}</span>
            ))}
          </div>
        </Col>

        <Col title="awards & accolades">
          <div className="grid gap-1.5">
            {AWARDS.map((a, i) => (
              <span key={i} className="text-foreground/80 leading-snug">
                <span className="num text-primary mr-2">{a.year}</span>{a.outlet}
              </span>
            ))}
            <Link to="/press" className="link-red mt-2 inline-block">view all press →</Link>
          </div>
        </Col>

        <Col title="find us">
          <div className="space-y-3">
            <div>
              <p className="text-[11px] text-foreground/60 mb-1.5">ALPS</p>
              <div className="flex gap-3 text-foreground/80">
                <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" aria-label="ALPS facebook" className="hover:text-primary"><Facebook className="h-4 w-4" /></a>
                <a href={SOCIALS.x} target="_blank" rel="noreferrer" aria-label="ALPS x" className="hover:text-primary"><Twitter className="h-4 w-4" /></a>
                <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" aria-label="ALPS instagram" className="hover:text-primary"><Instagram className="h-4 w-4" /></a>
                <a href={SOCIALS.youtube} target="_blank" rel="noreferrer" aria-label="ALPS youtube" className="hover:text-primary"><Youtube className="h-4 w-4" /></a>
                <a href={SOCIALS.threads} target="_blank" rel="noreferrer" aria-label="ALPS threads" className="hover:text-primary"><MessageCircle className="h-4 w-4" /></a>
              </div>
            </div>
            <div>
              <p className="text-[11px] text-foreground/60 mb-1.5">vegan skincare</p>
              <div className="flex gap-3 text-foreground/80">
                <a href={SOCIALS.skincareFacebook} target="_blank" rel="noreferrer" aria-label="skincare facebook" className="hover:text-primary"><Facebook className="h-4 w-4" /></a>
                <a href={SOCIALS.skincareInstagram} target="_blank" rel="noreferrer" aria-label="skincare instagram (english)" className="hover:text-primary"><Instagram className="h-4 w-4" /></a>
                <a href={SOCIALS.skincareInstagramBilingual} target="_blank" rel="noreferrer" aria-label="skincare instagram (en/zh)" className="hover:text-primary"><Instagram className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-[11px] text-foreground/60 mb-1">contact</p>
              <a href={`mailto:${SOCIALS.email}`} className="text-foreground/80 hover:text-primary">{SOCIALS.email}</a>
            </div>
          </div>
        </Col>

        <Col title="pre-order">
          <Link to="/account" className="text-foreground/80 hover:text-primary">catch up new item</Link>
        </Col>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1760px] px-6 lg:px-10 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-4">
            <span className="tracking-[0.2em] uppercase">stay connected</span>
            <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="hello@youremail.com"
                className="bg-white/15 placeholder:text-white/70 text-white px-3 py-1.5 text-[11px] w-64 focus:outline-none"
              />
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 text-[11px] tracking-wide border-l border-white/20">
                subscribe
              </button>
            </form>
          </div>
          <span>@ {new Date().getFullYear()} ALPS annie ling</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <h4 className="text-[12px] tracking-wide text-foreground font-medium mb-2">{title}</h4>
      {children}
    </div>
  );
}
