import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/alps/Shell";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "account — ALPS Annie Ling" }, { name: "description", content: "Sign in to your ALPS account." }] }),
  component: Account,
});

function Account() {
  const { user, loading, signOut } = useAuth();
  if (loading) return <Shell><div className="max-w-md mx-auto py-32 text-center text-sm text-foreground/60">loading…</div></Shell>;
  if (user) return <Shell><Dashboard /></Shell>;
  return <Shell><AuthForms /></Shell>;
}

function AuthForms() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [news, setNews] = useState(true);
  const [busy, setBusy] = useState(false);
  const { signIn, signUp, signInGoogle } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = mode === "signin"
      ? await signIn(email, password)
      : await signUp(email, password, { full_name: name, mobile, newsletter_opt_in: news });
    setBusy(false);
    if (res.error) toast.error(res.error);
    else {
      toast.success(mode === "signin" ? "welcome back" : "check your email to confirm");
      if (mode === "signin") navigate({ to: "/account" });
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-20">
      <span className="num text-[11px] tracking-[0.3em] text-primary">members</span>
      <h1 className="text-3xl font-light mt-3">{mode === "signin" ? "sign in" : "create account"}</h1>

      <button
        onClick={async () => { const r = await signInGoogle(); if (r.error) toast.error(r.error); }}
        className="w-full mt-8 border border-border py-3 text-xs tracking-[0.2em] uppercase hover:border-foreground"
      >
        continue with google
      </button>
      <div className="my-6 flex items-center gap-3 text-[10px] tracking-wide text-foreground/40">
        <div className="flex-1 h-px bg-border" /> or <div className="flex-1 h-px bg-border" />
      </div>

      <form className="space-y-4" onSubmit={submit}>
        {mode === "signup" && (
          <>
            <Field label="full name" value={name} onChange={setName} required />
            <Field label="mobile" value={mobile} onChange={setMobile} />
          </>
        )}
        <Field label="email" type="email" value={email} onChange={setEmail} required />
        <Field label="password" type="password" value={password} onChange={setPassword} required />
        {mode === "signup" && (
          <label className="flex items-center gap-2 text-xs text-foreground/70">
            <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} className="accent-primary" />
            subscribe to alps newsletter
          </label>
        )}
        <button disabled={busy} className="w-full bg-primary text-primary-foreground py-3 text-xs tracking-[0.2em] uppercase disabled:opacity-50">
          {busy ? "…" : mode === "signin" ? "sign in" : "create account"}
        </button>
      </form>
      <p className="text-xs text-foreground/60 mt-6">
        {mode === "signin" ? "new to alps? " : "already have an account? "}
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="link-red">
          {mode === "signin" ? "create an account" : "sign in"}
        </button>
      </p>
    </section>
  );
}

function Dashboard() {
  const { user, signOut, isAdmin } = useAuth();
  const { data: orders } = useQuery({
    queryKey: ["my-orders", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <span className="num text-[11px] tracking-[0.3em] text-primary">my account</span>
          <h1 className="text-3xl font-light mt-2">{user?.email}</h1>
        </div>
        <div className="flex gap-3">
          {isAdmin && <Link to="/admin" className="text-xs uppercase tracking-[0.2em] border border-border px-4 py-2 hover:border-foreground">admin</Link>}
          <button onClick={signOut} className="text-xs uppercase tracking-[0.2em] border border-border px-4 py-2 hover:border-foreground">sign out</button>
        </div>
      </div>

      <h2 className="text-[11px] tracking-[0.25em] uppercase mt-12 mb-4 text-foreground/60">order history</h2>
      {(!orders || orders.length === 0) ? (
        <p className="text-sm text-foreground/60">no orders yet.</p>
      ) : (
        <div className="border border-border divide-y divide-border">
          {orders.map((o) => (
            <div key={o.id} className="px-4 py-3 text-sm flex justify-between flex-wrap gap-2">
              <div>
                <div className="num">{o.order_number}</div>
                <div className="text-xs text-foreground/60">{new Date(o.created_at).toLocaleDateString()}</div>
              </div>
              <div className="text-right">
                <div className="num">{o.currency} {Number(o.total).toLocaleString()}</div>
                <div className="text-xs text-foreground/60 uppercase tracking-wide">{o.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Field({ label, type = "text", value, onChange, required }: { label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-wide text-foreground/60">{label}</span>
      <input
        type={type} value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-card border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
      />
    </label>
  );
}
