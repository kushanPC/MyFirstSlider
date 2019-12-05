"use strict";
import dataSlides from './data.js';

let currentImg = 0;
let div;

const slide = document.getElementById('image');
const pagination = document.getElementById('pagination');
const prevSlide =  document.getElementsByClassName('btn-left');
const nextSlide =  document.getElementsByClassName('btn-right');
const dotArray =  document.getElementsByClassName("dot");

function slider(image) {
  slide.style.backgroundImage = `url(${dataSlides.slides[image]})`;

  for (let image = 0; image < dotArray.length; image++) {
    dotArray[image].className = 'dot';
  }

  currentImg = image;

  dotArray[image].className = 'dot active';
}

prevSlide[0].addEventListener("click", function(){
	currentImg-=1;
  if (currentImg < 0) {
    currentImg = dataSlides.slides.length - 1;
  }
	slider(currentImg);
},false);

nextSlide[0].addEventListener("click", function(){
	currentImg+=1;
  if (currentImg === dataSlides.slides.length) {
    currentImg = 0;
  }
	slider(currentImg);
},false);

dataSlides.slides.forEach(function() {
  div = document.createElement('div');
  div.className = "dot";
  pagination.append(div);
});

for (let i = 0; i < dotArray.length; i++) {
  dotArray[i].onclick = function() {
    let num = i;
    slider(num);
    this.className = 'dot active';
  };
}

window.onload = function() {
	slider(currentImg);
}
