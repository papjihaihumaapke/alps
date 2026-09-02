/**
 * Horizontally scrolling image gallery used by entries that carry multiple
 * images (recognitions, products). Renders nothing when there are no images.
 */
export function ImageGallery({
  images,
  alt,
  className = "",
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  if (!images.length) return null;

  const single = images.length === 1;

  return (
    <div
      className={`flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory ${className}`}
      role="group"
      aria-label={`${alt} — ${images.length} image${single ? "" : "s"}`}
    >
      {images.map((url, i) => (
        <img
          key={url + i}
          src={url}
          alt={single ? alt : `${alt} — image ${i + 1}`}
          loading="lazy"
          className={`snap-start shrink-0 object-cover bg-muted ${
            single ? "w-full max-w-md aspect-[4/3]" : "w-64 sm:w-72 aspect-[4/3]"
          }`}
        />
      ))}
    </div>
  );
}
