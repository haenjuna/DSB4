const body = document.querySelector("body");
const hero = document.querySelector(".fly");
let FPS = 60;

let width,
  height,
  velocityX = 1,
  velocityY = 1,
  pause = true;

setInterval(() => {
  if (pause) return;

  let rect = hero.getBoundingClientRect();
  let left = rect.x;
  let top = rect.y;

  if (left + rect.width >= width || left <= 0) {
    velocityX = -velocityX;
  }

  if (top + rect.height >= height || top <= 0) {
    velocityY = -velocityY;
  }

  hero.style.left = rect.x + velocityX + "px";
  hero.style.top = rect.y + velocityY + "px";
  if (isHeroCaught) {
    pause = true;
    if (hero.classList.contains("ironman")) {
      hero.style.backgroundImage = "url('../../images/dh/ironman/fly2.png')";
    } else if (hero.classList.contains("spiderman")) {
      hero.style.backgroundImage = "url('../../images/dh/spiderman/fly2.png')";
    } else if (hero.classList.contains("dr-strange")) {
      hero.style.backgroundImage = "url('../../images/dh/dr-strange/fly2.png')";
    }
  }
}, 1000 / FPS);

const reset = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  pause =
    width <= hero.getBoundingClientRect().width ||
    height <= hero.getBoundingClientRect().height;

  hero.style.left = "calc(50vw - 40px)";
  hero.style.top = "calc(50vh - 40px)";
};

reset();

console.log(
  width <= hero.getBoundingClientRect().width ||
    height <= hero.getBoundingClientRect().height
);

window.addEventListener("resize", reset, true);

let isHeroCaught = false;
hero.addEventListener("mouseover", () => {
  isHeroCaught = true;
});
hero.addEventListener("mouseout", () => {
  isHeroCaught = false;
  pause = false;
  if (hero.classList.contains("ironman")) {
    hero.style.backgroundImage = "url('../../images/dh/ironman/fly.png')";
  } else if (hero.classList.contains("spiderman")) {
    hero.style.backgroundImage = "url('../../images/dh/spiderman/fly.png')";
  } else if (hero.classList.contains("dr-strange")) {
    hero.style.backgroundImage = "url('../../images/dh/dr-strange/fly.png')";
  }
});
