import { initDiscordCopy } from "./discord-copy.js";
import { initScrollSpy } from "./scroll-spy.js";
import { initMobileNav } from "./mobile-nav.js";
import { initSkillCards } from "./skill-card.js";
import { initProjectMiniCards } from "./project-mini-card.js"
import { initAboutEasterEgg } from "./about-easter-egg.js"

document.addEventListener("DOMContentLoaded", () => {
  initDiscordCopy();
  initScrollSpy();
  initMobileNav();
  initSkillCards();
  initProjectMiniCards();
  initAboutEasterEgg();
});
