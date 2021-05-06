let now = new Date();
let calendar = document.querySelector(".calendar");
calendar.innerHTML = "Sunday, 21:57";
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
calendar.innerHTML = `${day}, ${hours}:${minutes}`;

function showLocation(event) {
     event.preventDefault();
    let locationInput = document.querySelector("#location-input");
    let h1 = document.querySelector("h1#searched-location");
     h1.innerHTML= `${locationInput.value}`;
 } 

 let locationForm = document.querySelector("#location-form");
 locationForm.addEventListener("submit", showLocation);

 let temperatureFromCelsiusToFahrenheit = document.querySelector("#temperatureCelsius"); 
 let temperature = 21;
 let temperatureInCelsius = true;
 temperatureFromCelsiusToFahrenheit.addEventListener("click", changeTemperatureUnit);

 function changeTemperatureUnit() {
     if (temperatureInCelsius === true) {
        temperature = (temperature * 9 / 5) + 32
        temperatureFromCelsiusToFahrenheit.innerHTML = `${temperature}°F<br/>🌤`;
        temperatureInCelsius = false;
     } else {
         temperature = (temperature - 32) * 5 / 9
         temperatureFromCelsiusToFahrenheit.innerHTML = `${temperature}°C<br/>🌤`;
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

    temperatureElement.innerHTML = `${temperature}°C`;
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = humidity;
    windElement.innerHTML = wind.toPrecision(3);
    cityElement.innerHTML = response.data.name;
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