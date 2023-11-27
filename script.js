const actualDate = document.getElementById('actualDate');

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'October', 'November', 'December'];

function getDate() {
    let date = new Date();
    let weekDay = date.getDay(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();

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

    let newDate = weekDay + " " + day + ' ' + month + ' ' + year;

    return newDate;
}

actualDate.innerHTML = getDate()

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const nbOfSearch = document.getElementById('nbOfSearch');
let numberOfSearch = 0;

search.addEventListener('click', () => {

    const APIKey = '41dfc31aacf90548143d2c690c32c6de';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

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

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/weatherImg/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/weatherImg/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/weatherImg/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/weatherImg/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/weatherImg/mist.png';
                    break;

                case 'Drizzle':
                    image.src = 'images/weatherImg/drizzle.png';
                    break;

                case 'Thunderstorm':
                    image.src = 'images/weatherImg/thunderstorm.png';
                    break;

                case 'Smoke':
                    image.src = 'images/weatherImg/smoke.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '610px';

            numberOfSearch++;
            nbOfSearch.innerHTML = `${numberOfSearch} Search${numberOfSearch > 1 ? 'es' : ''}`;
        });
});

const randomChange = document.getElementById('randomChange'), 
images = ['images/bgImg/bubble.jpeg', 'images/bgImg/paint.jpeg', 'images/bgImg/smoke.jpeg', 'images/bgImg/waves.jpeg'];
let imgCount = images.length;

function changeImage() {
    const number = Math.floor(Math.random() * imgCount);
    randomChange.style.backgroundImage = 'url('+images[number]+')';
}

window.onload = function() {
    changeImage(); // Appeler la fonction une fois au chargement de la page
    setInterval(changeImage, 10000); // Puis toutes les 10 secondes
}
