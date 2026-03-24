export function initSkillCards() {
  const skillCards = document.querySelectorAll(".skill-card");

  if (!skillCards.length) return;

  function scrollToCard(skillCard) {
    const header = document.querySelector(".site-header");
    const headerOffset = header ? header.offsetHeight : 0;
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

    skillCard.classList.remove("open");
    toggleButton.setAttribute("aria-expanded", "false");
    content.style.maxHeight = null;

    if (scrollBack) {
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

      skillCards.forEach((card) => {
        if (card !== skillCard) closeCard(card);
      });

      if (isOpen) {
        closeCard(skillCard, { scrollBack: true });
      } else {
        openCard(skillCard);
      }

    });

    content.addEventListener("click", () => {
      if (event.target.closest(".skill-badge")) return;
      closeCard(skillCard, { scrollBack: true });
    });
  });

  window.addEventListener("resize", () => {
    const openCardElement = document.querySelector(".skill-card.open");

    if (!openCardElement) return;

    const content = openCardElement.querySelector(".skill-card-content");
    content.style.maxHeight = `${content.scrollHeight}px`;
  });
}
