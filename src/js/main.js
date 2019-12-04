let currentImg = 0;
let slide = document.getElementById('image');
let slides = ['img/1.jpeg','img/2.jpg','img/3.jpg','img/4.jpg'];

function slider(image) {
 	slide.style.backgroundImage = 'url('+slides[image]+')';
}

function nextSlide() {
	currentImg++;
	if (currentImg == slides.length) currentImg = 0;
	slider(currentImg);
}

function prevSlide() {
	currentImg--;
	if (currentImg < 0) currentImg =  slides.length-1;
	slider(currentImg);
}

window.onload = function() {
	slider(currentImg);
}
