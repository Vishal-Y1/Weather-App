let weatherIcon = document.getElementById("status");

//! Date and date
const curDate = document.querySelector(".date");
const getCurrentTime = () => {
  let now = new Date();
  let month = now.getMonth() + 1;
  let date = now.getDate(2);
  let year = now.getFullYear();
  if (date < 10) {
    date = `0${date}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${date}-${month}-${year}`;
};
curDate.textContent = getCurrentTime();

// const API_KEY = `34e08bfe0f910ca56e067a8de4536cf1`;
// const API_KEY = process.env.APIKEY;
const submit = document.querySelector("#submit");
// const status = document.querySelector('#status');
const form = document.querySelector("form");
const cityName = document.querySelector("#city");
const temp = document.querySelector("#temp");
const status_text = document.querySelector(".status-text");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const initialCity = async (iCity) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${iCity}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return showWeather(data);
};

initialCity("Delhi");

const getWeather = async (city) => {
  cityName.innerHTML = `<h2 class="warn"> Loading... <h2>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return showWeather(data);
  return showIcon(data);
};

const showWeather = (data) => {
  if (data.cod == "404") {
    cityName.innerHTML = `<h2 class="warn"> City Not Found <h2>`;
    return;
  }

  cityName.innerHTML = `<i class="fa-solid fa-location-dot" style="color: #000;"></i> ${data.name}, ${data.sys.country}`;
  temp.innerHTML = `${data.main.temp}°C`;
  status_text.innerHTML = `${data.weather[0].main}`;
  pressure.innerHTML = `${data.main.pressure} M/B`;
  humidity.innerHTML = `${data.main.humidity}%`;
  windSpeed.innerHTML = `${data.wind.speed} M/S`;
};

form.addEventListener("submit", function (event) {
  getWeather(search.value);
  event.preventDefault();
});
