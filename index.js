function getDate(time) {
  let now = new Date();

  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// displayForecast

function displayForecast(response) {
  console.log(response);
  let forecastelement = document.querySelector("#forecast");
  console.log(response.data.daily);
  let foreCast = response.data.daily;

  let forecastHTML = `<div class="row  flex gap-x-3">`;

  foreCast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
    <div class="col-2 forecast">
        <div class="weather-forecast ">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }.png"
          alt=""
          width="52"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}°  </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°  </span>
        </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastelement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coord) {
  console.log(coord);
  let apiKey = "56787a4c1ee3d6ad67486bd488090bf0";
  let lat = coord.lat;
  let lon = coord.lat;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#cityname");
  let dateElement = document.querySelector("#date");
  let temperatureElement = document.querySelector("#tempcelsius");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels-like");
  let hightTempElement = document.querySelector("#High-temp");
  let lowTempElement = document.querySelector("#Low-temp");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.deg);
  dateElement.innerHTML = getDate(response.data.dt * 1000);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  hightTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);

  getForecast(response.data.coord);
  console.log(response);
  console.log(response.data.coord);
}

function searchCity(city) {
  // event.preventDefault();
  console.log(city);
  let apiKey = "56787a4c1ee3d6ad67486bd488090bf0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  console.log(apiUrl);
}

function handleSubmit(e) {
  e.preventDefault();
  let cityInput = document.querySelector("#search");
  searchCity(cityInput.value);
}

function displyToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempcelsius");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function displyToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemperature = document.querySelector("#tempcelsius");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheiTemperature);
}

// form
let submitForm = document.querySelector("#search-form");
submitForm.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displyToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displyToFahrenheit);

searchCity("Iran");
