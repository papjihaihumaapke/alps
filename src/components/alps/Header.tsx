"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Globe, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import logoBlack from "@/assets/brand/alps-logo-black.png";

const NAV = [
  { to: "/innovation", label: "alps innovation" },
  { to: "/contemporary", label: "alps contemporary" },
  { to: "/accessories", label: "alps accessories" },
  { to: "/collaborations", label: "alps collaborations" },
  { to: "/personal-care", label: "alps vegan skin & personal care" },
  { to: "/my-journey", label: "my journey" },
  { to: "/press", label: "press" },
  { to: "/contact", label: "contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, currency, setCurrency } = useCart();
  const { isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="mx-auto flex h-16 items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" aria-label="ALPS home" className="flex items-center gap-3 shrink-0">
          <img src={logoBlack} alt="ALPS Annie Ling" className="h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6 text-[12px] tracking-wide">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-red text-foreground/80 hover:text-foreground"
              activeProps={{ className: "link-red text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right icons + mobile menu */}
        <div className="flex items-center gap-4 text-foreground">
          <button aria-label="search" className="hover:text-primary transition-colors">
            <Search className="h-4 w-4" />
          </button>

          <Link to="/account" aria-label="account" className="hover:text-primary transition-colors hidden sm:block">
            <User className="h-4 w-4" />
          </Link>

          <button
            aria-label="currency"
            onClick={() => setCurrency(currency === "HKD" ? "CAD" : "HKD")}
            className="hidden md:flex items-center gap-1 text-[11px] hover:text-primary transition-colors num"
          >
            <Globe className="h-4 w-4" /> {currency}
          </button>

          {isAdmin && (
            <Link to="/admin" className="hidden lg:inline text-[11px] link-red">admin</Link>
          )}

          <Link to="/cart" aria-label="cart" className="relative hover:text-primary transition-colors">
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="num absolute -top-2 -right-3 text-[10px] bg-primary text-primary-foreground px-1">{count}</span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="open menu"
                className="xl:hidden hover:text-primary transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[420px] bg-background border-l border-border p-0">
              <div className="flex flex-col h-full">
                {/* Mobile nav header */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                  <span className="text-[12px] tracking-wide text-muted-foreground">menu</span>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="close menu"
                    className="hover:text-primary transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile nav links */}
                <nav className="flex flex-col px-6 py-8 gap-1">
                  {NAV.map((n) => (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="text-[14px] tracking-wide py-3 border-b border-border text-foreground/80 hover:text-foreground hover:pl-2 transition-all"
                      activeProps={{ className: "text-[14px] tracking-wide py-3 border-b border-border text-foreground pl-2" }}
                    >
                      {n.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile nav footer */}
                <div className="mt-auto px-6 py-6 border-t border-border">
                  <div className="flex items-center gap-6 text-[12px] text-muted-foreground">
                    <Link to="/account" onClick={() => setOpen(false)} className="hover:text-foreground transition-colors">
                      account
                    </Link>
                    <span className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
                      <Globe className="h-3 w-3" /> eng / 中文
                    </span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
