const randomChange = document.getElementById ('randomChange'), 
images = ['images/bgImg/bubble.jpeg', 'images/bgImg/paint.jpeg', 'images/bgImg/smoke.jpeg', 'images/bgImg/waves.jpeg'];
let imgCount = images.length;
const number = Math.floor(Math.random() * imgCount);

window.onload = function() {
    randomChange.style.backgroundImage = 'url('+images[number]+')'
}