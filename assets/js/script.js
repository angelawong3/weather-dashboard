var cityEl = document.getElementById("input-city");
console.log(cityEl);
var searchEl = document.getElementById("searchBtn");
console.log(searchEl);

const apiKey = "1c6283f007c531f7d629fe699300456e";
let cityName = "Birmingham";

let requestCurrentUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=" +
  apiKey;
let requestForecastUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=" +
  apiKey;
