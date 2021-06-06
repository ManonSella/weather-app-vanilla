let now = new Date();
let calendar = document.querySelector(".calendar");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
    calendar.innerHTML = `${day}, ${hours}:0${minutes}`;
} else {
    calendar.innerHTML = `${day}, ${hours}:${minutes}`;
}

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
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${locationInputElement.value}&appid=${apiKey}`
    locationInputElement.value = '';
    axios.get(url).then(onGeocodingResponse);
}

function onGeocodingResponse(response) {
    let latitude = response.data[0].lat;
    let longitude = response.data[0].lon;
    let name = response.data[0].name;
    let country = response.data[0].country;
    cityElement.innerHTML = `${name}, ${country} ${countryIcons[country] || ''}`;

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(url).then(onResponse);
}

function onResponse(response) {
    let temperature = Math.round(response.data.current.temp);
    let description = response.data.current.weather[0].description;
    let humidity = response.data.current.humidity;
    let wind = response.data.current.wind_speed * 3.28;
    let icon = response.data.current.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

    temperatureElement.innerHTML = `<span>${temperature}°C</span><br/><img src="${iconUrl}" alt="${description}" />`;
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = humidity;
    windElement.innerHTML = wind.toPrecision(3);
    

    temperatureInCelsius = true;
    temperatureFromCelsiusToFahrenheit = document.querySelector("#temperatureCelsius span"); 
    temperatureFromCelsiusToFahrenheit.addEventListener("click", changeTemperatureUnit);


    let forecastmin0 = Math.round(response.data.daily[0].temp.min);
    let forecastmax0 = Math.round(response.data.daily[0].temp.max);
    let mondayIcon = response.data.daily[0].weather[0].icon;
    let mondayIconUrl = `http://openweathermap.org/img/w/${mondayIcon}.png`;
    let mondayIconDescription = response.data.daily[0].weather[0].description;
    
    let forecastmin1 = Math.round(response.data.daily[1].temp.min);
    let forecastmax1 = Math.round(response.data.daily[1].temp.max);
    let tuesdayIcon = response.data.daily[1].weather[0].icon;
    let tuesdayIconUrl = `http://openweathermap.org/img/w/${tuesdayIcon}.png`;
    let tuesdayIconDescription = response.data.daily[1].weather[0].description;

    let forecastmin2 = Math.round(response.data.daily[2].temp.min);
    let forecastmax2 = Math.round(response.data.daily[2].temp.max);
    let wednesdayIcon = response.data.daily[2].weather[0].icon;
    let wednesdayIconUrl = `http://openweathermap.org/img/w/${wednesdayIcon}.png`;
    let wednesdayIconDescription = response.data.daily[2].weather[0].description;

    let forecastmin3 = Math.round(response.data.daily[3].temp.min);
    let forecastmax3 = Math.round(response.data.daily[3].temp.max);
    let thursdayIcon = response.data.daily[3].weather[0].icon;
    let thursdayIconUrl = `http://openweathermap.org/img/w/${thursdayIcon}.png`;
    let thursdayIconDescription = response.data.daily[3].weather[0].description;

    let forecastmin4 = Math.round(response.data.daily[4].temp.min);
    let forecastmax4 = Math.round(response.data.daily[4].temp.max);
    let fridayIcon = response.data.daily[4].weather[0].icon;
    let fridayIconUrl = `http://openweathermap.org/img/w/${fridayIcon}.png`;
    let fridayIconDescription = response.data.daily[4].weather[0].description;
       
    forecastMondayElement.innerHTML = `Mon<br/>${forecastmin0}-${forecastmax0}°<br/><img src="${mondayIconUrl}" alt="${mondayIconDescription}" />`; 
    forecastTuesdayElement.innerHTML = `Tue<br/>${forecastmin1}-${forecastmax1}°<br/><img src="${tuesdayIconUrl}" alt="${tuesdayIconDescription}" />`; 
    forecastWednesdayElement.innerHTML = `Wed<br/>${forecastmin2}-${forecastmax2}°<br/><img src="${wednesdayIconUrl}" alt="${wednesdayIconDescription}" />`; 
    forecastThursdayElement.innerHTML = `Thu<br/>${forecastmin3}-${forecastmax3}°<br/><img src="${thursdayIconUrl}" alt="${thursdayIconDescription}" />`; 
    forecastFridayElement.innerHTML = `Fri<br/>${forecastmin4}-${forecastmax4}°<br/><img src="${fridayIconUrl}" alt="${fridayIconDescription}" />`; 
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(handleLocation);
}

function handleLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    axios.get(url).then(onGeocodingResponse);
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
let forecastMondayElement = document.querySelector(`#Monday`);
let forecastTuesdayElement = document.querySelector(`#Tuesday`);
let forecastWednesdayElement = document.querySelector(`#Wednesday`);
let forecastThursdayElement = document.querySelector(`#Thursday`);
let forecastFridayElement = document.querySelector(`#Friday`);
formElement.addEventListener('submit', onFormSubmit);
getCurrentLocationButtonElement.addEventListener('click', getCurrentLocation);