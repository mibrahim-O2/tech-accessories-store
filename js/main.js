/* =====================================================================
   VoltEdge — main.js
   ---------------------------------------------------------------------
   Shared behaviour loaded on EVERY page.
   Load order on each page: icons.js -> products.js -> main.js
   What it does:
     1. Draws the VoltEdge logo (inline SVG, dark and light versions)
     2. Builds the shared header/nav and footer from one template
     3. Highlights the current page in the nav
     4. Mobile menu open/close
     5. Cart: stores items in localStorage so the count survives page
        changes, plus a mini-cart dropdown with a PKR total
        (display only, no checkout)
     6. Featured products strip on the home page
     7. Swaps <span data-icon="..."> placeholders for SVG icons
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
   1. LOGO
   Same artwork as images/logo.svg, drawn inline so it stays sharp and
   uses the page's Inter font.
     "dark"  (header): green mark, charcoal "Volt", green "Edge"
     "light" (footer): cream mark with green bolt, cream wordmark
   --------------------------------------------------------------------- */
function logoSVG(variant) {
  const light = variant === "light";
  const markBg = light ? "#FAF7F2" : "#15803D";   // rounded square
  const bolt = light ? "#15803D" : "#FAF7F2";     // lightning bolt
  const volt = light ? "#FAF7F2" : "#1C1917";     // "Volt"
  const edge = light ? "#FAF7F2" : "#15803D";     // "Edge"
  const edgeOpacity = light ? "0.75" : "1";       // two-tone on dark bg

  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 40" ' +
      'role="img" aria-label="' + STORE.name + '">' +
      '<rect width="40" height="40" rx="10" fill="' + markBg + '"/>' +
      '<path d="M23 6.5 11.5 22.5H19.5L17 33.5 28.5 17.5H20.5Z" fill="' + bolt + '"/>' +
      '<circle cx="31" cy="31" r="2.75" fill="#F59E0B"/>' +
      '<text x="50" y="28" font-family="Inter, system-ui, sans-serif" ' +
        'font-size="23" font-weight="700" letter-spacing="-0.6">' +
        '<tspan fill="' + volt + '">Volt</tspan>' +
        '<tspan fill="' + edge + '" fill-opacity="' + edgeOpacity + '">Edge</tspan>' +
      "</text>" +
    "</svg>"
  );
}


/* ---------------------------------------------------------------------
   2a. HEADER TEMPLATE
   Logo left, nav links, cart button (with amber count badge and
   mini-cart dropdown) and the mobile menu button on the right.
   --------------------------------------------------------------------- */
function renderHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const links = NAV_LINKS.map(function (link) {
    return '<li><a href="' + link.href + '">' + link.label + "</a></li>";
  }).join("");

  header.className = "site-header";
  header.innerHTML =
    '<nav class="container nav" aria-label="Main navigation">' +
      '<a class="logo" href="index.html" aria-label="' + STORE.name + ' home">' +
        logoSVG("dark") +
      "</a>" +
      '<ul class="nav-links" id="nav-links">' + links + "</ul>" +
      '<div class="nav-actions">' +
        '<button class="icon-btn cart-btn" id="cart-btn" type="button" ' +
          'aria-label="Open cart" aria-expanded="false" aria-controls="mini-cart">' +
          icon("cart", 20) +
          '<span class="cart-count" id="cart-count" data-count="0">0</span>' +
        "</button>" +
        '<button class="icon-btn menu-toggle" id="menu-toggle" type="button" ' +
          'aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">' +
          icon("menu", 20) +
        "</button>" +
      "</div>" +
      // Mini-cart panel (contents filled by renderMiniCart)
      '<div class="mini-cart" id="mini-cart" role="dialog" aria-label="Your cart" hidden></div>' +
    "</nav>";
}


/* ---------------------------------------------------------------------
   2b. FOOTER TEMPLATE
   Light logo + tagline, page links, store promises, copyright.
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
          '<a class="logo" href="index.html" aria-label="' + STORE.name + ' home">' +
            logoSVG("light") +
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
          '<ul class="footer-promise">' +
            "<li>" + icon("truck", 18) + "Free delivery</li>" +
            "<li>" + icon("shield", 18) + "1-year warranty</li>" +
            "<li>" + icon("wallet", 18) + "Cash on delivery</li>" +
          "</ul>" +
        "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
        "<span>&copy; " + year + " " + STORE.name + ". All prices in PKR.</span>" +
        "<span>Class assignment: front-end display only, not a live store.</span>" +
      "</div>" +
    "</div>";
}


/* ---------------------------------------------------------------------
   3. ACTIVE NAV LINK
   Marks the link whose file name matches the current page.
   --------------------------------------------------------------------- */
