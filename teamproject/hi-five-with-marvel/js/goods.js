const navBottomMid = document.querySelector(".nav-bottom-mid");

const lists = navBottomMid.querySelectorAll("li");

const focus = (event) => {
  lists.forEach((list) => {
    list.style.color = "rgba(150,150,150,0.8)";
  });
  event.target.style.color = "var(--color-white)";
};

lists.forEach((list) => {
  list.addEventListener("mouseover", focus);
});

const open = document.querySelector("#open");
const navMenu = document.querySelector(".nav-menu");
const close = document.querySelector("#close");
console.log(open);

const slideIn = () => {
  navMenu.classList.remove("inactive");
  navMenu.classList.add("active");
}
const slideOut = () => {
  navMenu.classList.add("inactive");
  navMenu.classList.remove("active");
}
close.addEventListener("click",slideOut)
open.addEventListener("click", slideIn)

// nav-menu2
const open2 = document.querySelectorAll(".menu-arrow");
const navMenu2 = document.querySelector(".nav-menu2");
const close2 = document.querySelector("#close2");

const slideIn2 = () => {
  navMenu2.classList.add("active2");
  navMenu2.classList.remove("inactive2");
}
const slideOut2 = () => {
  navMenu2.classList.add("inactive2");
  navMenu2.classList.remove("active2");
}
close2.addEventListener("click",slideOut2)

open2.forEach((arrow)=>{
  arrow.addEventListener("click",slideIn2);
})

/* Header animation*/
const header = document.body.querySelector("header");
const main = document.querySelector("main");
const headerTitle = document.querySelector(".nav-top-title");

let lastScroll =  0;
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const scrollUp = scrollY < lastScroll;

  if (scrollY > 52) {
    if (scrollUp) {
      header.classList.add("headerActive");
      header.classList.remove("headerInactive");
    } else {
      header.classList.remove("headerActive");
      header.classList.add("headerInactive");
      headerTitle.innerText = "M"
    }
  } else {
    header.classList.remove("fixed");
    header.classList.remove("headerActive");
    header.classList.remove("headerInactive");
  }

  if (scrollY === 0) {
    
    headerTitle.innerText = "MARVEL"
  }
  
  lastScroll = scrollY
})

const detail = document.querySelector("p")

detail.addEventListener("click", (e) => {
  window.location.href = ""
})

const carouselContainer = document.querySelector(".product");
const screenshot = carouselContainer.querySelector("img");
const btnLeft = carouselContainer.querySelector(".left");
const btnRight = carouselContainer.querySelector(".right");

const screenshotUrl = [
  "../images/jh/carousel/pic01.jpg",
  "../images/jh/carousel/pic02.jpg",
  "../images/jh/carousel/pic03.jpg",
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

// const buy = document.querySelector("#buybtn")
// console.log(buy)
// buy.addEventListener("click", (e) => {
//   console.log("Button clicked!");
//   window.location.href = "../../html/products/ironman.html"
// })

const box01 = document.querySelector("#box01")
// console.log(boxes)
box01.addEventListener("click", (e) => {
  window.location.href = "https://youtube.com/shorts/mUksoZNUzzc?feature=shared"
});

const box02 = document.querySelector("#box02")
// console.log(boxes)
box02.addEventListener("click", (e) => {
  window.location.href = "https://blog.naver.com/ohho52/222943274696"
});

const box03 = document.querySelector("#box03")
// console.log(boxes)
box03.addEventListener("click", (e) => {
  window.location.href = "https://www.instagram.com/reel/CO5Jz9aAEEF/?igsh=MjBrNHozNW84andy"
});