import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PRODUCTS } from "@/lib/alps-data";

export type Currency = "CAD" | "HKD";

export type CartItem = {
  productId: string;
  name: string;
  color: string;
  size: string;
  qty: number;
  priceCAD: number;
  priceHKD: number;
};

type CartCtx = {
  items: CartItem[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  add: (item: CartItem) => void;
  remove: (idx: number) => void;
  updateQty: (idx: number, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "alps-cart-v1";
const CUR_KEY = "alps-currency";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCurrencyState] = useState<Currency>("HKD");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
      const c = localStorage.getItem(CUR_KEY) as Currency | null;
      if (c === "CAD" || c === "HKD") setCurrencyState(c);
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} }, [items]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try { localStorage.setItem(CUR_KEY, c); } catch {}
  };

  const add = (item: CartItem) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.productId === item.productId && x.color === item.color && x.size === item.size);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + item.qty };
        return copy;
      }
      return [...prev, item];
    });
  };
  const remove = (idx: number) => setItems((p) => p.filter((_, i) => i !== idx));
  const updateQty = (idx: number, qty: number) =>
    setItems((p) => p.map((it, i) => (i === idx ? { ...it, qty: Math.max(1, qty) } : it)));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * (currency === "CAD" ? i.priceCAD : i.priceHKD), 0);

  return (
    <Ctx.Provider value={{ items, currency, setCurrency, add, remove, updateQty, clear, count, subtotal }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
}

export function buildCartItem(productId: string, color: string, size: string, qty: number): CartItem | null {
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) return null;
  return { productId, name: p.name, color, size, qty, priceCAD: p.priceCAD, priceHKD: p.priceHKD };
}

export function formatMoney(amount: number, currency: Currency) {
  return `${currency} ${amount.toLocaleString("en", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
