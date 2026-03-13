/* ============================================
   GOLDEN HIVE – Honey Shop JavaScript
   script.js
   ============================================ */

/* ─── CART STATE ─── */

let cartCount = 0;
const cartCountEl = document.getElementById("cart-count");
const toast = document.getElementById("cart-toast");
const toastMsg = document.getElementById("toast-msg");

/* ─── ADD TO CART BUTTONS ─── */

document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = btn.dataset.price;

    cartCount++;
    cartCountEl.textContent = cartCount;

    // Show toast notification
    toastMsg.textContent = `🍯 "${name}" added to cart!`;
    toast.classList.add("show");

    // Hide toast after 2.5 seconds
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);

    // Animate the button
    btn.textContent = "✓";
    btn.style.background = "var(--honey)";
    btn.style.color = "white";
    btn.style.borderColor = "var(--honey)";
    setTimeout(() => {
      btn.textContent = "+";
      btn.style.background = "";
      btn.style.color = "";
      btn.style.borderColor = "";
    }, 1200);
  });
});

/* ─── ANIMATED STAT COUNTERS ─── */
function animateCounter(el, target, suffix = "") {
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    // Format large numbers (e.g. 12000 → 12K)
    if (target >= 1000) {
      el.textContent =
        current >= 1000
          ? (current / 1000).toFixed(current % 1000 === 0 ? 0 : 1) + "K"
          : current + suffix;
    } else {
      el.textContent = current + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Trigger counters when the hero stats scroll into view
const statNums = document.querySelectorAll(".stat-num[data-target]");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        animateCounter(el, target, suffix);
        statsObserver.unobserve(el); // Run only once
      }
    });
  },
  { threshold: 0.5 },
);

statNums.forEach((el) => statsObserver.observe(el));

/* ─── NEWSLETTER FORM ─── */
const nlEmail = document.getElementById("nl-email");
const nlSubmit = document.getElementById("nl-submit");
const nlSuccess = document.getElementById("nl-success");

nlSubmit.addEventListener("click", () => {
  const email = nlEmail.value.trim();

  if (!email || !email.includes("@")) {
    nlEmail.style.outline = "2px solid red";
    nlEmail.placeholder = "Please enter a valid email!";
    setTimeout(() => {
      nlEmail.style.outline = "";
      nlEmail.placeholder = "Enter your email address...";
    }, 2000);
    return;
  }

  // Show success state
  nlSubmit.textContent = "✓ Subscribed!";
  nlSubmit.style.background = "#2D5A2D";
  nlEmail.style.display = "none";
  nlSuccess.style.display = "block";
});

/* ─── SMOOTH SCROLL FOR ANCHOR LINKS ─── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ─── NAVBAR SCROLL SHADOW ─── */
const navEl = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navEl.style.boxShadow = "0 4px 24px rgba(196,96,10,0.15)";
  } else {
    navEl.style.boxShadow = "0 2px 20px rgba(196,96,10,0.08)";
  }
});

/* ─── FADE-IN ON SCROLL (Product Cards & Test Cards) ─── */
const fadeEls = document.querySelectorAll(".product-card, .test-card, .step");

fadeEls.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity .5s ease, transform .5s ease";
});

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(
          () => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          },
          (80 * [...fadeEls].indexOf(entry.target)) % 4,
        );
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

fadeEls.forEach((el) => fadeObserver.observe(el));
