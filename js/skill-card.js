export function initSkillCards() {
  const skillCards = document.querySelectorAll(".skill-card");

  if (!skillCards.length) return;

  function closeCard(skillCard) {
    const toggleButton = skillCard.querySelector(".skill-card-toggle");
    const content = skillCard.querySelector(".skill-card-content");

    skillCard.classList.remove("open");
    toggleButton.setAttribute("aria-expanded", "false");
    content.style.maxHeight = null;
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

    toggleButton.addEventListener("click", () => {
      const isOpen = skillCard.classList.contains("open");

      skillCards.forEach((card) => closeCard(card));

      if (!isOpen) openCard(skillCard);
    });
  });

  window.addEventListener("resize", () => {
    const openCardElement = document.querySelector(".skill-card.open");

    if (!openCardElement) return;

    const content = openCardElement.querySelector(".skill-card-content");
    content.style.maxHeight = `${content.scrollHeight}px`;
  });
}
