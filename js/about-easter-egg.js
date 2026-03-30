export function initAboutEasterEgg() {
  const hobbiesCard = document.querySelector("#hobbies-card");

  if (!hobbiesCard) return;

  const frontFace = hobbiesCard.querySelector(".about-card-front");
  const backFace = hobbiesCard.querySelector(".about-card-back");

  let clickCount = 0;
  let clickTimer = null;

  function resetClickSequence() {
    clickCount = 0;

    if (clickTimer) {
      window.clearTimeout(clickTimer);
      clickTimer = null;
    }
  }

  function setFlippedState(isFlipped) {
    hobbiesCard.classList.toggle("is-flipped", isFlipped);
    frontFace.setAttribute("aria-hidden", String(isFlipped));
    backFace.setAttribute("aria-hidden", String(!isFlipped));
  }

  hobbiesCard.addEventListener("click", () => {
    const selectedText = window.getSelection()?.toString().trim();

    if (selectedText) return;

    const isFlipped = hobbiesCard.classList.contains("is-flipped");

    if (isFlipped) {
      setFlippedState(false);
      resetClickSequence();
      return;
    }

    clickCount += 1;

    if (clickTimer) window.clearTimeout(clickTimer);

    clickTimer = window.setTimeout(() => {
      resetClickSequence();
      }, 300);

    if (clickCount === 3) {
      setFlippedState(true);
      resetClickSequence();
    }
  });
  setFlippedState(false);
}
