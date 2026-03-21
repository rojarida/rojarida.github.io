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

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavLink() {
  const headerOffset = 120;
  const scrollPosition = window.scrollY + headerOffset

  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((navLink) => {
    const linkTarget = navLink.getAttribute("href").slice(1);
    navLink.classList.toggle("active", linkTarget === currentSectionId);
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);