function highlightActiveLink() {
  // ".../catalog.html" -> "catalog.html"; a bare folder URL -> index.html
  const current = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === current) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
}


/* ---------------------------------------------------------------------
   4. MOBILE MENU
   The menu button shows/hides the nav links on small screens and swaps
   its icon between "menu" and "close".
   --------------------------------------------------------------------- */
function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    toggle.innerHTML = icon(isOpen ? "close" : "menu", 20);
    if (isOpen) closeMiniCart();
  });
}

/** Close the mobile menu (used when the mini-cart opens). */
function closeMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links || !links.classList.contains("open")) return;
  links.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
  toggle.innerHTML = icon("menu", 20);
}


/* ---------------------------------------------------------------------
   5. CART
   The cart is an object of { productId: quantity } saved in
   localStorage, e.g. { "earbuds": 2, "charger-20w": 1 }.
   try/catch keeps the site working if storage is blocked.
   --------------------------------------------------------------------- */
const CART_KEY = "voltedge-cart";

/** Read the saved cart (empty object if nothing saved). */
function getCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    return saved && typeof saved === "object" ? saved : {};
  } catch (e) {
    return {};
  }
}

/** Save the cart, then refresh the badge and mini-cart. */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    /* storage unavailable: the page still updates until reload */
  }
  updateCartBadge(true);
  renderMiniCart(cart);
}

/** Total number of items (sum of all quantities). */
function getCartCount(cart) {
  const c = cart || getCart();
  return Object.keys(c).reduce(function (sum, id) {
    return sum + c[id];
  }, 0);
}

/** Total price of the cart in PKR. Skips ids no longer in PRODUCTS. */
function getCartTotal(cart) {
  return Object.keys(cart).reduce(function (sum, id) {
    const p = getProduct(id);
    return p ? sum + p.price * cart[id] : sum;
  }, 0);
}

/** Add one of a product (called by the catalog "Add to cart" buttons). */
function addToCart(id) {
  if (!getProduct(id)) return;
  const cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
}

/** Change a quantity by +1 / -1; removes the item at 0. */
function changeQty(id, delta) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart(cart);
}

/** Remove a product from the cart completely. */
function removeFromCart(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
}

/** Empty the cart. */
function clearCart() {
  saveCart({});
}

/**
 * Write the item count into the amber badge.
 * animate = true plays a short "bump" (used when the cart changes).
 */
function updateCartBadge(animate) {
  const badge = document.getElementById("cart-count");
  const btn = document.getElementById("cart-btn");
  if (!badge) return;

  const count = getCartCount();
  badge.textContent = count;
  badge.setAttribute("data-count", count);
  if (btn) btn.setAttribute("aria-label", "Open cart, " + count + " item" + (count === 1 ? "" : "s"));

  if (animate) {
    badge.classList.remove("bump");
    void badge.offsetWidth; // restart the CSS animation
    badge.classList.add("bump");
  }
}


/* ---------------------------------------------------------------------
   5b. MINI-CART DROPDOWN
   Lists cart items with quantity steppers, a remove button and the PKR
   total. Buttons use data-action so one click listener handles them.
   --------------------------------------------------------------------- */
function renderMiniCart(cart) {
  const panel = document.getElementById("mini-cart");
  if (!panel) return;
  const c = cart || getCart();
  const ids = Object.keys(c).filter(getProduct);

  // Heading row with close button
  let html =
    '<div class="mini-cart-head">' +
      "<h2>Your cart (" + getCartCount(c) + ")</h2>" +
      '<button class="icon-btn" type="button" data-action="close" aria-label="Close cart">' +
        icon("close", 18) +
      "</button>" +
    "</div>";

  // Empty state
  if (ids.length === 0) {
    html +=
      '<div class="mini-cart-empty">' +
        '<span class="icon-circle">' + icon("cart", 22) + "</span>" +
        "<p>Your cart is empty.</p>" +
        '<a class="btn btn-primary" href="catalog.html">Browse catalog ' + icon("arrowRight", 18) + "</a>" +
      "</div>";
    panel.innerHTML = html;
    return;
  }

  // One row per product
  html += '<ul class="mini-cart-items">';
  ids.forEach(function (id) {
    const p = getProduct(id);
    const qty = c[id];
    html +=
      '<li class="mini-cart-item">' +
        '<img src="' + p.image + '" alt="' + p.alt + '" width="56" height="56" />' +
        "<div>" +
          '<div class="mini-cart-name">' + p.name + "</div>" +
          '<div class="qty">' +
            '<button type="button" data-action="dec" data-id="' + id + '" aria-label="One less ' + p.name + '">' + icon("minus", 14) + "</button>" +
            "<span>" + qty + "</span>" +
            '<button type="button" data-action="inc" data-id="' + id + '" aria-label="One more ' + p.name + '">' + icon("plus", 14) + "</button>" +
          "</div>" +
        "</div>" +
        "<div>" +
          '<div class="mini-cart-line">' + formatPKR(p.price * qty) + "</div>" +
          '<button class="remove-btn" type="button" data-action="remove" data-id="' + id + '" aria-label="Remove ' + p.name + '">' + icon("trash", 16) + "</button>" +
        "</div>" +
      "</li>";
  });
  html += "</ul>";

  // Total and actions
  html +=
    '<div class="mini-cart-foot">' +
      '<div class="mini-cart-total"><span>Total</span><span class="price">' + formatPKR(getCartTotal(c)) + "</span></div>" +
      '<div class="mini-cart-actions">' +
        '<button class="btn btn-outline" type="button" data-action="clear">Clear</button>' +
        '<a class="btn btn-primary" href="catalog.html">Keep shopping</a>' +
      "</div>" +
      '<p class="mini-cart-note">Display only: checkout is not part of this assignment.</p>' +
    "</div>";

  panel.innerHTML = html;
}

