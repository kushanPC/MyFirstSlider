import dataSlides from './data.js';

let currentSlide = 0;
let div;

const slide = document.getElementById('image');
const pagination = document.getElementById('pagination');
const prevSlide = document.querySelector('.btn-left');
const nextSlide = document.querySelector('.btn-right');
const dotArray = document.getElementsByClassName('dot');

let timerId =
  setTimeout(() => {
    onClickNextSlide();
  }, 8000);


function slider(image) {
  slide.style.backgroundImage = `url(${dataSlides.slides[image]})`;

  for (let i = 0; i < dotArray.length; i += 1) {
    dotArray[i].classList = 'dot';
  }

  currentSlide = image;

  dotArray[image].classList = 'dot active';
}

function onClickNextSlide() {
  currentSlide += 1;
  if (currentSlide === dataSlides.slides.length) {
    currentSlide = 0;
  }
  slider(currentSlide);

  clearTimeout(timerId);
  timerId = setTimeout(onClickNextSlide, 8000);
}
function onClickPreviousSlide() {
  currentSlide -= 1;
  if (currentSlide < 0) {
    currentSlide = dataSlides.slides.length - 1;
  }
  slider(currentSlide);
}

function onclickPagination() {
  const dot = event.target;

  if (dot.className !== 'dot') {
    return;
  }

  for (let i = 0; i < dotArray.length; i += 1) {
    dotArray[i].classList = 'dot';
  }

  slider(Number(dot.dataset.indexNumber));
  dot.classList = 'dot active';
}

prevSlide.addEventListener('click', onClickPreviousSlide);

nextSlide.addEventListener('click', onClickNextSlide);

pagination.addEventListener('click', onclickPagination);

dataSlides.slides.forEach((item, i) => {
  div = document.createElement('div');
  div.dataset.indexNumber = i;
  div.classList = 'dot';
  pagination.append(div);
});

window.onload = function startSlider() {
  slider(currentSlide);
};
