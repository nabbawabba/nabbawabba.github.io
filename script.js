const confettiLayer = document.querySelector(".confetti-layer");
const resumeTriggers = document.querySelectorAll(".resume-trigger");

const confettiPalette = ["#4f7fbc", "#79a9e8", "#9bc4ff", "#d6ebff", "#b1d2fb"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(type, originX, originY) {
  const piece = document.createElement(type === "cat" ? "img" : "span");
  piece.className = `confetti-piece confetti-piece-${type}`;
  piece.style.setProperty("--origin-x", `${originX}px`);
  piece.style.setProperty("--origin-y", `${originY}px`);
  piece.style.setProperty("--travel-x", `${randomBetween(-170, 170)}px`);
  piece.style.setProperty("--travel-y", `${randomBetween(-240, 120)}px`);
  piece.style.setProperty("--spin", `${randomBetween(-240, 240)}deg`);
  piece.style.setProperty("--duration", `${randomBetween(1100, 1800)}ms`);
  piece.style.setProperty("--confetti-color", confettiPalette[Math.floor(Math.random() * confettiPalette.length)]);

  if (type === "cat") {
    piece.src = "cscat.svg";
    piece.alt = "";
    piece.setAttribute("aria-hidden", "true");
  }

  piece.addEventListener("animationend", () => {
    piece.remove();
  });

  return piece;
}

function burstConfetti(event) {
  if (!confettiLayer) {
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const particleTypes = [
    ...Array.from({ length: 18 }, () => "chip"),
    ...Array.from({ length: 14 }, () => "dot"),
    ...Array.from({ length: 10 }, () => "star"),
    ...Array.from({ length: 5 }, () => "cat"),
  ];

  particleTypes.forEach((type, index) => {
    const piece = createParticle(type, originX, originY);
    piece.style.animationDelay = `${index * 12}ms`;
    confettiLayer.appendChild(piece);
  });
}

resumeTriggers.forEach((trigger) => {
  trigger.addEventListener("click", burstConfetti);
});
