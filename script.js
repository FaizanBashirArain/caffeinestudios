const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".site-nav a");
const reveals = document.querySelectorAll(".reveal");
const playButtons = document.querySelectorAll("[data-video]");
const videoDialog = document.querySelector("#video-dialog");
const dialogVideo = document.querySelector("#dialog-video");
const dialogTitle = document.querySelector("#video-dialog-title");
const dialogClose = document.querySelector(".dialog-close");
const heroVideo = document.querySelector(".hero-frame video");
const copyButtons = document.querySelectorAll("[data-copy]");
const toast = document.querySelector(".toast");
const currentYear = document.querySelector("#current-year");

const closeNavigation = () => {
  if (!navToggle || !siteNav) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  siteNav.classList.remove("is-open");
};

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeNavigation));

  document.addEventListener("click", (event) => {
    if (siteNav.classList.contains("is-open") && !siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNavigation();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

const updateHeader = () => {
  if (siteHeader) siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

reveals.forEach((item) => {
  if (item.dataset.delay) item.style.setProperty("--delay", `${item.dataset.delay}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
  );

  reveals.forEach((item) => revealObserver.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}

const closeVideoDialog = () => {
  if (!videoDialog || !dialogVideo) return;
  dialogVideo.pause();
  dialogVideo.removeAttribute("src");
  dialogVideo.load();
  if (videoDialog.open) videoDialog.close();
  document.body.classList.remove("has-dialog");
  if (heroVideo) heroVideo.play().catch(() => {});
};

playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!videoDialog || !dialogVideo || !dialogTitle) return;
    dialogTitle.textContent = button.dataset.title || "Gameplay";
    dialogVideo.src = button.dataset.video;
    document.body.classList.add("has-dialog");
    if (heroVideo) heroVideo.pause();
    videoDialog.showModal();
    dialogVideo.play().catch(() => {});
  });
});

if (dialogClose) dialogClose.addEventListener("click", closeVideoDialog);

if (videoDialog) {
  videoDialog.addEventListener("click", (event) => {
    const bounds = videoDialog.getBoundingClientRect();
    const clickedOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (clickedOutside) closeVideoDialog();
  });
  videoDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeVideoDialog();
  });
}

let toastTimer;

const showToast = () => {
  if (!toast) return;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
};

const copyText = async (value) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const temporaryInput = document.createElement("textarea");
  temporaryInput.value = value;
  temporaryInput.setAttribute("readonly", "");
  temporaryInput.style.position = "fixed";
  temporaryInput.style.opacity = "0";
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  document.execCommand("copy");
  temporaryInput.remove();
};

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await copyText(button.dataset.copy);
      const status = button.querySelector("i");
      if (status) {
        status.textContent = "Copied";
        window.setTimeout(() => {
          status.textContent = "Copy";
        }, 2200);
      }
      showToast();
    } catch {
      window.prompt("Copy Discord username:", button.dataset.copy);
    }
  });
});

if (currentYear) currentYear.textContent = String(new Date().getFullYear());
