export function initMobileNav() {
  const siteNav = document.querySelector(".site-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-link");

  if (!siteNav || !menuToggle) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  })

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      siteNav.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target)) {
      siteNav.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      siteNav.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  })
}
