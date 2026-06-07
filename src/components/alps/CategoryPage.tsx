import { useMemo, useState } from "react";
import { Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/alps/Shell";
import {
  ACCESSORY_TAGS,
  CATEGORIES,
  PRODUCTS,
  PRODUCT_COLORS,
  type AccessoryTag,
  type CategorySlug,
} from "@/lib/alps-data";
import { productImage } from "@/lib/accessory-images";
import { colorSwatch } from "@/lib/color-swatches";

type SortKey = "default" | "price-asc" | "price-desc" | "name";

export function CategoryView({ slug }: { slug: CategorySlug }) {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) throw notFound();

  const [activeTag, setActiveTag] = useState<"all" | AccessoryTag>("all");
  const [sort, setSort] = useState<SortKey>("default");

  const items = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.category === slug);
    if (slug === "accessories" && activeTag !== "all") {
      list = list.filter((p) => p.tags?.includes(activeTag));
    }
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.priceHKD - b.priceHKD);
      case "price-desc":
        return [...list].sort((a, b) => b.priceHKD - a.priceHKD);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [slug, activeTag, sort]);

  const showTagBar = slug === "accessories";

  return (
    <Shell>
      <section className="max-w-[1760px] mx-auto px-6 lg:px-10 pt-10 pb-6">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <h1 className="text-primary text-[15px] tracking-wide">{cat.name}</h1>

          <div className="flex flex-col items-end gap-4 ml-auto">
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none bg-card border border-border text-[12px] pl-3 pr-8 py-1.5 text-foreground/80 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="default">Default Sorting</option>
                <option value="name">Sort by name</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-foreground/50 text-[10px]">
                ▾
              </span>
            </div>

            {showTagBar && (
              <div className="flex flex-wrap justify-end gap-1.5 max-w-[760px]">
                {ACCESSORY_TAGS.map((t) => {
                  const active = activeTag === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setActiveTag(t.key)}
                      className={
                        "px-3 py-1 text-[11px] tracking-wide transition-colors border " +
                        (active
                          ? "bg-[oklch(0.35_0.14_18)] border-[oklch(0.35_0.14_18)] text-white"
                          : "bg-primary border-primary text-primary-foreground hover:bg-[oklch(0.35_0.14_18)] hover:border-[oklch(0.35_0.14_18)]")
                      }
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-[1760px] mx-auto px-6 lg:px-10 pb-20">
        {items.length === 0 ? (
          <p className="text-foreground/60 text-sm">no items match this filter.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-10">
            {items.map((p) => {
              const img = productImage(p.id);
              return (
                <Link
                  key={p.id}
                  to="/product/$productId"
                  params={{ productId: p.id }}
                  className="group block text-center"
                >
                  <div className="aspect-square bg-brand-light flex items-center justify-center overflow-hidden">
                    {img ? (
                      <img
                        src={img}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span className="text-foreground/30 text-[10px] tracking-wide px-4 text-center leading-snug">
                        {p.name}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 px-2">
                    <h3 className="text-[12px] leading-snug text-foreground group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="num text-[11px] text-foreground/50 mt-1.5">
                      ${p.priceHKD.toFixed(2)}
                    </p>
                    {p.colors.length > 1 && (
                      <div className="flex gap-1 justify-center mt-2">
                        {p.colors.slice(0, 5).map((c) => {
                          const sw = colorSwatch(c);
                          return sw ? (
                            <img
                              key={c}
                              src={sw}
                              alt={c}
                              title={c}
                              className="h-3 w-3 rounded-full object-cover"
                            />
                          ) : (
                            <span
                              key={c}
                              title={c}
                              className="h-2 w-2 rounded-full border border-border/60"
                              style={{ background: PRODUCT_COLORS[c] }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </Shell>
  );
}
