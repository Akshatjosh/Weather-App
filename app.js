"use strict";
// variable to select html element
const input_box = document.querySelector("#input-box");
const search = document.querySelector("#search");
const weather_img = document.querySelector(".weather-img");
const temp = document.querySelector(".temp");
const descrip = document.querySelector(".description");
const humid = document.getElementById("humid");
const speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-app");

// function to fetch api request
async function checkweather(city) {
  console.log(city);
  const apikey = "7664e0310186c35e68696521929bd0d7";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  try {
    const weather_data = await fetch(`${url}`).then((response) =>
      response.json()
    );

    if (weather_data.cod === "404") {
      location_not_found.style.display = "flex";
      weather_body.style.display = "none";
      return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    descrip.innerHTML = `${weather_data.weather[0].description}`;
    humid.innerHTML = `${weather_data.main.humidity}%`;
    speed.innerHTML = `${weather_data.wind.speed}Km/hr`;

    switch (weather_data.weather[0].main) {
      case "Clouds":
        weather_img.src = "cloud.png";
        break;
      case "Clear":
        weather_img.src = "clear.png";
        break;
      case "Mist":
        weather_img.src = "mist.png";
        break;
      case "Rain":
        weather_img.src = "rain.png";
        break;
      case "Snow":
        weather_img.src = "Snow.png";
        break;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// search event listener
search.addEventListener("click", function () {
  if (input_box.value === "") {
    return;
  }
  checkweather(input_box.value);
});
