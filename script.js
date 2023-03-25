// element finding
const container = document.querySelector(".container");
const form = document.querySelector("#weather-form");
const input = document.querySelector(".weather-input");
const searchBtn = document.querySelector("#search-btn");
const weatherContainer = document.querySelector(".info-weather-container");

const apiKey = "2edc6973a4dae943482c12cc4ee4facd";
// const api="https://api.openweathermap.org/data/2.5/weather?q=dhaka&units=metric&appid=2edc6973a4dae943482c12cc4ee4facd";
const iconPath = "http://openweathermap.org/img/wn/50n@2x.png";

const callingApi = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2edc6973a4dae943482c12cc4ee4facd`
  );
  const result = await res.json();
  showInformation(result);
};

const showInformation = (data) => {
  const { temp, humidity } = data.main;
  const tempa = temparature(temp);
  const { description, icon } = data.weather[0];
  const { speed } = data.wind;
  const { name } = data;
  nameInfo(name);
  const main = document.createElement("main");
  main.classList.add("weather-info");
  main.innerHTML = `        
    <h2 class="location-info">Weather in ${name}</h2>
    <h3 class="show-weather"><span>Celsius</span> - ${tempa}°C</h3>
    <section>
    <span class="condition"
    ><img class="condition-icon" src="http://openweathermap.org/img/wn/${icon}@2x.png"></span>
      <p class="condition-text">${description}</p>
      <span class="condition"
        ><img class="condition-icon" src="http://openweathermap.org/img/wn/${icon}@2x.png"></span>
    </section>
    <p class="humidity-rate">Humidity- ${humidity}</p>
    <p class="wind-rate">Wind speed - ${speed} km/h</p>
  `;
  weatherContainer.appendChild(main);
};

const temparature = (temp) => {
  return Math.ceil(temp);
};

form.addEventListener("submit", (e) => {
  weatherContainer.innerHTML = "";
  e.preventDefault();
  const value = input.value;
  if (value) {
    callingApi(value);
    input.value = "";
  }
});

const nameInfo = (name) => {
  if (name) {
    container.style.backgroundImage = `url('https://source.unsplash.com/random/1600%C3%97900/?${name}')`;
  } else {
    container.style.backgroundImage = `url('https://thumbs-prod.si-cdn.com/8tAQ6C7wQ6pmX6849uSsX5p2WSw=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/e5/a4/e5a485ed-dff1-4595-9c2d-2eb20e024408/stbbfq79-1495105583.jpg')`;
  }
};
nameInfo();
