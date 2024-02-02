const carousel = document.querySelector("#carousel"); // 캐러셀 영역
const pics = [
  "avengersendgame.png",
  "spiderman.jpg",
  "doctorstrange2.jpg",
  "marvles2.jpg",
]; // 이미지 배열

carousel.style.backgroundImage = `url(../../images/hj/${pics[0]})`; // 첫번째 이미지 기본으로 표시

const arrows = document.querySelectorAll(".arrow"); // 화살표
carousel.style.backgroundRepeat = "no-repeat";
carousel.style.backgroundSize = "100%";
let i = 0; // 배열 인덱스

arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    if (e.target.id === "left") {
      // 왼쪽 화살표 클릭?
      i--; // 이전 이미지로 이동
      if (i < 0) {
        // 첫번째 이미지?
        i = pics.length - 1; // 맨 마지막 이미지로 이동
      }
    } else if (e.target.id == "right") {
      // 오른쪽 화살표 클릭?
      i++; // 다음 이미지로 이동
      if (i >= pics.length) {
        // 마지막 이미지?
        i = 0; // 첫번째 이미지로 이동
      }
    }
    carousel.style.backgroundImage = `url(../../images/hj/${pics[i]})`; // 현재 이미지 표시
  });
});
