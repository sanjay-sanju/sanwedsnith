const weddingDetails = {
  groom: "Sanjay",
  bride: "Nithya",
  event: "Wedding Reception",
  date: "2026-12-27T17:00:00",
  venue: "VK Palace, Mullampara",
  mapsUrl: "https://maps.app.goo.gl/tZNRZBTXxXUiJJNM7"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Header scroll shadow ---------- */
const siteHeader = document.getElementById("siteHeader");
function updateHeaderShadow() {
  if (window.scrollY > 12) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", updateHeaderShadow, { passive: true });
updateHeaderShadow();

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

function closeMobileMenu() {
  mobileNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}
function openMobileMenu() {
  mobileNav.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close menu");
}
menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.contains("open");
  isOpen ? closeMobileMenu() : openMobileMenu();
});
mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileMenu();
});

/* ---------- Header height offset for anchor scrolling ---------- */
function setScrollOffset() {
  const height = siteHeader.offsetHeight;
  document.querySelectorAll("main > section, #home").forEach((section) => {
    section.style.scrollMarginTop = height + "px";
  });
}
setScrollOffset();
window.addEventListener("resize", setScrollOffset);

/* ---------- Countdown ---------- */
const targetDate = new Date(weddingDetails.date);
const countdownGrid = document.getElementById("countdown");
const countdownNote = document.getElementById("countdownNote");
const els = {
  days: document.getElementById("cd-days"),
  hours: document.getElementById("cd-hours"),
  mins: document.getElementById("cd-mins"),
  secs: document.getElementById("cd-secs")
};

function pad(n) {
  return String(n).padStart(2, "0");
}

let countdownTimer = null;

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    if (countdownTimer) clearInterval(countdownTimer);
    countdownGrid.innerHTML =
      '<p class="countdown-complete">Today is the celebration! &#10084;&#65039;</p>';
    countdownNote.textContent = "";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.mins.textContent = pad(mins);
  els.secs.textContent = pad(secs);
}

updateCountdown();
countdownTimer = setInterval(updateCountdown, 1000);

/* ---------- Music toggle ---------- */
const musicBtn = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic
      .play()
      .then(() => {
        isPlaying = true;
        musicBtn.setAttribute("aria-pressed", "true");
        musicBtn.setAttribute("aria-label", "Pause wedding music");
      })
      .catch(() => {
        /* music file missing or blocked — fail silently, site still works */
      });
  } else {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.setAttribute("aria-pressed", "false");
    musicBtn.setAttribute("aria-label", "Play wedding music");
  }
});

/* ---------- Scroll reveal animations ---------- */
const animatedEls = document.querySelectorAll("[data-animate]");
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  animatedEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  animatedEls.forEach((el) => observer.observe(el));
}

/* ---------- Floating petals (hero only, subtle) ---------- */
if (!prefersReducedMotion) {
  const petalsLayer = document.getElementById("petalsLayer");
  const PETAL_COUNT = 10;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDuration = 10 + Math.random() * 8 + "s";
    petal.style.animationDelay = Math.random() * 12 + "s";
    petal.style.opacity = 0.35 + Math.random() * 0.3;
    petalsLayer.appendChild(petal);
  }
}
