"use strict";
import dataSlides from './data.js';

let currentSlide = 0;
let div;

const slide = document.getElementById('image');
const pagination = document.getElementById('pagination');
const prevSlide =  document.querySelector('.btn-left');
const nextSlide =  document.querySelector('.btn-right');
const dotArray =  document.getElementsByClassName('dot');

let timerId =
  setTimeout(function() {
    onClickNextSlide();
  },8000);

function slider(image) {
  slide.style.backgroundImage = `url(${dataSlides.slides[image]})`;

  for (let i = 0; i < dotArray.length; i++) {
    dotArray[i].className = 'dot';
  }

  currentSlide = image;

  dotArray[image].className = 'dot active';
}

function onClickNextSlide(){
 currentSlide += 1;
 if (currentSlide === dataSlides.slides.length) {
   currentSlide = 0;
 }
 slider(currentSlide);


 clearTimeout(timerId);
 timerId =
   setTimeout(function() {
     onClickNextSlide();
   },8000);
}

function onClickPreviousSlide() {
  currentSlide -= 1;
  if (currentSlide < 0) {
    currentSlide = dataSlides.slides.length - 1;
  }
  slider(currentSlide);
}

function onclickPagination() {
  let dot = event.target;

  if (dot.className != 'dot') {
    return;
  }

  for (let i = 0; i < dotArray.length; i++) {
    dotArray[i].className = 'dot';
  }

  slider(Number(dot.dataset.indexNumber));
  dot.className = 'dot active';
}

prevSlide.addEventListener('click', onClickPreviousSlide);

nextSlide.addEventListener('click', onClickNextSlide);

pagination.addEventListener('click', onclickPagination);

dataSlides.slides.forEach(function(item, i, arr) {
  div = document.createElement('div');
  div.dataset.indexNumber = i;
  div.className = 'dot';
  pagination.append(div);
});

window.onload = function() {
	slider(currentSlide);
};
