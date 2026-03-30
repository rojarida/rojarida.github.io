export function initProjectMiniCards() {
  const labProjectCards = document.querySelectorAll(".lab-project-card");

  if (!labProjectCards.length) return;

  labProjectCards.forEach((labProjectCard) => {
    const tags = labProjectCard.querySelectorAll(".lab-project-tags span");

    tags.forEach((tag) => {
      tag.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
    });
  });
}
