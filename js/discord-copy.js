export function initDiscordCopy() {
  const discordButton = document.querySelector(".discord-button");
  const discordTooltip = document.querySelector(".discord-tooltip");

  if (!discordButton || !discordTooltip) return;
  
  discordButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("romanjay");
      discordTooltip.textContent = "Username copied!";
      discordButton.classList.add("copied");

      setTimeout(() => {
        discordTooltip.textContent = "Copy Discord";
        discordButton.classList.remove("copied");
      }, 1500);
    } catch (error) {
      discordTooltip.textContent = "Failed to copy";
    }
  });
}
