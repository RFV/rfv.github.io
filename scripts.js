// ---- configuration -------------------------------------------------
const WORDS = [
  "philosophy", "math", "computation", "logic", "linguistics", 
  "computers", "linux", "python", "llm", "harness", "tools",
  "economics", "business", "organization", 
];

const DURATION_MS = 1024;  // how long each word stays yellow
// --------------------------------------------------------------------

(function () {
  // Find the container by id, so the script can live anywhere on the page.
  const container = document.getElementById("wordflash");
  if (!container) return;

  // Build the list once: one span per word.
  const spans = WORDS.map((word) => {
    const span = document.createElement("span");
    span.textContent = word;
    container.appendChild(span);
    return span;
  });

  let currentIndex = -1;

  // Inline spans that are adjacent with no whitespace between them never
  // wrap, so give each word a space after it. The last word's space is
  // trimmed by typical HTML whitespace handling when the line ends.
  spans.forEach((span, i) => {
    if (i < spans.length - 1) span.after(" ");
  });

  function tick() {
    const n = spans.length;
    if (n === 0) return;

    // Pick a random word, but never pick the one already highlighted.
    let next;
    if (n === 1) {
      next = 0; // nothing else to pick
    } else {
      do {
        next = Math.floor(Math.random() * n);
      } while (next === currentIndex);
    }

    // Swap highlight in one step.
    if (currentIndex !== -1) spans[currentIndex].classList.remove("active");
    spans[next].classList.add("active");
    currentIndex = next;
  }

  if (spans.length > 0) {
    tick();
    setInterval(tick, DURATION_MS);
  }
})();
