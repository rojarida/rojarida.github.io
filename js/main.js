const discordCopyButton = document.querySelector(".discord-copy-button");
const discordTooltip = document.querySelector(".discord-tooltip");

if (discordCopyButton && discordTooltip) {
  discordCopyButton.addEventListener("click", async () => {
    const discordUsername = discordCopyButton.dataset.discord;

    try {
      await navigator.clipboard.writeText(discordUsername);
      discordTooltip.textContent = "Username copied!";
    } catch (error) {
      discordTooltip.textContent = "Could not copy.";
    }

    discordTooltip.classList.add("show");

    setTimeout(() => {
      discordTooltip.classList.remove("show");
    }, 1500);
  });
}
