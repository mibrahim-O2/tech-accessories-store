<!--
  VoltEdge — README.md
  Project overview, folder structure and how to open the site.
  (GitHub Pages deploy steps are added in Phase 5.)
-->

# VoltEdge — Tech Accessories Store

**Smart tech, student-friendly prices.**

A front-end display of an online tech accessories store, built as a class
assignment. It is **not** a working store: there is no backend, checkout or
payment. It shows the store design, product catalog, business plan and keyword
research.

Built with plain **HTML, CSS and vanilla JavaScript** — no frameworks, no build step.

## Folder structure

```
tech-accessories-store/
├── index.html        Home page (hero, trust badges, featured products)
├── catalog.html      Product grid with prices and "Add to cart"
├── business.html     Business plan (marketing, imaging, margins, revenue)
├── keywords.html     Google Keyword Planner results
├── css/
│   └── style.css     Design system: colors, buttons, cards, header, footer
├── js/
│   ├── icons.js      All SVG icons (Lucide style) + icon(name, size) helper
│   ├── products.js   ALL product data, categories, price/margin helpers
│   ├── main.js       Logo, shared header/footer, mobile menu, cart + mini-cart
│   └── catalog.js    Catalog page: product cards, filter bar, add to cart
├── images/
│   ├── logo.svg      VoltEdge logo (mark + wordmark)
│   ├── favicon.svg   Browser-tab icon (logo mark only)
│   └── *.png         Product photos (earbuds, phone cover, charger, laptop stand)
└── README.md
```

Every page loads its scripts in this order:
`icons.js`, then `products.js`, then `main.js` (and `catalog.js` on the catalog page).

**Design rules:** no emoji (all icons are inline SVG from `js/icons.js`),
no blue, pink or purple, and every color comes from the variables in `css/style.css`.

## Products

| Product                        | Cost (PKR) | Price (PKR) | Margin |
|--------------------------------|-----------:|------------:|-------:|
| Wireless Earbuds               | Rs. 2,500  | Rs. 3,500   | ~29%   |
| Phone Cover (navy silicone)    | Rs. 520    | Rs. 800     | ~35%   |
| 20W Fast Charger + USB-C cable | Rs. 1,250  | Rs. 1,800   | ~31%   |
| Aluminum Laptop Stand          | Rs. 2,000  | Rs. 2,800   | ~29%   |

Costs are estimates. To change a price or cost, edit **only** `js/products.js`;
every page updates automatically.

## How to open

Double-click `index.html` to open it in any browser. No server or install needed.

## Color palette

| Token            | Hex       | Use                     |
|------------------|-----------|-------------------------|
| `--bg`           | `#FAF7F2` | Warm cream background   |
| `--surface`      | `#FFFFFF` | Cards, header, tables   |
| `--ink`          | `#1C1917` | Main text               |
| `--muted`        | `#78716C` | Secondary text          |
| `--primary`      | `#15803D` | Forest green brand      |
| `--primary-dark` | `#14532D` | Hover states            |
| `--accent`       | `#F59E0B` | Amber highlights        |
