export function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  function updateActiveNavLink() {
    const headerOffset = 120;
    const scrollPosition = window.scrollY + headerOffset

    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((navLink) => {
      const href = navLink.getAttribute("href");
      if (!href) return;

      const linkTarget = href.slice(1)
      navLink.classList.toggle("active", linkTarget === currentSectionId);
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);
  window.addEventListener("load", updateActiveNavLink);
  updateActiveNavLink();
}
