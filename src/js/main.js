"use strict";
import dataSlides from './data.js';

let currentSlide = 0;
let div;

const slide = document.getElementById('image');
const pagination = document.getElementById('pagination');
const prevSlide =  document.querySelector('.btn-left');
const nextSlide =  document.querySelector('.btn-right');
const dotArray =  document.getElementsByClassName('dot');
const dropItems =   document.getElementsByClassName('item');


const buttonDropdown = document.querySelector('.btn-dropdown');
let dropdown = document.querySelector('.dropdown');

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
}

function onClickPreviousSlide() {
  currentSlide -= 1;
  if (currentSlide < 0) {
    currentSlide = dataSlides.slides.length - 1;
  }
  slider(currentSlide);
}

prevSlide.addEventListener('click', onClickPreviousSlide);

nextSlide.addEventListener('click', onClickNextSlide);

dataSlides.slides.forEach(function() {
  div = document.createElement('div');
  div.className = 'dot';
  pagination.append(div);
});

for (let i = 0; i < dotArray.length; i++) {
  dotArray[i].onclick = function() {
    let num = i;
    slider(num);
    this.className = 'dot active';
  };
}

function drop() {
  if (dropdown.className == 'dropdown'){
   dropdown.className = 'dropdown show';
  }
  else {
     dropdown.className = 'dropdown';
     buttonDropdown.textContent = `Dropdown`;
  }
}

buttonDropdown.addEventListener('click', drop);

for (var i = 0; i < dropItems.length; i++) {
  dropItems[i].addEventListener('click', function() {
    let num = i;
    buttonDropdown.textContent = `${this.textContent}`;
  });
}

window.onload = function() {
	slider(currentSlide);
  setInterval(function() {
		onClickNextSlide();
	},8000);
};
