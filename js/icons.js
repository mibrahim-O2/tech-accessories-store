/* =====================================================================
   VoltEdge — icons.js
   ---------------------------------------------------------------------
   Every icon used on the site, as inline SVG markup (no icon font, no
   CDN). Style follows Lucide/Feather: 24x24 viewBox, stroke-only,
   stroke="currentColor" so icons take the text color of their parent.

   Usage in JS:    icon("truck", 20)  -> "<svg ...>...</svg>"
   Usage in HTML:  <span data-icon="truck" data-size="22"></span>
                   (main.js swaps these placeholders for the SVG)
   ===================================================================== */


/* ---------------------------------------------------------------------
   ICON SHAPES
   Each value is only the inner shapes of the SVG; icon() adds the
   shared <svg> wrapper and stroke settings.
   --------------------------------------------------------------------- */
const icons = {
  /* Delivery van — "Free delivery" */
  truck:
    '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>' +
    '<path d="M15 18H9"/>' +
    '<path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>' +
    '<circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',

  /* Shield with a tick — "1-year warranty" */
  shield:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>' +
    '<path d="m9 12 2 2 4-4"/>',

  /* Wallet — "Cash on delivery" */
  wallet:
    '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>' +
    '<path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',

  /* Shopping cart — header cart button and "Add to cart" */
  cart:
    '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>' +
    '<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',

  /* Right arrow — "Shop now", "View" links */
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',

  /* Lightning bolt — "New semester essentials" label */
  zap:
    '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',

  /* Price tag — catalog heading, promo code */
  tag:
    '<path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z"/>' +
    '<circle cx="7.5" cy="7.5" r="1.5"/>',

  /* Three lines — mobile menu "open" button */
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',

  /* X — mobile menu "close" and mini-cart close */
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',

  /* Tick — "Added" button state */
  check: '<path d="M20 6 9 17l-5-5"/>',

  /* Plus / minus — mini-cart quantity buttons */
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',

  /* Bin — remove item from mini-cart */
  trash:
    '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>' +
    '<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',

  /* Sparkles — "Featured" section heading */
  sparkles:
    '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',

  /* Graduation cap — student discount */
  graduationCap:
    '<path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z"/>' +
    '<path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',

  /* Rising line chart — "Products worth" block, business plan */
  trendingUp: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',

  /* Briefcase — business plan page heading */
  briefcase:
    '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' +
    '<rect width="20" height="14" x="2" y="6" rx="2"/>',

  /* Magnifying glass — keyword planner page heading */
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',

  /* Four squares — "All" filter */
  grid:
    '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/>' +
    '<rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',

  /* Headphones — "Audio" category */
  headphones:
    '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',

  /* Phone — "Protection" category */
  smartphone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',

  /* Plug — "Charging" category */
  plug:
    '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/>' +
    '<path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',

  /* Megaphone — Meta Ads (business plan) */
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',

  /* Video camera — TikTok unboxing videos (business plan) */
  video:
    '<path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5"/>' +
    '<rect x="2" y="6" width="14" height="12" rx="2"/>',

  /* Camera — imaging plan heading */
  camera:
    '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>' +
    '<circle cx="12" cy="13" r="3"/>',

  /* Picture — white-background product shots */
  image:
    '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/>' +
    '<path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',

  /* Bar chart — expected revenue heading */
  barChart:
    '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',

  /* Two people — target audience (university students) */
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>' +
    '<path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',

  /* Circular arrows — repeat purchases */
  repeat:
    '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/>' +
    '<path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',

  /* Target — area of success heading */
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',

  /* Laptop — "Workspace" category */
  laptop:
    '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
};


/* ---------------------------------------------------------------------
   icon(name, size)
   Returns the full SVG string for one icon. Icons are decorative, so
   they are hidden from screen readers (the text next to them is read).
   --------------------------------------------------------------------- */
function icon(name, size) {
  const s = size || 20;
  const shapes = icons[name];
  if (!shapes) return ""; // unknown name: render nothing instead of breaking

  return (
    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="' + s +
    '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true" focusable="false">' + shapes + "</svg>"
  );
}
