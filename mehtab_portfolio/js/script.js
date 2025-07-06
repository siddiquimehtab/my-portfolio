// ========== Typing Animation ==========
const phrases = [
  "Data Analyst 📊",
  "Machine Learning Enthusiast 🤖",
  "Dashboard Designer 📈",
  "Pythonista 🐍",
  "SQL Sorcerer 🧙‍♂️",
  "Spreadsheet Whisperer 🧾"
];

const roleText = document.getElementById("typed-role-text");
const roleEmoji = document.getElementById("typed-role-emoji");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let delay = 150;
let baseText = "";
let emoji = "";
// Extract text and emoji separately
function extractTextAndEmoji(phrase) {
  const match = phrase.match(/^(.*?)([\u{1F300}-\u{1FAFF}|\u2600-\u26FF]?)$/u);
  return {
    text: match ? match[1].trim() : phrase,
    emoji: match ? match[2] : ""
  };
}

// Typing effect
function type() {
  const { text, emoji: currentEmoji } = extractTextAndEmoji(phrases[phraseIndex]);

  if (!isDeleting && charIndex <= text.length) {
    roleText.textContent = text.substring(0, charIndex);
    roleEmoji.textContent = currentEmoji;
    charIndex++;
    setTimeout(type, delay/2);
  } else if (isDeleting && charIndex >= 0) {
    roleText.textContent = text.substring(0, charIndex);
    roleEmoji.textContent = currentEmoji;
    charIndex--;
    setTimeout(type, delay / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 1000);
  }
}

// ========== Navbar Scroll Highlight ==========
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function activateNavLink() {
  let scrollPos = window.scrollY + window.innerHeight / 3;
  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${section.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", activateNavLink);
document.addEventListener("DOMContentLoaded", () => {
  type();
  activateNavLink(); // initialize on load
});

// ========== Open GitHub Repo on Project Click ==========
function openRepo(url) {
  window.open(url, "_blank");
}

// ========== Magic Cleanup Logic ==========
document.addEventListener("DOMContentLoaded", () => {
  type();
  activateNavLink();

  document.body.classList.add("messy");

  // Randomize sections as before (assuming your existing logic)
  const sections = document.querySelectorAll("main section");
  sections.forEach((section) => {
    section.style.setProperty('--rand-x', `${Math.floor(Math.random() * 400 - 200)}px`);
    section.style.setProperty('--rand-y', `${Math.floor(Math.random() * 300 - 150)}px`);
    section.style.setProperty('--rand-rotate', `${Math.floor(Math.random() * 30 - 15)}deg`);
    section.style.setProperty('--rand-z', `${Math.floor(Math.random() * 100)}`);
  });

  // Create message + magic button container if not already created
  let container = document.getElementById("magic-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "magic-container";

    const message = document.createElement("div");
    message.id = "messy-message";
    message.textContent =
      "⚠️ Wow, This is chaos — just like raw, unstructured data. But don’t worry — I’m the one who turns mess into meaning. Click the magic button below to see how I bring clarity — just like I do with messy data!";

    const magicBtn = document.createElement("button");
    magicBtn.id = "magic-button";
    magicBtn.textContent = "✨ magic button!";

    container.appendChild(message);
    container.appendChild(magicBtn);
    document.body.appendChild(container);

    magicBtn.addEventListener("click", () => {
      document.body.classList.remove("messy");
      sections.forEach((section) => {
        section.style.removeProperty('top');
        section.style.removeProperty('left');
        section.style.removeProperty('transform');
        section.style.removeProperty('z-index');
        section.style.removeProperty('--rand-x');
        section.style.removeProperty('--rand-y');
        section.style.removeProperty('--rand-rotate');
        section.style.removeProperty('--rand-z');
      });
      container.remove();
    });
  }
});