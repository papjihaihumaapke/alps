import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageGallery } from "@/components/alps/ImageGallery";
import { TagFilterBar } from "@/components/alps/TagFilterBar";
import { CATEGORY_TAGS, matchesTag } from "@/lib/categorisation";

export type EntrySection = "recognitions" | "design-path";
export type EntryLink = { label: string; url: string };

type Entry = {
  id: string;
  title: string;
  body: string | null;
  occurred_on: string;
  link_url: string | null;
  image_urls: string[];
  video_urls: string[] | null;
  links: EntryLink[] | null;
  tags: string[];
};

/** Older entries stored a single link_url; newer ones a list of links. */
function entryLinks(m: Entry): EntryLink[] {
  if (m.links?.length) return m.links;
  return m.link_url ? [{ label: "", url: m.link_url }] : [];
}

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
      .select("*")
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
              {entryLinks(m).length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  {entryLinks(m).map((l, i) => (
                    <li key={l.url + i}>
                      <a href={l.url} target="_blank" rel="noreferrer" className="link-red inline-flex items-center gap-1.5 text-sm">
                        {l.label || "read more"} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              <ImageGallery images={m.image_urls ?? []} videos={m.video_urls ?? []} alt={m.title} className="mt-5" />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
