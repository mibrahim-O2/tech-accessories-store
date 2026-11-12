<!--
  VoltEdge — README.md
  Project overview, where each assignment item is, folder structure,
  how to update the data, how to open the site and how to publish it
  on GitHub Pages.
-->

# VoltEdge — Tech Accessories Store

**Smart tech, student-friendly prices.**

A front-end display of an online tech accessories store, built as a class
assignment. It is **not** a working store: there is no backend, checkout or
payment. It shows the store design, product catalog, business plan and keyword
research.

Built with plain **HTML, CSS and vanilla JavaScript**: no frameworks, no build step.

## Where each assignment item is

| Assignment item              | Page            | Section                                   |
|------------------------------|-----------------|-------------------------------------------|
| Store home page              | `index.html`    | Hero, trust badges, featured products     |
| Product catalog (PKR prices) | `catalog.html`  | Product grid, filter bar, cart counter    |
| Products worth               | `catalog.html`  | "Products worth" block on every card      |
|                              | `business.html` | 03 Products worth (table)                 |
| Marketing strategy           | `business.html` | 01 Marketing strategy                     |
| Imaging plan                 | `business.html` | 02 Imaging plan                           |
| Expected revenue             | `business.html` | 04 Expected revenue (CSS bar chart)       |
| Area of success              | `business.html` | 05 Area of success                        |
| Keyword planner              | `keywords.html` | Results table + audience interest summary |

## Folder structure

```
tech-accessories-store/
├── index.html        Home page (hero, trust badges, featured products, student offer)
├── catalog.html      Product grid with prices, "Products worth" and "Add to cart"
├── business.html     Business plan (marketing, imaging, margins, revenue, success)
├── keywords.html     Google Keyword Planner results + audience interest summary
├── css/
│   └── style.css     The whole design system and every page's styles
├── js/
│   ├── icons.js      All SVG icons (Lucide style) + icon(name, size) helper
│   ├── products.js   ALL product data, categories, price/margin helpers
│   ├── main.js       Logo, shared header/footer, mobile menu, cart + mini-cart
│   ├── catalog.js    Catalog page: product cards, filter bar, add to cart
│   ├── business.js   Business plan: margins table, revenue figures, bar chart
│   └── keywords.js   Keyword planner data and table
├── images/
│   ├── logo.svg      VoltEdge logo (mark + wordmark)
│   ├── favicon.svg   Browser-tab icon (logo mark only)
│   └── *.png         Product photos (earbuds, phone cover, charger, laptop stand)
└── README.md
```

Every page loads `icons.js`, then `products.js`, then `main.js`, plus its own
page script (`catalog.js`, `business.js` or `keywords.js`) where it has one.

**Design rules:** no emoji (all icons are inline SVG from `js/icons.js`), no
blue, pink or purple, and every color comes from the variables in `css/style.css`.

## Products

| Product                        | Cost (PKR) | Price (PKR) | Margin |
|--------------------------------|-----------:|------------:|-------:|
| Wireless Earbuds               | Rs. 2,500  | Rs. 3,500   | ~29%   |
| Phone Cover (navy silicone)    | Rs. 520    | Rs. 800     | ~35%   |
| 20W Fast Charger + USB-C cable | Rs. 1,250  | Rs. 1,800   | ~31%   |
| Aluminum Laptop Stand          | Rs. 2,000  | Rs. 2,800   | ~29%   |

## How to update the data

| To change...                     | Edit this file   | What updates automatically                     |
|----------------------------------|------------------|------------------------------------------------|
| A product's price or cost        | `js/products.js` | Home, catalog cards, margins table, revenue    |
| Orders per month / average order | `js/business.js` | All revenue figures and the bar chart          |
|   (`REVENUE_PLAN` at the top)    |                  |                                                |
| Keyword Planner results          | `js/keywords.js` | Keyword table; set `sample: false` on each row |
|                                  |                  | and the "Replace with my real data" labels go  |

The keyword numbers currently in `js/keywords.js` are **samples** and are
labelled on the page as "Replace with my real data".

## How to open

Double-click `index.html` to open it in any modern browser (Chrome, Edge,
Firefox). No server or install is needed. An internet connection only loads the
Inter font; without it the site falls back to the system font.

## How to publish on GitHub Pages

1. Create a new **public** repository on [github.com](https://github.com/new),
   for example `voltedge-store`. Do not add a README there (this project has one).
2. In this folder, connect the repository and push:

   ```bash
   git add .
   git commit -m "VoltEdge store"
   git branch -M main
   git remote add origin https://github.com/<your-username>/voltedge-store.git
   git push -u origin main
   ```

3. On GitHub, open the repository, then **Settings**, then **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**,
   choose branch **main** and folder **/ (root)**, then **Save**.
5. Wait one or two minutes and refresh the page. The site address appears at
   the top, for example `https://<your-username>.github.io/voltedge-store/`.

To update the live site later, commit and push again; GitHub Pages republishes
automatically. File names are case-sensitive on GitHub Pages, so keep them
lowercase as they are now.

## Color palette

| Token            | Hex       | Use                          |
|------------------|-----------|------------------------------|
| `--bg`           | `#FAF7F2` | Warm cream background        |
| `--surface`      | `#FFFFFF` | Cards, header, tables        |
| `--ink`          | `#1C1917` | Main text                    |
| `--muted`        | `#78716C` | Secondary text               |
| `--primary`      | `#15803D` | Forest green brand           |
| `--primary-dark` | `#14532D` | Hover states, footer, banner |
| `--accent`       | `#F59E0B` | Amber highlights, focus ring |
