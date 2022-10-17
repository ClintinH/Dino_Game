import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const speed = 0.003;
const smallCloudsEl = document.querySelectorAll("[data-small-cloud]");

export function setupCloud() {
  setCustomProperty(smallCloudsEl[0], "--left", 100);
  setCustomProperty(smallCloudsEl[1], "--left", 200);
}

export function updateCloud(delta, speedscale) {
  smallCloudsEl.forEach((cloud) => {
    incrementCustomProperty(cloud, "--left", delta * speedscale * speed * -1);

    if (getCustomProperty(cloud, "--left") <= -100) {
      incrementCustomProperty(cloud, "--left", 200);
    }
  });
}
