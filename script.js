/* Public site details. The idea desk runs entirely in this browser. */
const SITE_CONFIG = {
  contactEmail: "nataliaefimova.com@gmail.com",
  founderName: "Natalia Efimova"
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const photoGalleries = {
  hero: [
    { image: "assets/hero-triptych.png", size: "cover", position: "center", alt: "Friends laughing, dancing and celebrating", note: "This is the one they still talk about." },
    { image: "assets/flash-moments.png", size: "200% 200%", position: "0% 0%", alt: "Friends laughing over a lopsided birthday cake", note: "The cake had other plans." },
    { image: "assets/flash-moments.png", size: "200% 200%", position: "100% 0%", alt: "Friends laughing on a coastal road trip", note: "The detour became the point." },
    { image: "assets/flash-moments.png", size: "200% 200%", position: "0% 100%", alt: "Friends dancing in improvised party hats", note: "No one planned this dance." },
    { image: "assets/diverse-moments.png", size: "200% 200%", position: "100% 100%", alt: "Friends of different ages toasting on a rooftop at blue hour", note: "The small plan grew wings." }
  ]
};

const galleryButtons = document.querySelectorAll(".capture-photo");
let lastManualFlash = 0;

function setPhotoFrame(button, index) {
  const gallery = photoGalleries[button.dataset.gallery];
  const frame = gallery[index];
  const surface = button.querySelector(".hero-photo-media") || button;
  surface.style.backgroundImage = `url("${frame.image}")`;
  surface.style.backgroundSize = frame.size;
  surface.style.backgroundPosition = frame.position;
  button.dataset.frameIndex = String(index);
  button.querySelector(".photo-note").textContent = frame.note;
  button.setAttribute("aria-label", `Show another photograph. ${index + 1} of ${gallery.length}: ${frame.alt}. ${frame.note}`);
  const counter = button.querySelector(".frame-index");
  if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(gallery.length).padStart(2, "0")}`;
}

function advancePhoto(button, manual = true) {
  if (button.dataset.busy === "true") return;
  const gallery = photoGalleries[button.dataset.gallery];
  const nextIndex = (Number(button.dataset.frameIndex || 0) + 1) % gallery.length;
  if (manual) lastManualFlash = Date.now();
  if (reducedMotion.matches) {
    setPhotoFrame(button, nextIndex);
    button.classList.add("is-revealed");
    return;
  }
  button.dataset.busy = "true";
  button.classList.remove("is-flashing");
  void button.offsetWidth;
  button.classList.add("is-flashing");
  window.setTimeout(() => {
    setPhotoFrame(button, nextIndex);
    button.classList.add("is-revealed");
  }, 115);
  window.setTimeout(() => {
    button.classList.remove("is-flashing");
    button.dataset.busy = "false";
  }, 500);
}

galleryButtons.forEach((button) => {
  setPhotoFrame(button, 0);
  button.addEventListener("click", () => advancePhoto(button));
});

["assets/flash-moments.png", "assets/diverse-moments.png"].forEach((src) => {
  const image = new Image();
  image.src = src;
});

const heroPhoto = document.querySelector(".hero-photo");
let heroVisible = true;
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; }, { threshold: .2 }).observe(heroPhoto);
}
window.setInterval(() => {
  if (heroVisible && !document.hidden && !reducedMotion.matches && !document.querySelector(".idea-dialog").open && Date.now() - lastManualFlash > 9000) {
    advancePhoto(heroPhoto, false);
  }
}, 6500);

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  nav.classList.remove("is-open");
}
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  nav.classList.toggle("is-open", !isOpen);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const chatDialog = document.querySelector(".idea-dialog");
const chatTrigger = document.querySelector(".contact-link");
const chatClose = document.querySelector(".chat-close");
const chatForm = document.querySelector(".chat-form");
const chatInput = document.querySelector("#chat-input");
const chatLog = document.querySelector(".chat-log");
const chatPrompts = document.querySelector(".chat-prompts");
const chatHandoff = document.querySelector(".chat-handoff");
const chatEmail = document.querySelector(".chat-email");
const chatCopy = document.querySelector(".chat-copy");
const chatCopyStatus = document.querySelector(".chat-copy-status");
const visitorMessages = [];

chatTrigger.addEventListener("click", () => {
  chatDialog.showModal();
  document.body.classList.add("chat-open");
  chatInput.focus();
});
chatClose.addEventListener("click", () => chatDialog.close());
chatDialog.addEventListener("click", (event) => {
  if (event.target === chatDialog) chatDialog.close();
});
chatDialog.addEventListener("close", () => {
  document.body.classList.remove("chat-open");
  chatTrigger.focus();
});

function addChatMessage(speaker, text) {
  const message = document.createElement("div");
  message.className = `chat-message chat-message-${speaker}`;
  const label = document.createElement("span");
  label.className = "chat-speaker";
  label.textContent = speaker === "user" ? "YOU" : "THE IDEA DESK";
  const content = document.createElement("p");
  content.textContent = text;
  message.append(label, content);
  chatLog.append(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function assistantReply(message, turn) {
  const idea = message.toLowerCase();
  if (/\b(budget|cost|price)\b|how much/.test(idea)) return "A good idea can take different shapes. Share the budget you're comfortable with when you email Natalia, and she can shape the plan around it.";
  if (/outside spain|other countr|abroad/.test(idea)) return "Spain is our starting point. Tell Natalia where you're dreaming of going, and she can say what's possible.";
  if (turn === 1 && /propos|marry|engag/.test(idea)) return "A proposal with a personality. What's the detail only the two of you would understand? One line is plenty.";
  if (turn === 1 && /trip|travel|journey|weekend|road/.test(idea)) return "A trip with its own plot. What's the unexpected detour, feeling or place that would make it yours?";
  if (turn === 1 && /birth|party|celebrat|dinner|reunion/.test(idea)) return "That sounds like your kind of gathering. What's the little detail your people would recognize immediately?";
  if (turn === 1) return "I like where this is going. What would make your friends say, ‘Only you would’?";
  if (turn === 2) return "Now it has a twist. If you already know a place, date or group size, tell me. If not, this is enough for Natalia to start with.";
  return "Got it. Add anything else that matters, or open the email draft whenever you're ready for Natalia to take it from here.";
}

function draftText() {
  return `Hi Natalia,\n\nI have an idea I'd love to explore:\n\n${visitorMessages.map((message, index) => `${index + 1}. ${message}`).join("\n\n")}\n\nI'd love to hear what we could make of it.\n`;
}
function updateHandoff() {
  chatHandoff.hidden = false;
  const subject = encodeURIComponent("An idea for Only You Would");
  chatEmail.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${encodeURIComponent(draftText())}`;
}
function sendIdea(rawText) {
  const message = rawText.trim().slice(0, 500);
  if (!message) return;
  visitorMessages.push(message);
  addChatMessage("user", message);
  addChatMessage("assistant", assistantReply(message, visitorMessages.length));
  chatPrompts.hidden = true;
  chatInput.value = "";
  updateHandoff();
  chatInput.focus();
}
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendIdea(chatInput.value);
});
chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});
chatPrompts.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => sendIdea(button.dataset.prompt)));
chatCopy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(draftText());
    chatCopyStatus.textContent = "Copied. Paste it wherever you like.";
  } catch {
    chatCopyStatus.textContent = "Copy isn't available here. Use the email draft instead.";
  }
});

const directEmail = document.querySelector(".contact-status a");
directEmail.href = `mailto:${SITE_CONFIG.contactEmail}`;
directEmail.textContent = SITE_CONFIG.contactEmail;
if (SITE_CONFIG.founderName.trim()) {
  document.querySelector(".person-copy > p").textContent = `I'm ${SITE_CONFIG.founderName.trim()}, the person you'll speak to from the first thought to the final detail. I'll help shape the concept, bring the right people together and keep the practical side moving, so the unexpected part feels easy.`;
}
document.querySelector("#year").textContent = String(new Date().getFullYear());
