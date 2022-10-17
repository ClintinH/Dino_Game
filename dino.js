import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const dinoEl = document.querySelector("[data-dino]");
const jumpSpeed = 0.45;
const gravity = 0.0018;
const DinoFrameCount = 2;
const frameTime = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
let id;

export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  id = randomDinoId();
  setCustomProperty(dinoEl, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function getdinoRect() {
  return dinoEl.getBoundingClientRect();
}

export function setDinoLose() {
  dinoEl.src = `imgs/${id}-dino-lose.png`;
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoEl.src = `imgs/${id}-dino-stationary.png`;
    return;
  }

  if (currentFrameTime >= frameTime) {
    //loop frames when it reaches 10 frames to loop back to first frame
    dinoFrame = (dinoFrame + 1) % DinoFrameCount;

    // move animation between two pngs to similate running
    dinoEl.src = `imgs/${id}-dino-run-${dinoFrame}.png`;
    currentFrameTime -= frameTime;
  }
  currentFrameTime += delta * speedScale; // will let the dino run faster and faster and the defficult level increase
}

function handleJump(delta) {
  incrementCustomProperty(dinoEl, "--bottom", yVelocity * delta);

  if (getCustomProperty(dinoEl, "--bottom") <= 0) {
    setCustomProperty(dinoEl, "--bottom", 0);
    isJumping = false;
  }

  yVelocity -= gravity * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;
  yVelocity = jumpSpeed;
  isJumping = true;
}

function randomDinoId() {
  return Math.floor(Math.random() * 3);
}
