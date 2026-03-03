const bgColumns = Array.from(document.querySelectorAll(".img_bg_column"));
const mainBtn = document.querySelector(".main_btn");

const desktopConfig = [
  {
    dir: "down",
    duration: 22,
    pattern: ["wide", "tall", "wide", "tall", "wide", "wide"],
  },
  {
    dir: "up",
    duration: 20,
    pattern: ["wide", "wide", "tall", "wide", "tall", "wide"],
  },
  {
    dir: "down",
    duration: 23,
    pattern: ["wide", "tall", "wide", "tall", "wide", "wide"],
  },
  {
    dir: "up",
    duration: 21,
    pattern: ["wide", "wide", "tall", "wide", "tall", "wide"],
  },
];

const mobileConfig = [
  {
    dir: "down",
    duration: 18,
    pattern: ["wide", "tall", "wide", "tall", "wide"],
  },
  {
    dir: "up",
    duration: 17,
    pattern: ["wide", "wide", "tall", "wide", "tall"],
  },
];

function buildStack(images, pattern) {
  const stack = document.createElement("div");
  stack.className = "img_track_stack";

  pattern.forEach((type, index) => {
    const source = images[index % images.length];
    const clone = source.cloneNode(true);
    stack.appendChild(clone);
  });

  return stack;
}

function setupColumns() {
  if (bgColumns.length === 0) return;

  const isMobile = window.innerWidth <= 768;
  const config = isMobile ? mobileConfig : desktopConfig;

  bgColumns.forEach((column, columnIndex) => {
    const images = Array.from(
      column.querySelectorAll(":scope > img, :scope > .img_track img"),
    );
    if (images.length === 0) return;

    const spec = config[columnIndex];
    if (!spec) {
      column.style.display = "none";
      return;
    }

    column.style.display = "";
    column.classList.remove("dir-up", "dir-down");
    column.classList.add(spec.dir === "up" ? "dir-up" : "dir-down");
    column.style.setProperty("--column-duration", `${spec.duration}s`);

    // Rebuild track from original direct images if present.
    const directImages = Array.from(column.querySelectorAll(":scope > img"));
    const sourceImages = directImages.length > 0 ? directImages : images;

    column.innerHTML = "";
    const track = document.createElement("div");
    track.className = "img_track";

    const stackA = buildStack(sourceImages, spec.pattern);
    const stackB = buildStack(sourceImages, spec.pattern);
    track.append(stackA, stackB);
    column.appendChild(track);

    requestAnimationFrame(() => {
      const gap = parseFloat(getComputedStyle(track).gap || "0") || 0;
      const distance = stackA.offsetHeight + gap;
      column.style.setProperty("--scroll-distance", `${distance}px`);
    });
  });
}

function setupMainButton() {
  if (!mainBtn || mainBtn.dataset.bound === "true") return;
  mainBtn.dataset.bound = "true";

  mainBtn.addEventListener("click", () => {
    mainBtn.classList.remove("is-pressed");
    void mainBtn.offsetWidth;
    mainBtn.classList.add("is-pressed");
  });
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setupColumns, 120);
});

window.addEventListener("DOMContentLoaded", () => {
  setupColumns();
  setupMainButton();
});

const body = document.body;

mainBtn.addEventListener("mouseenter", () => {
  body.classList.add("hover_mode");
});

mainBtn.addEventListener("mouseleave", () => {
  body.classList.remove("hover_mode");
});
s;
