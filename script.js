// Author: Tinéni BAEYENS, Amélie MASSON, Alexandre BOBIS

import APIKEY from './.env';

// On initialise les variables pour la date
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'October', 'November', 'December'];
const actualDate = document.getElementById('actualDate');

// On récupère la date actuelle
function getDate() {
    let date = new Date();
    let weekDay = date.getDay(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();

    // On change les valeurs des variables en fonction de la date actuelle
    for (let i = 0; i < days.length; i++) {
        if (i === weekDay) {
            weekDay = days[i];
        }
    }

    for (let i = 0; i < months.length; i++) {
        if (i === month) {
            month = months[i];
        }
    }

    // On initialise la date
    let newDate = "It's " + weekDay + ' ' + day + ' ' + month + ' ' + year;
    return newDate;
}

// On initialise les variables à partir du DOM
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const nbOfSearch = document.getElementById('nbOfSearch');

// On initialise le nombre de recherche à 0
let numberOfSearch = 0;

// Function to handle the search logic
const handleSearch = () => {
    const APIKey = APIKEY;
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    // On fait appel à l'API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            // Si la valeur de 'city' n'est pas bonne, on affiche une erreur 404
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // On initialise les variables à partir du DOM
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            
            // On change l'image en fonction de la météo (passée en lowercase pour correspondre au nom des images)
            let meteo = json.weather[0].main.toLowerCase();
            image.src = `images/weatherImg/${meteo}.png`;

            // On affiche les données de la météo
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // On affiche les éléments
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '610px';

            // On incrémente le nombre de recherche
            numberOfSearch++;
            nbOfSearch.innerHTML = `${numberOfSearch} Search${numberOfSearch > 1 ? 'es' : ''}`;
        });
};

// Event listener lorsqu'on 'click' sur le bouton 'search'
search.addEventListener('click', handleSearch);

// Event listener pour la touche 'Entrer'
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});


// On initialise les variables à partir du DOM
const randomChange = document.getElementById('randomChange'), 
images = ['images/bgImg/bubble.jpeg', 'images/bgImg/paint.jpeg', 'images/bgImg/smoke.jpeg', 'images/bgImg/waves.jpeg'];
let imgCount = images.length;

// On change l'image de fond aléatoirement
function changeImage() {
    const number = Math.floor(Math.random() * imgCount);
    randomChange.style.backgroundImage = 'url('+images[number]+')';
    randomChange.style.transition = 'all 2s ease-in-out';
}

// On appelle la fonction changeImage() au chargement de la page et toutes les 20 secondes
window.onload = function() {
    changeImage(); // Appeler la fonction une fois au chargement de la page
    setInterval(changeImage, 20000); // Puis toutes les 20 secondes
}

// On ajoute un effet de 'typing' sur la date
let typed = new typed('.auto-typing', {
    strings: [getDate()],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 500
})

clock();

function clock() {
    const date = new Date();
    const hours = ((date.getHours() + 11) % 12 + 1); // Si l'heure est entre 13h et 23h, on affiche 1h à 11h
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hour = hours * 30;
    const minute = minutes * 6;
    const second = seconds * 6;

    document.querySelector('.heure').style.transform = `rotate(${hour}deg)`;

    document.querySelector('.minute').style.transform = `rotate(${minute}deg)`;

    document.querySelector('.seconde').style.transform = `rotate(${second}deg)`;
}

setInterval(clock, 1000);
