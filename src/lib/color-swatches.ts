// Color swatch dot images. Keyed by color/colorway name (lower-case, hyphen-separated).
// Falls back to a flat CSS color in PRODUCT_COLORS when no image is available.

import almond from "@/assets/swatches/almond.png";
import black from "@/assets/swatches/black.png";
import copper from "@/assets/swatches/copper.png";
import fuchsia from "@/assets/swatches/fuchsia.png";
import khaki from "@/assets/swatches/khaki.png";
import lime from "@/assets/swatches/lime.png";
import navy from "@/assets/swatches/navy.png";
import pink from "@/assets/swatches/pink.png";
import red from "@/assets/swatches/red.png";
import titanium from "@/assets/swatches/titanium.png";
import white from "@/assets/swatches/white.png";
import wine from "@/assets/swatches/wine.png";
import yellow from "@/assets/swatches/yellow.png";

import blackCopper from "@/assets/swatches/black-copper.png";
import blackFuchsia from "@/assets/swatches/black-fuchsia.png";
import blackRed from "@/assets/swatches/black-red.png";
import blackTitanium from "@/assets/swatches/black-titanium.png";
import ivoryBlack from "@/assets/swatches/ivory-black.png";
import ivoryFuchsia from "@/assets/swatches/ivory-fuchsia.png";
import ivoryNavy from "@/assets/swatches/ivory-navy.png";
import navyFuchsia from "@/assets/swatches/navy-fuchsia.png";
import navyTitanium from "@/assets/swatches/navy-titanium.png";
import checkRedBlack from "@/assets/swatches/check-red-black.png";

import printLeave from "@/assets/swatches/print-leave.png";
import printCheckBlack from "@/assets/swatches/print-check-black.png";
import printCheckNavy from "@/assets/swatches/print-check-navy.png";
import printCheckRed from "@/assets/swatches/print-check-red.png";
import printTiger from "@/assets/swatches/print-tiger.png";
import printWaveNavy from "@/assets/swatches/print-wave-navy.png";
import printWaveRed from "@/assets/swatches/print-wave-red.png";
import printHoundstoothBlack from "@/assets/swatches/print-houndstooth-black.png";
import printHoundstoothCamel from "@/assets/swatches/print-houndstooth-camel.png";
import printFlowerBlack from "@/assets/swatches/print-flower-black.png";
import printFlowerGrey from "@/assets/swatches/print-flower-grey.png";
import printBauhiniaKhaki from "@/assets/swatches/print-bauhinia-khaki.png";
import printLeopardRed from "@/assets/swatches/print-leopard-red.png";
import printLeopardNavy from "@/assets/swatches/print-leopard-navy.png";
import printLeopardBlack from "@/assets/swatches/print-leopard-black.png";

import lpRedNavy from "@/assets/swatches/lp-red-navy.png";
import lpRoseDay from "@/assets/swatches/lp-rose-day.png";
import lpStarDay from "@/assets/swatches/lp-star-day.png";
import lpRoseNight from "@/assets/swatches/lp-rose-night.png";
import lpStarNight from "@/assets/swatches/lp-star-night.png";
import lpStarBadge from "@/assets/swatches/lp-star-badge.png";
import lpRedBadge from "@/assets/swatches/lp-red-badge.png";

export const COLOR_SWATCHES: Record<string, string> = {
  // solid
  almond, black, copper, fuchsia, khaki, lime, navy, pink, red, titanium, white, wine, yellow,
  ivory: white,
  brown: copper,
  // bi-color (hyphenated keys, both orderings)
  "black-copper": blackCopper, "copper-black": blackCopper,
  "black-fuchsia": blackFuchsia, "fuchsia-black": blackFuchsia,
  "black-red": blackRed, "red-black": blackRed,
  "black-titanium": blackTitanium, "titanium-black": blackTitanium,
  "ivory-black": ivoryBlack, "black-ivory": ivoryBlack, "black-white": ivoryBlack, "white-black": ivoryBlack,
  "ivory-fuchsia": ivoryFuchsia, "fuchsia-ivory": ivoryFuchsia, "white-fuchsia": ivoryFuchsia, "fuchsia-white": ivoryFuchsia,
  "ivory-navy": ivoryNavy, "navy-ivory": ivoryNavy, "white-navy": ivoryNavy, "navy-white": ivoryNavy,
  "navy-fuchsia": navyFuchsia, "fuchsia-navy": navyFuchsia,
  "navy-titanium": navyTitanium, "titanium-navy": navyTitanium,
  "check-red-black": checkRedBlack,
  // prints
  "leave-print": printLeave,
  "check-black": printCheckBlack,
  "check-navy": printCheckNavy,
  "check-red": printCheckRed,
  "tiger-print": printTiger,
  "wave-navy": printWaveNavy,
  "wave-red": printWaveRed,
  "houndstooth-black": printHoundstoothBlack,
  "houndstooth-camel": printHoundstoothCamel,
  "flower-black": printFlowerBlack,
  "flower-grey": printFlowerGrey,
  "bauhinia-khaki": printBauhiniaKhaki,
  "leopard-red": printLeopardRed,
  "leopard-navy": printLeopardNavy,
  "leopard-black": printLeopardBlack,
  // little prince
  "lp-red-navy": lpRedNavy,
  "lp-rose-day": lpRoseDay,
  "lp-star-day": lpStarDay,
  "lp-rose-night": lpRoseNight,
  "lp-star-night": lpStarNight,
  "lp-star-badge": lpStarBadge,
  "lp-red-badge": lpRedBadge,
};

/** Returns swatch image URL for a color name (case-insensitive). */
export function colorSwatch(color: string): string | undefined {
  return COLOR_SWATCHES[color.toLowerCase().trim()];
}
