import { CATEGORY_TAGS } from "@/lib/categorisation";

type Chip = { key: string; label: string };

/**
 * Season + demographic filter chips, used on every section. `extra` appends
 * section-specific chips (e.g. accessory types).
 */
export function TagFilterBar({
  active,
  onChange,
  extra = [],
  className = "",
}: {
  active: string;
  onChange: (key: string) => void;
  extra?: readonly Chip[];
  className?: string;
}) {
  const chips: Chip[] = [{ key: "all", label: "all" }, ...CATEGORY_TAGS, ...extra];
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {chips.map((t) => {
        const on = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            aria-pressed={on}
            className={
              "px-3 py-1 text-[11px] tracking-wide transition-colors border " +
              (on
                ? "bg-[oklch(0.35_0.14_18)] border-[oklch(0.35_0.14_18)] text-white"
                : "bg-primary border-primary text-primary-foreground hover:bg-[oklch(0.35_0.14_18)] hover:border-[oklch(0.35_0.14_18)]")
            }
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
