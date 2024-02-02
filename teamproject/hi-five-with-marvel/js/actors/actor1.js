/* Carousel */
const carouselContainer = document.querySelector(".carousel-container");
const screenshot = carouselContainer.querySelector("img");
const btnLeft = carouselContainer.querySelector(".carousel-btn-left");
const btnRight = carouselContainer.querySelector(".carousel-btn-right");

const screenshotUrl = [
  "../../images/dh/ironman/screenshot1.gif",
  "../../images/dh/ironman/screenshot2.gif",
  "../../images/dh/ironman/screenshot3.gif",
];

let currentIndex = 0;

const previousScreenshot = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = screenshotUrl.length - 1;
  }
  screenshot.src = screenshotUrl[currentIndex];
};

const nextScreenshot = () => {
  currentIndex++;
  if (currentIndex >= screenshotUrl.length) {
    currentIndex = 0;
  }
  screenshot.src = screenshotUrl[currentIndex];
};

btnLeft.addEventListener("click", previousScreenshot);

btnRight.addEventListener("click", nextScreenshot);
