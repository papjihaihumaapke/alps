/**
 * YouTube / Vimeo page links become embeddable player URLs; anything else is
 * treated as a direct video file.
 */
function videoEmbed(url: string): { type: "iframe" | "file"; src: string } {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return { type: "iframe", src: `https://www.youtube.com/embed/${u.pathname.slice(1)}` };
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const id = u.searchParams.get("v") ?? u.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
      if (id) return { type: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }
    if (host === "vimeo.com") {
      const id = u.pathname.match(/\/(\d+)/)?.[1];
      if (id) return { type: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
    if (host === "player.vimeo.com") return { type: "iframe", src: url };
  } catch {
    /* not a URL — fall through */
  }
  return { type: "file", src: url };
}

/**
 * Horizontally scrolling media gallery used by entries that carry multiple
 * images and videos (recognitions, design path, products). Renders nothing
 * when empty.
 */
export function ImageGallery({
  images,
  videos = [],
  alt,
  className = "",
}: {
  images: string[];
  videos?: string[];
  alt: string;
  className?: string;
}) {
  const total = images.length + videos.length;
  if (!total) return null;

  const single = total === 1;
  const size = single ? "w-full max-w-xl aspect-[4/3]" : "w-64 sm:w-80 aspect-[4/3]";

  return (
    <div
      className={`flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory ${className}`}
      role="group"
      aria-label={`${alt} — ${total} item${single ? "" : "s"}`}
    >
      {images.map((url, i) => (
        <img
          key={"i" + url + i}
          src={url}
          alt={single ? alt : `${alt} — image ${i + 1}`}
          loading="lazy"
          className={`snap-start shrink-0 object-cover bg-muted ${size}`}
        />
      ))}
      {videos.map((url, i) => {
        const v = videoEmbed(url);
        return v.type === "iframe" ? (
          <iframe
            key={"v" + url + i}
            src={v.src}
            title={`${alt} — video ${i + 1}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className={`snap-start shrink-0 bg-black ${size}`}
          />
        ) : (
          <video
            key={"v" + url + i}
            src={v.src}
            controls
            preload="metadata"
            playsInline
            className={`snap-start shrink-0 bg-black object-contain ${size}`}
          />
        );
      })}
    </div>
  );
}
