import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/alps/Shell";
import { useCart, formatMoney } from "@/lib/cart";
import { PRODUCT_COLORS } from "@/lib/alps-data";
import { Minus, Plus, X } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "cart — ALPS Annie Ling" }, { name: "description", content: "Your shopping bag." }] }),
  component: Cart,
});

function Cart() {
  const { items, currency, subtotal, remove, updateQty } = useCart();

  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-light">your bag</h1>
        {items.length === 0 ? (
          <div className="mt-8">
            <p className="text-foreground/60">your bag is empty.</p>
            <Link to="/" className="link-red text-sm mt-4 inline-block">continue shopping</Link>
          </div>
        ) : (
          <div className="mt-10 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 divide-y divide-border border-y border-border">
              {items.map((it, i) => (
                <div key={i} className="py-5 flex gap-4 items-start">
                  <div className="w-20 h-20 shrink-0" style={{ background: PRODUCT_COLORS[it.color] ?? "#eee" }} />
                  <div className="flex-1">
                    <div className="text-sm">{it.name}</div>
                    <div className="text-xs text-foreground/60 mt-1">{it.color} · {it.size}</div>
                    <div className="inline-flex items-center border border-border mt-3">
                      <button onClick={() => updateQty(i, it.qty - 1)} className="p-1.5"><Minus className="h-3 w-3" /></button>
                      <span className="num w-8 text-center text-sm">{it.qty}</span>
                      <button onClick={() => updateQty(i, it.qty + 1)} className="p-1.5"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="num text-sm">{formatMoney((currency === "CAD" ? it.priceCAD : it.priceHKD) * it.qty, currency)}</div>
                    <button onClick={() => remove(i)} className="text-foreground/40 hover:text-primary mt-2"><X className="h-4 w-4 ml-auto" /></button>
                  </div>
                </div>
              ))}
            </div>
            <aside className="bg-card border border-border p-6 h-fit">
              <h3 className="text-[11px] tracking-[0.25em] uppercase">summary</h3>
              <div className="num text-sm mt-6 flex justify-between">
                <span>subtotal</span><span>{formatMoney(subtotal, currency)}</span>
              </div>
              <p className="text-[10px] text-foreground/50 mt-2">shipping & tax calculated at checkout</p>
              <Link to="/checkout" className="block text-center mt-6 bg-primary text-primary-foreground py-3 text-xs tracking-[0.2em] uppercase">
                proceed to checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </Shell>
  );
}
