import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/alps/Shell";
import { SOCIALS } from "@/lib/alps-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "contact — ALPS Annie Ling" },
      { name: "description", content: "Get in touch with ALPS Annie Ling — wholesale, press, custom orders." },
      { property: "og:title", content: "contact — ALPS Annie Ling" },
      { property: "og:description", content: "Get in touch." },
    ],
  }),
  component: () => (
    <Shell>
      <section className="max-w-3xl mx-auto px-6 py-20">
        <span className="num text-[11px] tracking-[0.3em] text-primary">say hello</span>
        <h1 className="text-4xl font-light mt-3">contact</h1>
        <p className="mt-6 text-foreground/80 leading-relaxed">
          for orders, wholesale enquiries, press requests and custom collaborations, please write to{" "}
          <a href={`mailto:${SOCIALS.email}`} className="link-red">{SOCIALS.email}</a>{" "}
          or send us a note below.
        </p>

        <form className="mt-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Field label="name" />
          <Field label="email" type="email" />
          <Field label="subject" />
          <label className="block">
            <span className="text-[11px] tracking-wide text-foreground/60">message</span>
            <textarea rows={6} className="mt-1 w-full bg-card border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </label>
          <button className="bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase">
            send
          </button>
        </form>
      </section>
    </Shell>
  ),
});

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-wide text-foreground/60">{label}</span>
      <input type={type} className="mt-1 w-full bg-card border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
    </label>
  );
}
