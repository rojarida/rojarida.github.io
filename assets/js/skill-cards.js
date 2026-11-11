export function initSkillCards() {
  const controls = document.querySelector(".skill-controls");
  const expandAll = controls?.querySelector('[data-skill-action="expand"]');
  const collapseAll = controls?.querySelector('[data-skill-action="collapse"]');

  function updateControls() {
    if (expandAll) expandAll.disabled = cards.every((card) => card.expanded);
    if (collapseAll) collapseAll.disabled = cards.every((card) => !card.expanded);
  }

  const cards = Array.from(document.querySelectorAll(".skill-card"), (card) => {
    const summary = card.querySelector("summary");
    const content = card.querySelector(".skill-card-content");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let expanded = card.open;
    let animation;
    card.classList.add("skill-card-enhanced");

    function scrollHeadingIntoView() {
      const heading = summary.getBoundingClientRect();
      const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const visibleTop = headerBottom + 16;
      if (heading.top >= visibleTop && heading.bottom <= window.innerHeight) return;

      window.scrollTo({
        top: window.scrollY + heading.top - visibleTop,
        behavior: reducedMotion.matches ? "instant" : "smooth",
      });
    }

    function setExpanded(open, { scroll = true } = {}) {
      if (open === expanded) return;
      if (!open && scroll) scrollHeadingIntoView();

      const startHeight = card.open ? content.getBoundingClientRect().height : 0;
      animation?.cancel();
      expanded = open;
      updateControls();
      card.classList.toggle("is-closing", !open);
      card.open = true;

      function finish() {
        card.open = open;
        card.classList.remove("is-closing");
        animation?.cancel();
        animation = null;
      }

      if (reducedMotion.matches || !content.animate) {
        finish();
        return;
      }

      animation = content.animate(
        [{ height: `${startHeight}px` }, { height: `${open ? content.scrollHeight : 0}px` }],
        { duration: 280, easing: "ease-in-out", fill: "both" },
      );
      animation.onfinish = finish;
    }

    card.addEventListener("toggle", () => {
      if (animation) return;
      expanded = card.open;
      updateControls();
    });

    card.addEventListener("click", (event) => {
      if (summary.contains(event.target)) {
        event.preventDefault();
        setExpanded(!expanded);
        return;
      }

      const contextBadge = event.target.closest(".skill-badge--context");
      if (contextBadge && card.contains(contextBadge)) {
        contextBadge.focus({ preventScroll: true });
        return;
      }

      const control = event.target.closest("a, button, input, select, textarea, label, [contenteditable], [tabindex]");
      if (!card.open || (control && card.contains(control))) return;
      if (window.getSelection()?.isCollapsed === false) return;

      setExpanded(!expanded);
      summary.focus({ preventScroll: true });
    });

    return {
      setExpanded,
      get expanded() {
        return expanded;
      },
    };
  });

  expandAll?.addEventListener("click", () => {
    cards.forEach((card) => card.setExpanded(true, { scroll: false }));
  });

  collapseAll?.addEventListener("click", () => {
    cards.forEach((card) => card.setExpanded(false, { scroll: false }));
  });

  updateControls();
  if (controls && cards.length) controls.hidden = false;
}
