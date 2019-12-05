"use strict";
import dataSlides from './data.js';

let currentImg = 0;
let slide = document.getElementById('image');

let div;
let pagination = document.getElementById('pagination');
let prevSlide =  document.getElementsByClassName('btn-left');
let nextSlide =  document.getElementsByClassName('btn-right');

let dotArray =  document.getElementsByClassName("dot");

function slider(image) {
 	slide.style.backgroundImage = 'url('+dataSlides.slides[image]+')';

  for (let image = 0; image < dotArray.length; image++) {
    dotArray[image].className = 'dot';
  }

  dotArray[image].className = 'dot dot-active';
}

prevSlide[0].onclick = function() {
  if (currentImg < 0) {
    currentImg =  dataSlides.slides.length-1;
  }
	currentImg--;
	slider(currentImg);
}

nextSlide[0].onclick = function() {
  if (currentImg == dataSlides.slides.length) {
    currentImg = 0;
  }
	currentImg++;
	slider(currentImg);
}

for (let i = 0; i < dataSlides.slides.length; i++) {
  div =  document.createElement('div');
  div.className = "dot";
  pagination.append(div);
}

for (let i = 0; i < dotArray.length; i++) {
  dotArray[i].onclick = function() {
    let num = i;
    slider(num);

    for (let j = 0; j < dotArray.length; j++) {
      dotArray[j].className = 'dot';
    }

    this.className = 'dot dot-active';
  };
}

window.onload = function() {
	slider(currentImg);
}
