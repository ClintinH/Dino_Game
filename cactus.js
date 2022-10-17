import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const cactusSpeed = 0.05;
const cactusIntervalMin = 500;
const cactusIntervalMax = 2000;
const worldEl = document.querySelector("[data-world]");

let nextCactusTime;

export function setupCactus() {
  nextCactusTime = cactusIntervalMin;
  document
    .querySelectorAll("[data-cactus]")
    .forEach((cactus) => cactus.remove());
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(
      cactus,
      "--left",
      delta * speedScale * cactusSpeed * -1
    );

    if (getCustomProperty(cactus, "--left") < -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomNumberBetween(cactusIntervalMin, cactusIntervalMax) / speedScale;
  }
  nextCactusTime -= delta;
}

export function getcactusRect() {
  return [...document.querySelectorAll("[data-cactus]")].map((cactus) =>
    cactus.getBoundingClientRect()
  );
}

function createCactus() {
  const cactus = document.createElement("img");
  cactus.dataset.cactus = true;
  cactus.src = "imgs/cactus.png";
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  worldEl.append(cactus);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
