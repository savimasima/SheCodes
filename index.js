function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecastTable(response) {
  let tempElement00 = document.querySelector("#temp00");
  let tempElement06 = document.querySelector("#temp06");
  let tempElement12 = document.querySelector("#temp12");
  let tempElement18 = document.querySelector("#temp18");
  let feelElement00 = document.querySelector("#feel00");
  let feelElement06 = document.querySelector("#feel06");
  let feelElement12 = document.querySelector("#feel12");
  let feelElement18 = document.querySelector("#feel18");
  let cloudElement00 = document.querySelector("#cloud00");
  let cloudElement06 = document.querySelector("#cloud06");
  let cloudElement12 = document.querySelector("#cloud12");
  let cloudElement18 = document.querySelector("#cloud18");
  let pressElement00 = document.querySelector("#press00");
  let pressElement06 = document.querySelector("#press06");
  let pressElement12 = document.querySelector("#press12");
  let pressElement18 = document.querySelector("#press18");
  let humidityElement00 = document.querySelector("#humidity00");
  let humidityElement06 = document.querySelector("#humidity06");
  let humidityElement12 = document.querySelector("#humidity12");
  let humidityElement18 = document.querySelector("#humidity18");
  let windElement00 = document.querySelector("#wind00");
  let windElement06 = document.querySelector("#wind06");
  let windElement12 = document.querySelector("#wind12");
  let windElement18 = document.querySelector("#wind18");


  tempElement00.innerHTML = Math.round(response.hourly[0].temp);
  tempElement06.innerHTML = Math.round(response.hourly[6].temp);
  tempElement12.innerHTML = Math.round(response.hourly[12].temp);
  tempElement18.innerHTML = Math.round(response.hourly[18].temp);
  feelElement00.innerHTML = Math.round(response.hourly[0].feels_like);
  feelElement06.innerHTML = Math.round(response.hourly[6].feels_like);
  feelElement12.innerHTML = Math.round(response.hourly[12].feels_like);
  feelElement18.innerHTML = Math.round(response.hourly[18].feels_like);
  cloudElement00.innerHTML = response.hourly[0].weather[0].description;
  cloudElement06.innerHTML = response.hourly[6].weather[0].description;
  cloudElement12.innerHTML = response.hourly[12].weather[0].description;
  cloudElement18.innerHTML = response.hourly[18].weather[0].description;
  pressElement00.innerHTML = response.hourly[0].pressure;
  pressElement06.innerHTML = response.hourly[6].pressure;
  pressElement12.innerHTML = response.hourly[12].pressure;
  pressElement18.innerHTML = response.hourly[18].pressure;
  humidityElement00.innerHTML = Math.round(response.hourly[0].humidity);
  humidityElement06.innerHTML = Math.round(response.hourly[6].humidity);
  humidityElement12.innerHTML = Math.round(response.hourly[12].humidity);
  humidityElement18.innerHTML = Math.round(response.hourly[18].humidity);
  windElement00.innerHTML = Math.round(response.hourly[0].wind_speed);
  windElement06.innerHTML = Math.round(response.hourly[6].wind_speed);
  windElement12.innerHTML = Math.round(response.hourly[12].wind_speed);
  windElement18.innerHTML = Math.round(response.hourly[18].wind_speed);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="weather-day">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="day">
          <h4>
          ${formatDay(forecastDay.dt)}
          </h4>
          <div class="info-day">
            <div class="half-day">
            <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            class="iconTop"
            />
            </div>
            <div class="half-day">
              <h3 class="weatherToday" id="weatherToday">${Math.round(
                forecastDay.temp.max
              )}° </h3>
              <h4 class="night-degree" id="night-degree">${Math.round(
                forecastDay.temp.min
              )}°</h4>
            </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  displayForecastTable(response.data);
}

function getForecast(coordinates) {
  let apiKey = "48435e74e411805d55ae4636686d6b40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "48435e74e411805d55ae4636686d6b40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

/*function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let weatherTodayElement = document.querySelector("#weatherToday");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheiWeatherToday = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  weatherTodayElement.innerHTML = Math.round(fahrenheiWeatherToday);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);*/

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function retrievePosition(position) {
  let apiKey = "48435e74e411805d55ae4636686d6b40";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}
function activGeolocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", activGeolocation);

search("Kyiv");