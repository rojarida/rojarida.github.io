export function initMobileNav() {
  const nav = document.querySelector(".site-nav");
  const toggle = nav?.querySelector(".menu-toggle");
  if (!toggle) return;
  const icon = toggle.querySelector("i");
  const mobile = window.matchMedia("(max-width: 900px)");
  nav.classList.add("nav-enhanced");

  function setOpen(open) {
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    icon.classList.toggle("fa-bars", !open);
    icon.classList.toggle("fa-xmark", open);
  }

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("menu-open")));
  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobile.matches && link.hash && link.pathname === location.pathname) {
        const section = document.getElementById(link.hash.slice(1));
        section?.setAttribute("tabindex", "-1");
        section?.focus({ preventScroll: true });
      }
      setOpen(false);
    });
  });
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("menu-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  mobile.addEventListener("change", () => setOpen(false));
}
