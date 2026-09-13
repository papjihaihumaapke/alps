import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageGallery } from "@/components/alps/ImageGallery";
import { TagFilterBar } from "@/components/alps/TagFilterBar";
import { CATEGORY_TAGS, matchesTag } from "@/lib/categorisation";

export type EntrySection = "recognitions" | "design-path";

type Entry = {
  id: string;
  title: string;
  body: string | null;
  occurred_on: string;
  link_url: string | null;
  image_urls: string[];
  tags: string[];
};

const TAG_LABEL = Object.fromEntries(CATEGORY_TAGS.map((t) => [t.key, t.label]));

/**
 * Admin-managed entries for one section, newest first (by date, then by when
 * they were added), each with its own scrolling image gallery.
 */
export function EntryFeed({
  section,
  eyebrow,
  heading,
  dateFormat = "month",
}: {
  section: EntrySection;
  eyebrow?: string;
  heading: string;
  dateFormat?: "month" | "year";
}) {
  const [rows, setRows] = useState<Entry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeTag, setActiveTag] = useState("all");

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("milestones")
      .select("id, title, body, occurred_on, link_url, image_urls, tags")
      .eq("section", section)
      .eq("hidden", false)
      .order("occurred_on", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (cancelled) return;
        setRows((data ?? []) as Entry[]);
        setLoaded(true);
      });
    return () => { cancelled = true; };
  }, [section]);

  const visible = useMemo(() => rows.filter((r) => matchesTag(r.tags, activeTag)), [rows, activeTag]);

  if (!loaded || rows.length === 0) return null;

  return (
    <section>
      {eyebrow && <span className="num text-[11px] tracking-[0.3em] text-primary">{eyebrow}</span>}
      <h2 className={`text-3xl font-light ${eyebrow ? "mt-3" : ""}`}>{heading}</h2>

      <TagFilterBar active={activeTag} onChange={setActiveTag} className="mt-6" />

      {visible.length === 0 ? (
        <p className="mt-10 text-foreground/60 text-sm">no entries match this filter.</p>
      ) : (
        <ol className="mt-10 divide-y divide-border border-y border-border">
          {visible.map((m) => (
            <li key={m.id} className="py-8 px-2">
              <time
                dateTime={m.occurred_on}
                className="num text-[11px] tracking-[0.25em] uppercase text-primary"
              >
                {dateFormat === "year"
                  ? m.occurred_on.slice(0, 4)
                  : new Date(`${m.occurred_on}T00:00:00`).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                    })}
              </time>
              <h3 className="text-xl font-light mt-2">{m.title}</h3>
              {m.body && (
                <p className="mt-3 text-foreground/80 leading-relaxed text-[15px] whitespace-pre-line">{m.body}</p>
              )}
              {m.tags?.length > 0 && (
                <p className="mt-3 text-[10px] tracking-[0.2em] uppercase text-foreground/50">
                  {m.tags.map((t) => TAG_LABEL[t] ?? t).join(" · ")}
                </p>
              )}
              {m.link_url && (
                <a
                  href={m.link_url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-red mt-3 inline-flex items-center gap-1.5 text-sm"
                >
                  read more <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              <ImageGallery images={m.image_urls ?? []} alt={m.title} className="mt-5" />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
