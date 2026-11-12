/* =====================================================================
   VoltEdge — business.js
   ---------------------------------------------------------------------
   Code used only on business.html. Loaded after icons.js, products.js
   and main.js.
     1. Fills the "Products worth" table (product, cost, price, profit,
        margin) from PRODUCTS, plus an average-margin footer row
     2. Works out the expected revenue figures and sizes the pure-CSS
        bar chart (bar heights are set with a CSS variable, no chart
        library, no canvas)
   Because everything is calculated from products.js, updating a cost
   there updates this whole page.
   ===================================================================== */


/* ---------------------------------------------------------------------
   REVENUE ASSUMPTIONS
   Change these two numbers to update every revenue figure on the page.
   --------------------------------------------------------------------- */
const REVENUE_PLAN = {
  ordersPerMonth: 80,    // expected orders each month
  avgOrderValue: 1800,   // average order value in PKR
};


/* ---------------------------------------------------------------------
   HELPERS
   --------------------------------------------------------------------- */

/** Average margin of all products as a fraction (e.g. 0.307). */
function averageMargin() {
  const total = PRODUCTS.reduce(function (sum, p) {
    return sum + profit(p) / p.price;
  }, 0);
  return total / PRODUCTS.length;
}

/** Put text into every element with the given data-fill name. */
function fill(name, text) {
  document.querySelectorAll('[data-fill="' + name + '"]').forEach(function (el) {
    el.textContent = text;
  });
}


/* ---------------------------------------------------------------------
   1. PRODUCTS WORTH TABLE
   One row per product; the margin cell has a small bar for quick
   comparison. The footer row shows the average margin.
   --------------------------------------------------------------------- */
function renderWorthTable() {
  const body = document.getElementById("worth-body");
  const foot = document.getElementById("worth-foot");
  if (!body) return;

  body.innerHTML = PRODUCTS.map(function (p) {
    return (
      "<tr>" +
        '<td><div class="table-product">' +
          '<img src="' + p.image + '" alt="" width="40" height="40" loading="lazy" />' +
          "<span>" + p.name + "</span>" +
        "</div></td>" +
        // data-label is shown beside each value when the table stacks on phones
        '<td class="num" data-label="Cost">' + formatPKR(p.cost) + "</td>" +
        '<td class="num" data-label="Price">' + formatPKR(p.price) + "</td>" +
        '<td class="num" data-label="Profit">' + formatPKR(profit(p)) + "</td>" +
        '<td data-label="Margin"><div class="table-margin">' +
          '<span class="table-margin-bar"><span style="width: ' + margin(p) + '%"></span></span>' +
          "<strong>" + margin(p) + "%</strong>" +
        "</div></td>" +
      "</tr>"
    );
  }).join("");

  if (foot) {
    foot.innerHTML =
      "<tr>" +
        '<td colspan="4">Average margin across all products</td>' +
        "<td><strong>" + Math.round(averageMargin() * 100) + "%</strong></td>" +
      "</tr>";
  }
}


/* ---------------------------------------------------------------------
   2. EXPECTED REVENUE + BAR CHART
   revenue      = orders per month x average order value
   gross profit = revenue x average margin (estimate)
   product cost = revenue - gross profit
   Each bar's height is its share of revenue (the tallest bar).
   --------------------------------------------------------------------- */
function renderRevenue() {
  const revenue = REVENUE_PLAN.ordersPerMonth * REVENUE_PLAN.avgOrderValue;
  // Rounded to the nearest Rs. 100: it is an estimate, not an exact figure
  const grossProfit = Math.round((revenue * averageMargin()) / 100) * 100;
  const productCost = revenue - grossProfit;

  // Headline figures (elements marked data-fill="...")
  fill("orders", REVENUE_PLAN.ordersPerMonth);
  fill("aov", formatPKR(REVENUE_PLAN.avgOrderValue));
  fill("revenue", formatPKR(revenue));
  fill("yearly", formatPKR(revenue * 12));
  fill("avg-margin", Math.round(averageMargin() * 100) + "%");
  fill("gross-profit", formatPKR(grossProfit));
  fill("product-cost", formatPKR(productCost));

  // Bar heights as a fraction of the revenue bar (0 to 1). The CSS turns
  // this into pixels: height = --h x 200px. Set on the next frame so the
  // bars visibly grow from 0.
  const values = { revenue: revenue, cost: productCost, profit: grossProfit };
  document.querySelectorAll(".bar[data-bar]").forEach(function (bar) {
    const v = values[bar.getAttribute("data-bar")];
    requestAnimationFrame(function () {
      bar.style.setProperty("--h", v / revenue);
    });
    bar.querySelector(".bar-value").textContent = formatPKR(v);
    bar.setAttribute("aria-label", bar.getAttribute("data-label") + ": " + formatPKR(v));
  });
}


/* ---------------------------------------------------------------------
   START-UP
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  renderWorthTable();
  renderRevenue();
});
