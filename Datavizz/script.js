const randomChange = document.getElementById ('randomChange'), 
images = ['images/bubble.jpeg', 'images/paint.jpeg', 'images/smoke.jpeg', 'images/waves.jpeg'];
let imgCount = images.length;
const number = Math.floor(Math.random() * imgCount);

window.onload = function() {
    randomChange.style.backgroundImage = 'url('+images[number]+')'
}