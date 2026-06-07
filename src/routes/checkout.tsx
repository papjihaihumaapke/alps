import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/alps/Shell";
import { useCart, formatMoney } from "@/lib/cart";
import { COUNTRIES, CA_PROVINCES, taxRate } from "@/lib/tax";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "checkout — ALPS Annie Ling" }, { name: "description", content: "Secure checkout." }] }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal, currency, setCurrency, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("HK");
  const [province, setProvince] = useState("ON");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [busy, setBusy] = useState(false);

  const ctry = COUNTRIES.find((c) => c.code === country)!;
  if (ctry.currency !== currency) setCurrency(ctry.currency);

  const shipping = country === "HK" ? 30 : country === "CA" ? 25 : 0;
  const taxableBase = Math.max(0, subtotal - discount);
  const tax = +(taxableBase * taxRate(country, province)).toFixed(2);
  const total = +(taxableBase + shipping + tax).toFixed(2);

  const applyPromo = async () => {
    if (!promo) return;
    const { data, error } = await supabase.from("promo_codes").select("*")
      .eq("code", promo.trim()).eq("active", true).maybeSingle();
    if (error || !data) { toast.error("invalid code"); return; }
    if (data.expires_at && new Date(data.expires_at) < new Date()) { toast.error("code expired"); return; }
    if (data.usage_limit && data.used_count >= data.usage_limit) { toast.error("code exhausted"); return; }
    if (data.currency && data.currency !== currency) { toast.error("code not valid in this currency"); return; }
    const d = data.discount_type === "percent"
      ? +(subtotal * (Number(data.amount) / 100)).toFixed(2)
      : Number(data.amount);
    setDiscount(d);
    toast.success(`promo applied: -${formatMoney(d, currency)}`);
  };

  const placeOrder = async () => {
    if (items.length === 0) { toast.error("your bag is empty"); return; }
    if (!name || !email || !address) { toast.error("please fill in your details"); return; }
    setBusy(true);

    const { data: order, error } = await supabase.from("orders").insert({
      user_id: user?.id ?? null,
      email, full_name: name, mobile, address,
      country: country === "CA" ? `CA-${province}` : country,
      currency, subtotal, shipping, tax, discount, total,
      promo_code: discount > 0 ? promo : null,
    }).select().single();

    if (error || !order) { setBusy(false); toast.error(error?.message ?? "could not place order"); return; }

    const rows = items.map((it) => ({
      order_id: order.id,
      product_slug: it.productId,
      name: it.name,
      color: it.color,
      size: it.size,
      qty: it.qty,
      unit_price: currency === "CAD" ? it.priceCAD : it.priceHKD,
      currency,
    }));
    const { error: e2 } = await supabase.from("order_items").insert(rows);
    if (e2) { setBusy(false); toast.error(e2.message); return; }

    clear();
    setBusy(false);
    toast.success("order placed — thank you");
    navigate({ to: "/account" });
  };

  return (
    <Shell>
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <Step n="01" title="contact & shipping">
            <Field label="full name" value={name} onChange={setName} />
            <Field label="email" type="email" value={email} onChange={setEmail} />
            <Field label="mobile" value={mobile} onChange={setMobile} />
            <Field label="shipping address" value={address} onChange={setAddress} />
            <label className="block">
              <span className="text-[11px] tracking-wide text-foreground/60">country / region</span>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full bg-card border border-border px-3 py-2 text-sm">
                {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
            </label>
            {country === "CA" && (
              <label className="block">
                <span className="text-[11px] tracking-wide text-foreground/60">province</span>
                <select value={province} onChange={(e) => setProvince(e.target.value)} className="mt-1 w-full bg-card border border-border px-3 py-2 text-sm">
                  {CA_PROVINCES.map((p) => <option key={p.code} value={p.code}>{p.name} — {(p.rate * 100).toFixed(2)}%</option>)}
                </select>
              </label>
            )}
            {country === "OTHER" && (
              <p className="text-xs text-foreground/60">international shipping will be quoted within 24 hours of your order.</p>
            )}
          </Step>

          <Step n="02" title="payment">
            <p className="text-xs text-foreground/60">
              card processing will be enabled once stripe is connected. for now, your order is recorded as <em>pending</em> and our team will follow up to arrange payment.
            </p>
            <div className="flex gap-2 mt-2">
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="promo code"
                className="flex-1 bg-card border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              <button onClick={applyPromo} className="border border-border px-4 text-xs uppercase tracking-wide hover:border-foreground">apply</button>
            </div>
          </Step>
        </div>

        <aside className="bg-card border border-border p-6 h-fit">
          <h3 className="text-[11px] tracking-[0.25em] uppercase">order summary</h3>
          <div className="num text-sm mt-6 space-y-2">
            <Row k="items" v={String(items.reduce((s, i) => s + i.qty, 0))} />
            <Row k="subtotal" v={formatMoney(subtotal, currency)} />
            {discount > 0 && <Row k="discount" v={`-${formatMoney(discount, currency)}`} />}
            <Row k="shipping" v={shipping ? formatMoney(shipping, currency) : "—"} />
            <Row k="tax" v={tax ? formatMoney(tax, currency) : "—"} />
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-medium">
              <span>total</span><span>{formatMoney(total, currency)}</span>
            </div>
          </div>
          <button onClick={placeOrder} disabled={busy} className="w-full mt-6 bg-primary text-primary-foreground py-3 text-xs tracking-[0.2em] uppercase disabled:opacity-50">
            {busy ? "placing…" : "place order"}
          </button>
        </aside>
      </div>
    </Shell>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-4 mb-5">
        <span className="num text-primary text-sm tracking-[0.2em]">{n}</span>
        <h2 className="text-xl font-light">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
function Field({ label, type = "text", value, onChange }: { label: string; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-wide text-foreground/60">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full bg-card border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
    </label>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between text-foreground/70"><span>{k}</span><span>{v}</span></div>;
}
