export function initMobileNav() {
  const siteNav = document.querySelector(".site-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuIcon = menuToggle?.querySelector("i");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!siteNav || !menuToggle || !menuIcon) return;

  function openMenu() {
    siteNav.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  }

  function closeMenu() {
    siteNav.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  }

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    if (siteNav.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}
