import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/alps/Shell";
import { ExternalLink } from "lucide-react";
import { SOCIALS } from "@/lib/alps-data";

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

const AWARDS = [
  {
    year: "2022",
    outlet: "New York Product Design Awards",
    title: "silver — fashion & lifestyle smart fashion · collection ONE and ALL",
  },
  {
    year: "2022",
    outlet: "New York Product Design Awards",
    title: "silver — fashion & lifestyle womenswear · collection ONE and ALL",
  },
  {
    year: "2022",
    outlet: "Hong Kong Most Outstanding Business Awards",
    title: "best fashion innovation award 2022",
  },
  {
    year: "2021",
    outlet: "New York Product Design Awards",
    title: "gold — fashion & lifestyle smart fashion · collection warrior",
  },
  {
    year: "2021",
    outlet: "New York Product Design Awards",
    title: "silver — fashion & lifestyle womenswear · collection warrior",
  },
  {
    year: "2021",
    outlet: "International Design Awards",
    title: "silver — apparel category · collection warrior",
    href: "https://www.idesignawards.com/winners-old/zoom.php?eid=9-34162-21",
  },
  {
    year: "2021",
    outlet: "International Design Awards",
    title: "bronze — fashion design · recycle & sustainable · collection warrior",
  },
  {
    year: "2021",
    outlet: "International Design Awards",
    title: "honourable mention — prêt-à-porter · collection warrior",
  },
  {
    year: "2021",
    outlet: "International Design Awards",
    title: "honourable mention — apparel category · collection warrior",
  },
  {
    year: "2021",
    outlet: "Hong Kong Most Outstanding Services Awards",
    title: "best fashion design brand 2021",
  },
  {
    year: "2018",
    outlet: "International Design Awards",
    title: "silver — apparel · sportswear · silver ion instant warming vest",
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
                className="py-6 grid grid-cols-12 gap-4 items-baseline hover:bg-muted/40 px-2 transition group"
              >
                <span className="num col-span-2 text-primary text-sm">{p.year}</span>
                <span className="col-span-4 text-sm">{p.outlet}</span>
                <span className="col-span-5 text-sm text-foreground/70 group-hover:text-foreground">
                  {p.title}
                </span>
                <ExternalLink className="col-span-1 h-3.5 w-3.5 text-foreground/40 group-hover:text-primary justify-self-end" />
              </a>
            </li>
          ))}
        </ul>

        <h2 className="mt-24 text-2xl font-light">awards &amp; accolades</h2>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {AWARDS.map((a, i) => {
            const Row = (
              <>
                <span className="num col-span-2 text-primary text-sm">{a.year}</span>
                <span className="col-span-4 text-sm">{a.outlet}</span>
                <span className="col-span-5 text-sm text-foreground/70">{a.title}</span>
                {"href" in a && a.href ? (
                  <ExternalLink className="col-span-1 h-3.5 w-3.5 text-foreground/40 justify-self-end" />
                ) : (
                  <span className="col-span-1" />
                )}
              </>
            );
            return (
              <li key={i}>
                {"href" in a && a.href ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="py-6 grid grid-cols-12 gap-4 items-baseline hover:bg-muted/40 px-2 transition"
                  >
                    {Row}
                  </a>
                ) : (
                  <div className="py-6 grid grid-cols-12 gap-4 items-baseline px-2">{Row}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </Shell>
  ),
});
