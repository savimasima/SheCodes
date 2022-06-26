let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let dayToday = document.querySelector("#today");
dayToday.innerHTML = `${date} ${month}`;

let dayTommorow = document.querySelector("#tommorow");
dayTommorow.innerHTML = `${date + 1} ${month}`;

let dataAfterTommorow = document.querySelector("#dataAfterTommorow");
dataAfterTommorow.innerHTML = `${date + 2} ${month}`;

let time = document.querySelector("#time-now");
time.innerHTML = `${day} ${hours}:${minutes}, ${year}`;

function showCity(response) {
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `+${temperature}°`;
  h2.innerHTML = `${response.data.name}`;
  let weatherToday = document.querySelector("#weatherToday");
  weatherToday.innerHTML = `+${temperature}°`;
}

function retrievePosition(position) {
  let apiKey = "48435e74e411805d55ae4636686d6b40";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCity);
}
function activGeolocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", activGeolocation);

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `+${temperature}°`;
  let weatherToday = document.querySelector("#weatherToday");
  weatherToday.innerHTML = `+${temperature}°`;
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#site-search");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${input.value}`;

  let city = `${input.value}`;
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(url).then(displayWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
