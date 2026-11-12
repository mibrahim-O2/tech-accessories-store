/* =====================================================================
   VoltEdge — catalog.js
   ---------------------------------------------------------------------
   Code used only on catalog.html. Loaded after icons.js, products.js
   and main.js.
     1. Renders one card per product from PRODUCTS (image, category,
        name, description, PKR price, "Products worth" block,
        "Add to cart" button)
     2. Filter bar (All / Audio / Protection / Charging / Workspace)
     3. "Add to cart" buttons -> addToCart() from main.js
     4. Links like catalog.html#earbuds scroll to that card and
        briefly highlight it
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. PRODUCT CARDS
   --------------------------------------------------------------------- */

/** Look up a category object ({ id, label, icon }) by its id. */
function getCategory(id) {
  return CATEGORIES.find(function (c) {
    return c.id === id;
  });
}

/** Build the HTML for one product card. The card's id is the product id. */
function productCardHTML(p) {
  const cat = getCategory(p.category);

  return (
    '<article class="product-card" id="' + p.id + '" data-category="' + p.category + '">' +

      // Image with the tag badge on top
      '<div class="product-img">' +
        '<span class="badge badge-accent">' + p.tag + "</span>" +
        '<img src="' + p.image + '" alt="' + p.alt + '" width="400" height="400" loading="lazy" />' +
      "</div>" +

      '<div class="product-body">' +
        // Category line, name, description
        '<span class="product-category">' + icon(cat.icon, 14) + cat.label + "</span>" +
        "<h3>" + p.name + "</h3>" +
        '<p class="product-desc">' + p.description + "</p>" +

        // Selling price
        '<div class="product-price"><span class="price">' + formatPKR(p.price) + "</span></div>" +

        // "Products worth": cost, price, profit, margin (helpers from products.js)
        '<div class="worth">' +
          '<p class="worth-title">' + icon("trendingUp", 14) + "Products worth</p>" +
          "<dl>" +
            "<div><dt>Cost</dt><dd>" + formatPKR(p.cost) + "</dd></div>" +
            "<div><dt>Price</dt><dd>" + formatPKR(p.price) + "</dd></div>" +
            "<div><dt>Profit</dt><dd>" + formatPKR(profit(p)) + "</dd></div>" +
            '<div class="worth-margin"><dt>Margin</dt><dd>' + margin(p) + "%</dd></div>" +
          "</dl>" +
          // Bar width = margin %, so 35% fills about a third
          '<div class="margin-bar" role="img" aria-label="Margin ' + margin(p) + ' percent">' +
            '<span style="width: ' + margin(p) + '%"></span>' +
          "</div>" +
        "</div>" +

        // Add to cart
        '<button class="btn btn-primary btn-block add-btn" type="button" data-id="' + p.id + '">' +
          icon("cart", 18) + "<span>Add to cart</span>" +
        "</button>" +
      "</div>" +
    "</article>"
  );
}

/** Put every product card into the grid. */
function renderCatalog() {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(productCardHTML).join("");
}


/* ---------------------------------------------------------------------
   2. FILTER BAR
   One button per category. Clicking a button hides cards whose
   data-category does not match ("all" shows everything).
   --------------------------------------------------------------------- */
function renderFilters() {
  const bar = document.getElementById("filter-chips");
  if (!bar) return;

  bar.innerHTML = CATEGORIES.map(function (c) {
    return (
      '<button class="chip" type="button" data-filter="' + c.id + '" ' +
        'aria-pressed="' + (c.id === "all") + '">' +
        icon(c.icon, 16) + c.label +
      "</button>"
    );
  }).join("");

  bar.addEventListener("click", function (e) {
    const chip = e.target.closest("[data-filter]");
    if (chip) applyFilter(chip.getAttribute("data-filter"));
  });
}

/** Show only cards in the chosen category and update the count line. */
function applyFilter(categoryId) {
  let shown = 0;

  document.querySelectorAll(".product-card").forEach(function (card) {
    const match = categoryId === "all" || card.getAttribute("data-category") === categoryId;
    card.hidden = !match;
    if (match) shown++;
  });

  // Mark the active chip
  document.querySelectorAll("[data-filter]").forEach(function (chip) {
    chip.setAttribute("aria-pressed", String(chip.getAttribute("data-filter") === categoryId));
  });

  // "Showing 4 of 4 products"
  const count = document.getElementById("filter-count");
  if (count) {
    count.textContent = "Showing " + shown + " of " + PRODUCTS.length + " products";
  }
}


/* ---------------------------------------------------------------------
   3. ADD TO CART BUTTONS
   One listener on the grid handles every button. The button shows
   "Added" with a tick for a moment as feedback.
   --------------------------------------------------------------------- */
function setupAddButtons() {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  grid.addEventListener("click", function (e) {
    const btn = e.target.closest(".add-btn");
    if (!btn) return;

    addToCart(btn.getAttribute("data-id")); // from main.js

    // Short "Added" feedback, then back to normal
    btn.classList.add("is-added");
    btn.innerHTML = icon("check", 18) + "<span>Added</span>";
    clearTimeout(btn._resetTimer);
    btn._resetTimer = setTimeout(function () {
      btn.classList.remove("is-added");
      btn.innerHTML = icon("cart", 18) + "<span>Add to cart</span>";
    }, 1200);
  });
}


/* ---------------------------------------------------------------------
   4. HIGHLIGHT FROM LINK (catalog.html#earbuds)
   Makes sure the card is visible (resets the filter), scrolls to it and
   plays the amber highlight animation once.
   --------------------------------------------------------------------- */
function highlightFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  const card = document.getElementById(id);
  if (!card || !card.classList.contains("product-card")) return;

  applyFilter("all");
  card.scrollIntoView({ behavior: "smooth", block: "center" });

  // Restart the animation even if the same card is linked twice
  card.classList.remove("highlight");
  void card.offsetWidth;
  card.classList.add("highlight");
}


/* ---------------------------------------------------------------------
   START-UP
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  renderCatalog();
  renderFilters();
  applyFilter("all");
  setupAddButtons();
  highlightFromHash();
  window.addEventListener("hashchange", highlightFromHash);
});
