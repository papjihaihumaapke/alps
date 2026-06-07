import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/alps/Shell";
import { SOCIALS } from "@/lib/alps-data";
import designer from "@/assets/brand/mannequin-01.png";

export const Route = createFileRoute("/my-journey")({
  head: () => ({
    meta: [
      { title: "my journey — annie ling" },
      {
        name: "description",
        content:
          "annie ling founded ALPS Annie Ling in 2015 — uniting fashion, technology and craftsmanship to design enduring clothing that supports wellbeing.",
      },
      { property: "og:title", content: "my journey — annie ling" },
      {
        property: "og:description",
        content: "the story behind ALPS Annie Ling — timeless with a twist, made to make a difference.",
      },
    ],
  }),
  component: () => (
    <Shell>
      <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        <img
          src={designer}
          alt="annie ling — atelier portrait"
          className="aspect-[4/5] object-cover bg-muted"
        />
        <div>
          <span className="num text-[11px] tracking-[0.3em] text-primary">designer</span>
          <h1 className="text-4xl font-light mt-3">my journey</h1>
          <p className="mt-4 text-[11px] tracking-[0.25em] uppercase text-foreground/60">
            timeless with a twist · made to make a difference
          </p>

          <div className="mt-8 space-y-5 text-foreground/80 leading-relaxed text-[15px]">
            <p>
              driven by the desire to unite fashion, technology and craftsmanship, designer annie ling
              founded ALPS Annie Ling in 2015. inspired by a new age of active living and cutting-edge
              textile innovations, the brand is committed to designing enduring clothing that supports
              wellbeing. ALPS pieces are practical, effortlessly stylish and wearable every day.
            </p>
            <p>
              people want to feel good in their clothing. we make this the design code of our
              collections: modern, minimalist, high-quality everyday designs with a twist. ALPS is
              inspired by and created for self-assured, active people so they can live their best
              lives with purpose, comfort and style.
            </p>
            <p>
              uniting fashion and high technology, soft fabrics and fresh silhouettes, we embrace a
              new age of active living and cutting-edge textile innovations to create inspiring
              contemporary clothing.
            </p>
            <p>
              whether it&rsquo;s anti-bacterial materials, breathable fabrics, quick-dry technology or
              thermal elements, we embrace cutting-edge textile innovations and a new age of active
              living to create inspiring contemporary clothing. uniting fashion, technology and
              craftsmanship, ALPS pieces are practical, effortlessly stylish and wearable every day.
            </p>
            <p className="num text-[11px] tracking-[0.25em] text-primary uppercase pt-2">— annie ling</p>
          </div>

          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-[11px] tracking-[0.25em] uppercase text-foreground/60 mb-3">
              alumni programmes
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={SOCIALS.dipAlumni}
                  target="_blank"
                  rel="noreferrer"
                  className="link-red"
                >
                  design incubation programme (dip) alumni →
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.fipAlumni}
                  target="_blank"
                  rel="noreferrer"
                  className="link-red"
                >
                  fashion incubation programme (fip) alumni →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Shell>
  ),
});
