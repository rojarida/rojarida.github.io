export function initSkillCards() {
  const skillCards = document.querySelectorAll(".skill-card");

  if (!skillCards.length) return;

  function getHeaderOffset() {
    const header = document.querySelector(".site-header");
    return header ? header.offsetHeight : 0;
  }

  function isCardTopVisible(skillCard) {
    const rect = skillCard.getBoundingClientRect();
    const headerOffset = getHeaderOffset();
    const visibleTop = headerOffset + 16;

    return rect.top >= visibleTop;
  }

  function scrollToCard(skillCard) {
    const headerOffset = getHeaderOffset();
    const cardTop = skillCard.getBoundingClientRect().top + window.scrollY;
    const topPosition = cardTop - headerOffset - 16;

    window.scrollTo({
      top: topPosition,
      behavior: "smooth",
    });
  }

  function closeCard(skillCard, options = {}) {
    const { scrollBack = false } = options;

    const toggleButton = skillCard.querySelector(".skill-card-toggle");
    const content = skillCard.querySelector(".skill-card-content");

    const shouldScrollBack = scrollBack && !isCardTopVisible(skillCard);

    skillCard.classList.remove("open");
    toggleButton.setAttribute("aria-expanded", "false");
    content.style.maxHeight = null;

    if (shouldScrollBack) {
      requestAnimationFrame(() => {
        scrollToCard(skillCard);
      });
    }
  }

  function openCard(skillCard) {
    const toggleButton = skillCard.querySelector(".skill-card-toggle");
    const content = skillCard.querySelector(".skill-card-content");

    skillCard.classList.add("open");
    toggleButton.setAttribute("aria-expanded", "true");
    content.style.maxHeight = `${content.scrollHeight}px`;
  }

  skillCards.forEach((skillCard) => {
    const toggleButton = skillCard.querySelector(".skill-card-toggle");
    const content = skillCard.querySelector(".skill-card-content")

    toggleButton.addEventListener("click", () => {
      const isOpen = skillCard.classList.contains("open");

      if (isOpen) {
        closeCard(skillCard, { scrollBack: true });
      } else {
        openCard(skillCard);
      }

    });

    content.addEventListener("click", (event) => {
      if (event.target.closest(".skill-badge")) return;
      closeCard(skillCard, { scrollBack: true });
    });
  });

  window.addEventListener("resize", () => {
    const openCards = document.querySelectorAll(".skill-card.open");

    openCards.forEach((openCardElement) => {
      const content = openCardElement.querySelector(".skill-card-content");
      content.style.maxHeight = `${content.scrollHeight}px`;
    });
  });
}
