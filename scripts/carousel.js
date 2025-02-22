const carousel = document.querySelector(".carousel");

const firstImg = carousel.querySelectorAll(".carousel img")[0];

const rightbtn = document.querySelector(".carousel__btn--right");
const leftbtn = document.querySelector(".carousel__btn--left");

let isDragStart = false,
  prevPageX,
  prevScrollLeft;

let firstImgWidth = firstImg.clientWidth + 30;

rightbtn.addEventListener("click", () => {
  carousel.scrollLeft += firstImgWidth;
});
leftbtn.addEventListener("click", () => {
  carousel.scrollLeft += -firstImgWidth;
});