/** Open the mini-cart panel. */
function openMiniCart() {
  const panel = document.getElementById("mini-cart");
  const btn = document.getElementById("cart-btn");
  if (!panel) return;
  closeMobileMenu();
  renderMiniCart();
  panel.hidden = false;
  btn.setAttribute("aria-expanded", "true");
}

/** Close the mini-cart panel. */
function closeMiniCart() {
  const panel = document.getElementById("mini-cart");
  const btn = document.getElementById("cart-btn");
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  btn.setAttribute("aria-expanded", "false");
}

/** Wire up the cart button, panel buttons, outside click and Esc. */
function setupMiniCart() {
  const btn = document.getElementById("cart-btn");
  const panel = document.getElementById("mini-cart");
  if (!btn || !panel) return;

  // Cart icon toggles the panel
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (panel.hidden) openMiniCart();
    else closeMiniCart();
  });

  // Buttons inside the panel (one listener for all of them)
  panel.addEventListener("click", function (e) {
    e.stopPropagation();
    const target = e.target.closest("[data-action]");
    if (!target) return;
    const id = target.getAttribute("data-id");

    switch (target.getAttribute("data-action")) {
      case "inc": changeQty(id, 1); break;
      case "dec": changeQty(id, -1); break;
      case "remove": removeFromCart(id); break;
      case "clear": clearCart(); break;
      case "close": closeMiniCart(); btn.focus(); break;
    }
  });

  // Click anywhere else closes it
  document.addEventListener("click", closeMiniCart);

  // Esc closes it and returns focus to the cart button
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) {
      closeMiniCart();
      btn.focus();
    }
  });
}


/* ---------------------------------------------------------------------
   6. FEATURED PRODUCTS STRIP (home page)
   Builds a compact card for every product inside
   <div id="featured-products">. Does nothing on other pages.
   --------------------------------------------------------------------- */
function renderFeatured() {
  const strip = document.getElementById("featured-products");
  if (!strip) return;

  strip.innerHTML = PRODUCTS.map(function (p) {
    return (
      '<a class="feature-card" href="catalog.html#' + p.id + '">' +
        '<span class="badge badge-accent feature-tag">' + p.tag + "</span>" +
        '<div class="feature-img">' +
          '<img src="' + p.image + '" alt="' + p.alt + '" ' +
            'width="400" height="400" loading="lazy" />' +
        "</div>" +
        '<div class="feature-body">' +
          "<h3>" + p.name + "</h3>" +
          '<div class="feature-foot">' +
            '<span class="price">' + formatPKR(p.price) + "</span>" +
            '<span class="feature-link">View ' + icon("arrowRight", 16) + "</span>" +
          "</div>" +
        "</div>" +
      "</a>"
    );
  }).join("");
}


/* ---------------------------------------------------------------------
   7. ICON PLACEHOLDERS
   Turns <span data-icon="truck" data-size="22"></span> in the HTML
   into the matching SVG from icons.js.
   --------------------------------------------------------------------- */
function fillIcons(root) {
  (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
    const size = parseInt(el.getAttribute("data-size"), 10) || 20;
    el.innerHTML = icon(el.getAttribute("data-icon"), size);
    el.setAttribute("aria-hidden", "true");
  });
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
  setupMiniCart();
  updateCartBadge(false);
  renderFeatured();
  fillIcons();
});
