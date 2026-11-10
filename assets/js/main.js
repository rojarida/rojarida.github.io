import { initDiscordCopy } from "./discord-copy.js";
import { initScrollSpy } from "./scroll-spy.js";
import { initMobileNav } from "./mobile-nav.js";
import { initSkillCards } from "./skill-cards.js";

document.addEventListener("DOMContentLoaded", () => {
  initDiscordCopy();
  initScrollSpy();
  initMobileNav();
  initSkillCards();
});
