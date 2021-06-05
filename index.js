let now = new Date();
let calendar = document.querySelector(".calendar");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
calendar.innerHTML = `${day}, ${hours}:${minutes}`;

let countryIcons = {
    JP: '🇯🇵',
    FR: '🇫🇷',
    US: '🇺🇸',
    IT: '🇮🇹',
    ES: '🇪🇸',
    GB: '🇬🇧',
    DE: '🇩🇪',
    RU: '🇷🇺',
    AU: '🇦🇺',
    PL: '🇵🇱'
}

function showLocation(event) {
     event.preventDefault();
    let locationInput = document.querySelector("#location-input");
    let h1 = document.querySelector("h1#searched-location");
     h1.innerHTML= `${locationInput.value}`;
 } 

 let locationForm = document.querySelector("#location-form");
 locationForm.addEventListener("submit", showLocation);

 let temperatureFromCelsiusToFahrenheit = document.querySelector("#temperatureCelsius span"); 
 let temperatureInCelsius = true;
 temperatureFromCelsiusToFahrenheit.addEventListener("click", changeTemperatureUnit);

 function changeTemperatureUnit(event) {
     let span = event.target;
     let temperature = span.innerHTML.replace('°C', '').replace('°F', '');
     if (temperatureInCelsius === true) {
        temperature = (temperature * 9 / 5) + 32
        temperatureFromCelsiusToFahrenheit.innerHTML = `${temperature}°F`;
        temperatureInCelsius = false;
     } else {
         temperature = (temperature - 32) * 5 / 9
         temperatureFromCelsiusToFahrenheit.innerHTML = `${temperature}°C`;
         temperatureInCelsius = true;
     }
 }

function onFormSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInputElement.value}&appid=${apiKey}&units=metric`;
    locationInputElement.value = '';
    axios.get(url).then(onResponse);
}

function onResponse(response) {
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed * 3.28;
    let icon = response.data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

    temperatureElement.innerHTML = `<span>${temperature}°C</span><br/><img src="${iconUrl}" alt="${description}" />`;
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = humidity;
    windElement.innerHTML = wind.toPrecision(3);
    cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country} ${countryIcons[response.data.sys.country] || ''}`;

    temperatureInCelsius = true;
    temperatureFromCelsiusToFahrenheit = document.querySelector("#temperatureCelsius span"); 
    temperatureFromCelsiusToFahrenheit.addEventListener("click", changeTemperatureUnit);
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(handleLocation);
}

function handleLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(url).then(onResponse);
}

let apiKey = "75ad25def5a7306c5d74d8384a531095";

let formElement = document.querySelector('#location-form');
let locationInputElement = document.querySelector('#location-input');
let cityElement = document.querySelector('#searched-location');
let temperatureElement = document.querySelector('#temperatureCelsius');
let descriptionElement = document.querySelector('#description');
let humidityElement = document.querySelector('#humidity');
let windElement = document.querySelector('#wind');
let getCurrentLocationButtonElement = document.querySelector('button');

formElement.addEventListener('submit', onFormSubmit);
getCurrentLocationButtonElement.addEventListener('click', getCurrentLocation);