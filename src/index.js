function currentWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#Wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let imojiElement = document.querySelector("#imoji");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  imojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-imoji">`;

  fetchForecast(response.data.city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function fetchForecast(city) {
  let apiKey = "f063aad8tb9d2a804775off7e6bf14bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(forecastDisplay);
}

function forecastDisplay(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="forecast-day">
          <div class="week-day">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="forecast-imoji">
          <div class="forecast-temperatures">
            <div class="forecast-temp"><strong>${Math.round(
              day.temperature.maximum
            )}°</strong></div>
            <div class="forecast-temp">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function citySearch(city) {
  let apiKey = "f063aad8tb9d2a804775off7e6bf14bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);
}

function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-form-input");
  citySearch(cityInputElement.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

forecastDisplay();
