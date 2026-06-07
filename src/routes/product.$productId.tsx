import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { Shell } from "@/components/alps/Shell";
import { PRODUCTS, PRODUCT_COLORS, FEATURES } from "@/lib/alps-data";
import {
  productImageForColor,
  productGallery,
} from "@/lib/accessory-images";
import { colorSwatch } from "@/lib/color-swatches";
import { featureIcon } from "@/lib/feature-icons";
import { useCart, buildCartItem } from "@/lib/cart";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$productId")({
  head: ({ params }) => {
    const p = PRODUCTS.find((x) => x.id === params.productId);
    return {
      meta: [
        { title: `${p?.name ?? "product"} — ALPS Annie Ling` },
        { name: "description", content: p ? `${p.name} — ALPS Annie Ling` : "ALPS Annie Ling product" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <Shell>
      <div className="max-w-3xl mx-auto py-32 px-6 text-center">
        <h1 className="text-3xl font-light">product not found</h1>
        <Link to="/" className="link-red mt-6 inline-block">return home</Link>
      </div>
    </Shell>
  ),
});

function ProductPage() {
  const { productId } = Route.useParams();
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) throw notFound();

  const isPersonalCare = product.category === "personal-care";

  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [openFeature, setOpenFeature] = useState<string | null>(null);

  const gallery = useMemo(
    () => productGallery(product.id, product.colors),
    [product.id, product.colors],
  );
  const [activeImage, setActiveImage] = useState<string | undefined>(
    () => productImageForColor(product.id, product.colors[0]) ?? gallery[0],
  );

  // Sync main image when the selected colour changes.
  useEffect(() => {
    const next = productImageForColor(product.id, color);
    if (next) setActiveImage(next);
  }, [color, product.id]);

  const { add } = useCart();
  const onAdd = () => {
    const it = buildCartItem(product!.id, color, size, qty);
    if (it) { add(it); toast.success("added to bag"); }
  };

  return (
    <Shell>
      <div className="max-w-[1760px] mx-auto px-4 lg:px-10 py-10">
        {/* 3-column: description LEFT · image CENTER · controls RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] gap-8 lg:gap-10">
          {/* LEFT — description */}
          <aside className="order-3 lg:order-1">
            <span className="num text-[11px] tracking-[0.3em] text-primary uppercase">
              {product.category.replace("-", " ")}
            </span>
            <h1 className="text-2xl md:text-3xl font-light mt-2 leading-tight">{product.name}</h1>
            <p className="num text-base mt-3 text-foreground/80">
              CAD {product.priceCAD} <span className="text-foreground/40">·</span> HKD {product.priceHKD}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.features.map((fk) => {
                const f = FEATURES.find((x) => x.key === fk);
                if (!f) return null;
                const icon = featureIcon(fk);
                const isOpen = openFeature === fk;
                return (
                  <Popover key={fk} open={isOpen} onOpenChange={(o) => setOpenFeature(o ? fk : null)}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-[10px] tracking-wide px-2 py-1 border border-border hover:bg-muted transition-colors cursor-pointer"
                        aria-label={`${f.name} — details`}
                      >
                        {icon && <img src={icon} alt="" className="w-4 h-4 object-contain" />}
                        {f.name}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="w-72 text-xs leading-relaxed">
                      <div className="flex items-center gap-2 mb-2">
                        {icon && <img src={icon} alt="" className="w-5 h-5 object-contain" />}
                        <span className="font-medium tracking-wide uppercase text-[11px]">{f.name}</span>
                      </div>
                      <p className="text-foreground/80">{f.desc}</p>
                    </PopoverContent>
                  </Popover>
                );
              })}
            </div>

            <div className="mt-8 divide-y divide-border border-y border-border">
              {isPersonalCare ? (
                <>
                  <Accordion title="description" defaultOpen>
                    formulated with plant-based actives and clean preservation. vegan, cruelty-free, made in small batches.
                  </Accordion>
                  <Accordion title="benefits">
                    gentle daily care that respects skin barrier function — hydrating, balancing, and free from animal-derived ingredients.
                  </Accordion>
                  <Accordion title="how to use">
                    apply to clean skin morning and evening. follow with serum and moisturiser. avoid direct contact with eyes.
                  </Accordion>
                </>
              ) : (
                <>
                  <Accordion title="description" defaultOpen>
                    precision-constructed in our hong kong atelier from performance textiles selected for their behaviour
                    as much as their look. cut for movement, finished for longevity.
                  </Accordion>
                  <Accordion title="care">
                    cold machine wash inside out. do not bleach. line dry away from direct sunlight. cool iron if needed.
                  </Accordion>
                  <Accordion title="size guide">
                    standard hong kong sizing. unisex sizing runs true to size. contact us for a personal fitting consultation.
                  </Accordion>
                </>
              )}
            </div>
          </aside>

          {/* CENTER — main image + thumbnail strip */}
          <div className="order-1 lg:order-2">
            <div
              className="aspect-square flex items-center justify-center overflow-hidden bg-brand-light"
              style={!activeImage ? { background: isPersonalCare ? "var(--muted)" : PRODUCT_COLORS[color] } : undefined}
            >
              {activeImage ? (
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={`${product.name} — ${color}`}
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
              ) : (
                <span className={`text-sm tracking-wide px-6 text-center ${isPersonalCare ? "text-foreground/60" : "text-white/80 mix-blend-difference"}`}>
                  {product.name}
                </span>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((url, i) => {
                  const active = url === activeImage;
                  return (
                    <button
                      key={url + i}
                      onClick={() => setActiveImage(url)}
                      className={`h-20 w-20 shrink-0 overflow-hidden border-2 transition ${
                        active ? "border-primary" : "border-border hover:border-foreground/60"
                      }`}
                      aria-label={`view ${i + 1}`}
                    >
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT — colour / size / qty / add to bag */}
          <div className="order-2 lg:order-3">
            {!isPersonalCare && (
              <div>
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-foreground/60 mb-3">
                  colour — <span className="text-foreground/90">{color}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => {
                    const sw = colorSwatch(c);
                    return (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className="h-9 w-9 rounded-full overflow-hidden border-2 flex items-center justify-center transition"
                        style={{
                          background: sw ? "transparent" : PRODUCT_COLORS[c],
                          borderColor: color === c ? "var(--brand-red)" : "var(--border)",
                        }}
                        title={c}
                        aria-label={c}
                      >
                        {sw && <img src={sw} alt={c} className="h-full w-full object-cover" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-[11px] tracking-[0.25em] uppercase text-foreground/60 mb-3">size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 text-xs border ${
                      size === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[11px] tracking-[0.25em] uppercase text-foreground/60 mb-3">quantity</h3>
              <div className="inline-flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                <span className="num w-10 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-muted"><Plus className="h-3 w-3" /></button>
              </div>
            </div>

            <button
              onClick={onAdd}
              className="w-full mt-8 bg-primary text-primary-foreground py-4 text-sm tracking-[0.2em] uppercase hover:opacity-90 transition"
            >
              add to bag
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-sm hover:text-primary"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-4 text-sm text-foreground/70 leading-relaxed">{children}</div>}
    </div>
  );
}
