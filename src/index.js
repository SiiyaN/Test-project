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
  imojiElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-imoji"
    />`;
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

function citySearch(city) {
  let apiKey = "f063aad8tb9d2a804775off7e6bf14bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  citySearch(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);
