/* =====================================================================
   VoltEdge — keywords.js
   ---------------------------------------------------------------------
   Code and data used only on keywords.html. Loaded after icons.js,
   products.js and main.js.
     1. KEYWORDS: the Google Keyword Planner results table data
     2. Renders the table, with a competition badge per row
     3. Marks every row that still has sample data
   HOW TO UPDATE: run Google Keyword Planner (location: Pakistan),
   copy the numbers into KEYWORDS below and set sample: false on each
   row you replace. The "Replace with my real data" labels and the
   notice at the top disappear once no sample rows are left.
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. KEYWORD DATA
   Fields:
     keyword     – the search term
     product     – product id from products.js (links to the catalog)
     searches    – avg. monthly searches, as Keyword Planner shows it
     competition – "Low", "Medium" or "High"
     bidLow      – top-of-page bid, low range (PKR)
     bidHigh     – top-of-page bid, high range (PKR)
     sample      – true = placeholder numbers, not real data yet
   ALL NUMBERS BELOW ARE SAMPLES. Replace with my real data.
   --------------------------------------------------------------------- */
const KEYWORDS = [
  { keyword: "wireless earbuds price in pakistan", product: "earbuds",
    searches: "10K – 100K", competition: "High", bidLow: 18, bidHigh: 65, sample: true },
  { keyword: "20w charger", product: "charger-20w",
    searches: "1K – 10K", competition: "Medium", bidLow: 10, bidHigh: 38, sample: true },
  { keyword: "laptop stand", product: "laptop-stand",
    searches: "1K – 10K", competition: "Low", bidLow: 8, bidHigh: 30, sample: true },
  { keyword: "phone cover", product: "phone-cover",
    searches: "10K – 100K", competition: "Medium", bidLow: 6, bidHigh: 22, sample: true },
  { keyword: "laptop stand price in pakistan", product: "laptop-stand",
    searches: "100 – 1K", competition: "Low", bidLow: 7, bidHigh: 26, sample: true },
  { keyword: "usb c fast charger", product: "charger-20w",
    searches: "1K – 10K", competition: "Medium", bidLow: 9, bidHigh: 34, sample: true },
];


/* ---------------------------------------------------------------------
   2. TABLE
   One row per keyword. The keyword links to its product in the
   catalog. Competition shows as a badge with its word (not color only).
   --------------------------------------------------------------------- */
function renderKeywordTable() {
  const body = document.getElementById("keyword-body");
  if (!body) return;

  body.innerHTML = KEYWORDS.map(function (k) {
    const p = getProduct(k.product);
    const level = k.competition.toLowerCase(); // "low" | "medium" | "high"

    return (
      '<tr class="' + (k.sample ? "is-sample" : "") + '">' +
        '<td class="keyword-cell">' +
          '<span class="keyword">' + k.keyword + "</span>" +
          (p ? '<a class="keyword-product" href="catalog.html#' + p.id + '">' + p.name + "</a>" : "") +
          (k.sample ? '<span class="sample-tag">Replace with my real data</span>' : "") +
        "</td>" +
        '<td data-label="Avg. monthly searches">' + k.searches + "</td>" +
        '<td data-label="Competition"><span class="comp comp-' + level + '">' + k.competition + "</span></td>" +
        '<td class="num" data-label="Top-of-page bid">' +
          formatPKR(k.bidLow) + " – " + formatPKR(k.bidHigh) +
        "</td>" +
      "</tr>"
    );
  }).join("");
}


/* ---------------------------------------------------------------------
   3. SAMPLE-DATA NOTICE
   Shows how many rows are still samples; hides itself when none are.
   --------------------------------------------------------------------- */
function updateSampleNotice() {
  const notice = document.getElementById("sample-notice");
  if (!notice) return;

  const samples = KEYWORDS.filter(function (k) {
    return k.sample;
  }).length;

  if (samples === 0) {
    notice.hidden = true;
    return;
  }
  const count = notice.querySelector("[data-sample-count]");
  if (count) count.textContent = samples + " of " + KEYWORDS.length;
}


/* ---------------------------------------------------------------------
   START-UP
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  renderKeywordTable();
  updateSampleNotice();
});
