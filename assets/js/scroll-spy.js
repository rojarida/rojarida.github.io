export function initScrollSpy() {
  const sections = [...document.querySelectorAll("section[id]")];
  const links = [...document.querySelectorAll('.nav-link[href^="#"]')];
  if (!sections.length || !links.length) return;
  let scheduled = false;

  function update() {
    const position = window.scrollY + 120;
    const current = sections.find(
      (section) => position >= section.offsetTop && position < section.offsetTop + section.offsetHeight,
    );
    links.forEach((link) => {
      const active = link.hash === `#${current?.id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scheduled = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
  document.addEventListener("toggle", update, true);
  update();
}
