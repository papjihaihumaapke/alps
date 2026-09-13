import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/alps/Shell";
import { ExternalLink } from "lucide-react";
import { SOCIALS } from "@/lib/alps-data";
import { EntryFeed } from "@/components/alps/EntryFeed";

const ARTICLES = [
  {
    year: "2024",
    outlet: "Asia Miles Lifestyle",
    title: "CABAS 220 — light fresh® technology shoulder bag",
    href: SOCIALS.asiaMiles,
  },
  {
    year: "2023",
    outlet: "HKFIP",
    title: "fashion incubation programme — brand introduction",
    href: SOCIALS.fipAlumni,
  },
  {
    year: "2023",
    outlet: "HK Design Incubation",
    title: "DIP alumni — ALPS Annie Ling brand introduction",
    href: SOCIALS.dipAlumni,
  },
];


export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "press — ALPS Annie Ling" },
      {
        name: "description",
        content:
          "press features, editorial coverage and design awards for ALPS Annie Ling — including New York Product Design Awards, International Design Awards and Hong Kong Most Outstanding Awards.",
      },
      { property: "og:title", content: "press — ALPS Annie Ling" },
      { property: "og:description", content: "press features and awards for ALPS Annie Ling." },
    ],
  }),
  component: () => (
    <Shell>
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-light">press</h1>
        <p className="mt-4 text-sm text-foreground/60 max-w-xl">
          selected articles and editorial features written about the brand.
        </p>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {ARTICLES.map((p, i) => (
            <li key={i}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="py-6 grid grid-cols-12 gap-x-4 gap-y-1 sm:gap-4 items-baseline hover:bg-muted/40 px-2 transition group"
              >
                <span className="num col-span-3 sm:col-span-2 text-primary text-sm">{p.year}</span>
                <span className="col-span-9 sm:col-span-4 text-sm">{p.outlet}</span>
                <span className="col-span-12 sm:col-span-5 text-sm text-foreground/70 group-hover:text-foreground">
                  {p.title}
                </span>
                <ExternalLink className="hidden sm:block col-span-1 h-3.5 w-3.5 text-foreground/40 group-hover:text-primary justify-self-end" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-24">
          <EntryFeed section="recognitions" heading="recognitions" dateFormat="year" />
        </div>
      </section>
    </Shell>
  ),
});
