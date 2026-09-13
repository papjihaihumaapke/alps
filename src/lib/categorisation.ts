/**
 * Season + demographic categorisation shared by every section of the site
 * (category pages, recognitions, design path) and by the admin editors.
 */
export const SEASON_TAGS = [
  { key: "all-season", label: "all season" },
  { key: "spring", label: "spring" },
  { key: "summer", label: "summer" },
  { key: "fall-winter", label: "fall/ winter" },
] as const;

export const DEMOGRAPHIC_TAGS = [
  { key: "women", label: "women" },
  { key: "unisex", label: "unisex" },
  { key: "kids", label: "kids" },
] as const;

export const CATEGORY_TAGS = [...SEASON_TAGS, ...DEMOGRAPHIC_TAGS];

export type SeasonTag = (typeof SEASON_TAGS)[number]["key"];
export type DemographicTag = (typeof DEMOGRAPHIC_TAGS)[number]["key"];
export type CategoryTag = SeasonTag | DemographicTag;

const SEASONS = new Set<string>(SEASON_TAGS.map((t) => t.key));

/**
 * Whether an item's tags satisfy the active filter. "all season" items also
 * show under spring, summer and fall/winter.
 */
export function matchesTag(tags: readonly string[] | null | undefined, active: string): boolean {
  if (active === "all") return true;
  const list = tags ?? [];
  if (list.includes(active)) return true;
  return SEASONS.has(active) && active !== "all-season" && list.includes("all-season");
}
