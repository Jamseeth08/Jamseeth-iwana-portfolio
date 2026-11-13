// =========================================================
// Jamseeth Iwana: Portfolio interactions
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const toTop = document.getElementById("toTop");

  /* ---------- 1. Nav background + back-to-top on scroll ---------- */
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    toTop.classList.toggle("is-visible", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- 2. Mobile menu ---------- */
  const closeMenu = () => {
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  /* ---------- 3. Highlight the nav link for the section in view ---------- */
  const sections = document.querySelectorAll("section[id]");
  const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("is-active"));
        const link = linkFor(entry.target.id);
        if (link) link.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- 4. Fade-in on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- 5. Typing effect in the hero ---------- */
  const typedEl = document.getElementById("typed");
  const roles = ["UI/UX Designer", "Web Developer", "Visual Storyteller"];
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;

  const type = () => {
    const word = roles[roleIndex];
    typedEl.textContent = word.slice(0, charIndex);

    if (deleting) {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    } else {
      charIndex++;
      if (charIndex > roles[roleIndex].length) {
        deleting = true;
        setTimeout(type, 1800); // pause on the full word
        return;
      }
    }
    setTimeout(type, deleting ? 45 : 90);
  };
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTimeout(type, 2200);
  }

  /* ---------- 6. Count-up numbers in About ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        let current = 0;
        const step = () => {
          current++;
          el.textContent = current;
          if (current < target) setTimeout(step, 120);
        };
        step();
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => countObserver.observe(c));

  /* ---------- 7. Project filter ---------- */
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".card");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !show);
        if (show) card.classList.add("is-visible");
      });
    });
  });

  /* ---------- 8. Placeholder when an image file is missing ---------- */
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const useFallback = () => {
      const box = document.createElement("div");
      box.className = "img-fallback";
      box.textContent = img.dataset.fallback;
      img.replaceWith(box);
    };
    if (img.complete && img.naturalWidth === 0) useFallback();
    else img.addEventListener("error", useFallback);
  });

  /* ---------- 9. Copy email to clipboard ---------- */
  const copyBtn = document.getElementById("copyEmail");
  const copyHint = document.getElementById("copyHint");
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyHint.textContent = "Copied!";
    } catch {
      window.location.href = `mailto:${email}`;
    }
    setTimeout(() => (copyHint.textContent = "Click to copy"), 2000);
  });

  /* ---------- 10. Lightbox gallery (View screens / View full design) ---------- */
  // Buttons use data-gallery="img1.jpg|img2.jpg" and data-caption="..."
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCount = document.getElementById("lightboxCount");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  let gallery = [];
  let current = 0;

  const showImage = (index) => {
    current = (index + gallery.length) % gallery.length;
    lightboxImg.src = gallery[current];
    lightboxCount.textContent = gallery.length > 1 ? `(${current + 1} / ${gallery.length})` : "";
    lightbox.scrollTop = 0;
  };
  const openLightbox = (images, caption) => {
    gallery = images;
    lightboxCaption.textContent = caption;
    lightboxImg.alt = caption;
    prevBtn.hidden = nextBtn.hidden = images.length < 2;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    showImage(0);
  };
  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-gallery]").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn.dataset.gallery.split("|"), btn.dataset.caption || ""));
  });
  prevBtn.addEventListener("click", () => showImage(current - 1));
  nextBtn.addEventListener("click", () => showImage(current + 1));
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && gallery.length > 1) showImage(current - 1);
    if (e.key === "ArrowRight" && gallery.length > 1) showImage(current + 1);
  });

  /* ---------- 11. Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
