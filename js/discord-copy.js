let hideTooltipTimeout;

export function initDiscordCopy() {
  const discordButton = document.querySelector(".discord-button");
  const discordTooltip = document.querySelector(".discord-tooltip");

  if (!discordButton || !discordTooltip) return;

  const defaultTooltipText = "Copy Discord";
  discordTooltip.textContent = defaultTooltipText;
  
  discordButton.addEventListener("click", async () => {
    clearTimeout(hideTooltipTimeout);

    const discordUsername = discordButton.dataset.discord;

    try {
      await navigator.clipboard.writeText(discordUsername);

      discordTooltip.textContent = "Username copied!";
    } catch (error) {
      discordTooltip.textContent = "Failed to copy";
    }

    discordTooltip.classList.add("show");

    hideTooltipTimeout = setTimeout(() => {
      discordTooltip.classList.remove("show");
    }, 1500);
  });
}
