/* =====================================================================
   VoltEdge — products.js
   ---------------------------------------------------------------------
   The ONE place where product data lives. Every page (home, catalog,
   business plan) loads this file and reads the PRODUCTS array, so a
   price or cost only ever needs to be changed here.

   NOTE: costs are estimates for the assignment and will be replaced
   with confirmed supplier costs later.
   ===================================================================== */


/* ---------------------------------------------------------------------
   STORE INFO
   Shared store details used by the header, footer and page titles.
   --------------------------------------------------------------------- */
const STORE = {
  name: "VoltEdge",
  tagline: "Smart tech, student-friendly prices",
  currency: "PKR",
};


/* ---------------------------------------------------------------------
   PRODUCT LIST
   Fields:
     id          – short unique key (used for cart & links)
     name        – display name
     description – 1–2 sentence selling description
     price       – selling price in PKR
     cost        – estimated purchase cost in PKR
     image       – path inside /images
     alt         – alt text for the product image (accessibility)
     tag         – small label shown on the card
     category    – filter group (must match a key in CATEGORIES below)
   --------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "earbuds",
    name: "Wireless Earbuds",
    description:
      "Bluetooth 5.3 earbuds with clear calls, deep bass and up to 24 hours of playtime with the charging case. 1-year warranty, free delivery.",
    price: 3500,
    cost: 2500,
    image: "images/earbuds.png",
    alt: "Black wireless earbuds with one bud resting beside the open charging case",
    tag: "Best seller",
    category: "audio",
  },
  {
    id: "phone-cover",
    name: "Phone Cover (Navy Silicone)",
    description:
      "Soft-touch navy silicone cover with raised edges that protect your screen and camera from drops. Slim, grippy and easy to clean.",
    price: 800,
    cost: 520,
    image: "images/phone-cover.png",
    alt: "Navy silicone phone cover shown from the back",
    tag: "Budget pick",
    category: "protection",
  },
  {
    id: "charger-20w",
    name: "20W Fast Charger + USB-C Cable",
    description:
      "Fast charging 20W adapter with a durable USB-C cable — charges a phone to 50% in about 30 minutes. 1-year warranty, free delivery.",
    price: 1800,
    cost: 1250,
    image: "images/charger-20w.png",
    alt: "White 20W USB-C wall charger next to a coiled white braided USB-C cable",
    tag: "Fast charging",
    category: "charging",
  },
  {
    id: "laptop-stand",
    name: "Aluminum Laptop Stand",
    description:
      "Adjustable aluminum stand that lifts your laptop to eye level for better posture and cooling. Folds flat to fit in any backpack.",
    price: 2800,
    cost: 2000,
    image: "images/laptop-stand.png",
    alt: "Silver adjustable aluminum laptop stand holding an open laptop",
    tag: "Study setup",
    category: "workspace",
  },
];


/* ---------------------------------------------------------------------
   CATEGORIES
   Used by the catalog filter bar. "icon" is a name from js/icons.js.
   The order here is the order of the filter buttons.
   --------------------------------------------------------------------- */
const CATEGORIES = [
  { id: "all", label: "All", icon: "grid" },
  { id: "audio", label: "Audio", icon: "headphones" },
  { id: "protection", label: "Protection", icon: "smartphone" },
  { id: "charging", label: "Charging", icon: "plug" },
  { id: "workspace", label: "Workspace", icon: "laptop" },
];


/* ---------------------------------------------------------------------
   HELPER FUNCTIONS
   Small utilities shared by every page.
   --------------------------------------------------------------------- */

/**
 * Format a number as a PKR price string.
 * Example: formatPKR(1800) -> "Rs. 1,800"
 */
function formatPKR(amount) {
  return "Rs. " + Math.round(amount).toLocaleString("en-US");
}

/**
 * Profit per unit in PKR (price minus cost).
 * Example: profit(product with price 1800, cost 1250) -> 550
 */
function profit(product) {
  return product.price - product.cost;
}

/**
 * Profit margin as a whole-number percentage of the selling price.
 * Example: margin(price 1800, cost 1250) -> 31  (550 / 1800 = 30.6%)
 */
function margin(product) {
  return Math.round((profit(product) / product.price) * 100);
}

/**
 * Find one product by its id.
 * Example: getProduct("earbuds") -> the earbuds object (or undefined)
 */
function getProduct(id) {
  return PRODUCTS.find(function (p) {
    return p.id === id;
  });
}
