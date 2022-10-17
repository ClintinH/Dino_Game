import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getdinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getcactusRect } from "./cactus.js";
import { setupCloud, updateCloud } from "./clouds.js";

const worldWidth = 100;
const worldHeight = 30;
const speedScaleIncrease = 0.00001;

let lastTime;
let speedScale = 1;
let score = 0;

const worldEl = document.querySelector("[data-world]");
const scoreEl = document.querySelector("[data-score]");
const startScreen = document.querySelector("[data-start-screen]");
const audio = document.querySelector("[data-audio]");

setPixelWorldScale();
window.addEventListener("resize", setPixelWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

// GameLoop
function update(time) {
  // Prevents first delta to have huge number
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  let delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  updateCloud(delta, speedScale);
  if (checkLose()) return handleLose();

  lastTime = time; // update lastTime variable
  window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
  speedScale += delta * speedScaleIncrease;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreEl.textContent = Math.floor(score);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  audio.play();
  setupDino();
  setupCactus();
  setupGround();
  setupCloud();
  startScreen.classList.add("hide");
  window.requestAnimationFrame(update);
}

function handleLose() {
  audio.pause();
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
  }, 100);
  startScreen.classList.remove("hide");
}

function setPixelWorldScale() {
  let worldPixelScale;
  if (window.innerWidth / window.innerHeight < worldWidth / worldHeight) {
    worldPixelScale = window.innerWidth / worldWidth;
  } else {
    worldPixelScale = window.innerHeight / worldHeight;
  }

  worldEl.style.width = `${worldWidth * worldPixelScale}px`;
  worldEl.style.height = `${worldHeight * worldPixelScale}px`;
}

function checkLose() {
  const dinoRect = getdinoRect();
  return getcactusRect().some((rect) => isCollisionSmaller(rect, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function isCollisionSmaller(rect1, rect2) {
  return (
    rect1.left + 25 < rect2.right &&
    rect1.top + 25 < rect2.bottom &&
    rect1.right - 50 > rect2.left &&
    rect1.bottom + 25 > rect2.top
  );
}
