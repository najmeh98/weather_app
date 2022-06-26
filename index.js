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
let month = months[now.getMonth()];

let h3 = document.querySelector("#day");
h3.innerHTML = `${day}, ${month} ${date} | ${hours}h${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  let cityResult = document.querySelector("#cityname");
  if (cityInput.value) {
    cityResult.innerHTML = cityInput.value;
  }
}
let submitCity = document.querySelector("#submitbutton");
submitCity.addEventListener("click", searchCity);

function changeToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#tempcelsius");
  currentTemperature.innerHTML = 30;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#tempcelsius");
  currentTemperature.innerHTML = 86;
}

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", changeToCelsius);

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);
