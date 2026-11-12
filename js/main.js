/* =====================================================================
   VoltEdge — main.js
   ---------------------------------------------------------------------
   Shared behaviour loaded on EVERY page (after products.js):
     1. Builds the shared header/nav and footer from one template, so
        all pages stay identical without copy-pasting HTML.
     2. Highlights the nav link for the current page.
     3. Mobile menu (hamburger) open/close.
     4. Simple cart counter stored in localStorage (no checkout —
        the "Add to cart" buttons are wired up in Phase 3).
   Each page only needs:
     <header id="site-header"></header> ... <footer id="site-footer"></footer>
   ===================================================================== */


/* ---------------------------------------------------------------------
   NAVIGATION LINKS
   One list drives both the header nav and the footer links.
   --------------------------------------------------------------------- */
const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "catalog.html", label: "Catalog" },
  { href: "business.html", label: "Business Plan" },
  { href: "keywords.html", label: "Keywords" },
];


/* ---------------------------------------------------------------------
   1a. HEADER TEMPLATE
   Logo, nav links, cart counter and mobile menu button.
   --------------------------------------------------------------------- */
function renderHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  // Build the <li> items for each nav link
  const links = NAV_LINKS.map(function (link) {
    return '<li><a href="' + link.href + '">' + link.label + "</a></li>";
  }).join("");

  header.className = "site-header";
  header.innerHTML =
    '<nav class="container nav" aria-label="Main navigation">' +
      '<a class="logo" href="index.html" aria-label="' + STORE.name + ' home">' +
        '<span class="logo-mark" aria-hidden="true">⚡</span>' +
        '<span class="logo-text">Volt<span>Edge</span></span>' +
      "</a>" +
      '<ul class="nav-links" id="nav-links">' + links + "</ul>" +
      '<div class="nav-actions">' +
        '<a class="cart-btn" href="catalog.html" aria-label="Cart items">' +
          '<span aria-hidden="true">🛒</span>' +
          '<span class="cart-label">Cart</span>' +
          '<span class="cart-count" id="cart-count">0</span>' +
        "</a>" +
        '<button class="menu-toggle" id="menu-toggle" type="button" ' +
          'aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">☰</button>' +
      "</div>" +
    "</nav>";
}


/* ---------------------------------------------------------------------
   1b. FOOTER TEMPLATE
   Brand blurb, page links, store promises and copyright line.
   --------------------------------------------------------------------- */
function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const links = NAV_LINKS.map(function (link) {
    return '<li><a href="' + link.href + '">' + link.label + "</a></li>";
  }).join("");

  const year = new Date().getFullYear();

  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +
        "<div>" +
          '<a class="logo" href="index.html">' +
            '<span class="logo-mark" aria-hidden="true">⚡</span>' +
            "<span>" + STORE.name + "</span>" +
          "</a>" +
          '<p class="footer-tagline">' + STORE.tagline +
            ". Quality accessories for students across Pakistan.</p>" +
        "</div>" +
        "<div>" +
          "<h4>Pages</h4>" +
          "<ul>" + links + "</ul>" +
        "</div>" +
        "<div>" +
          "<h4>Our promise</h4>" +
          "<ul>" +
            "<li>🚚 Free delivery</li>" +
            "<li>🛡️ 1-year warranty</li>" +
            "<li>💵 Cash on delivery</li>" +
          "</ul>" +
        "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
        "<span>© " + year + " " + STORE.name + ". All prices in PKR.</span>" +
        "<span>Class assignment — front-end display only, not a live store.</span>" +
      "</div>" +
    "</div>";
}


/* ---------------------------------------------------------------------
   2. ACTIVE NAV LINK
   Compares each link with the current file name and marks the match.
   --------------------------------------------------------------------- */
function highlightActiveLink() {
  // e.g. ".../catalog.html" -> "catalog.html"; empty path -> index.html
  const current = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === current) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
}


/* ---------------------------------------------------------------------
   3. MOBILE MENU
   Hamburger button shows/hides the nav links on small screens.
   --------------------------------------------------------------------- */
function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });
}


/* ---------------------------------------------------------------------
   4. CART COUNTER
   Stores only a number in localStorage so the count survives page
   changes. try/catch keeps the site working if storage is blocked.
   --------------------------------------------------------------------- */
const CART_KEY = "voltedge-cart-count";

/** Read the saved cart count (0 if nothing saved). */
function getCartCount() {
  try {
    return parseInt(localStorage.getItem(CART_KEY), 10) || 0;
  } catch (e) {
    return 0;
  }
}

/** Save a new cart count and refresh the header bubble. */
function setCartCount(count) {
  try {
    localStorage.setItem(CART_KEY, String(count));
  } catch (e) {
    /* storage unavailable — counter still updates for this page */
  }
  updateCartBadge(count);
}

/** Add one item to the cart (called by "Add to cart" buttons). */
function addToCart() {
  setCartCount(getCartCount() + 1);
}

/** Write the count into the header and play a small bump animation. */
function updateCartBadge(count) {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  badge.textContent = count;
  badge.classList.remove("bump");
  void badge.offsetWidth; // restart the CSS animation
  badge.classList.add("bump");
}


/* ---------------------------------------------------------------------
   START-UP
   Runs once the page HTML has loaded.
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  renderHeader();
  renderFooter();
  highlightActiveLink();
  setupMobileMenu();

  // Show the saved cart count without the bump animation
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = getCartCount();
});
