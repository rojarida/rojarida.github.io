export function initDiscordCopy() {
  const button = document.querySelector(".discord-button");
  const tooltip = document.querySelector(".discord-tooltip");

  if (!button || !tooltip) return;
  let timer;
  button.addEventListener("click", async () => {
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(button.dataset.discord);
      tooltip.textContent = "Username copied!";
    } catch {
      tooltip.textContent = `Discord: ${button.dataset.discord}`;
    }
    tooltip.classList.add("show");
    timer = setTimeout(() => tooltip.classList.remove("show"), 4000);
  });
}
