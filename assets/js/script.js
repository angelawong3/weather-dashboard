// global declaration
const recentSearchHistory = $("#search-history");
const searchForm = $("#search-form");
const currentWeather = $("#current-weather");

const readFromLS = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const writeToLS = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error, message);
  }
};

const getUviClassName = (uvi) => {
  if (uvi >= 0 && uvi <= 2) {
    return "bg-success";
  }
  if (uvi > 2 && uvi <= 5) {
    return "bg-warning";
  }
  if (uvi > 6) {
    return "bg-danger";
  }
};

const renderCurrentData = (data) => {
  console.log(data);
  const currentWeatherCard = `<div id="city-current" class="weather-card">
  <div class="text-center">
    <h5 class="text-center p-2">${data.cityName}</h5>
    <h6 class="text-center">${moment().format("ddd, MMMM Do YYYY")}</h6>
    <img
      src="http://openweathermap.org/img/w/${
        data.weatherData.current.weather[0].icon
      }.png"
      alt="weather icon"
    />
  </div>
  <!-- weather metric div -->
  <div>
    <div class="row no-gutters">
      <div class="col-sm-12 col-md-4 p-2">Temperature</div>
      <div class="col-sm-12 col-md-8 p-2">${
        data.weatherData.current.temp
      } &deg; C</div>
    </div>
    <div class="row no-gutters">
      <div class="col-sm-12 col-md-4 p-2">Humidity</div>
      <div class="col-sm-12 col-md-8 p-2">${
        data.weatherData.current.humidity
      } &percnt;</div>
    </div>
    <div class="row no-gutters">
      <div class="col-sm-12 col-md-4 p-2">Wind Speed</div>
      <div class="col-sm-12 col-md-8 p-2">${
        data.weatherData.current.wind_speed
      } MPH</div>
    </div>
    <div class="row no-gutters">
      <div class="col-sm-12 col-md-4 p-2">UN Index</div>
      <div class="col-sm-12 col-md-8 p-2">
        <span class="text-white px-3 rounded-2 ${getUviClassName(
          data.weatherData.current.uvi
        )}"
          >${data.weatherData.current.uvi}</span
        >
      </div>
    </div>
  </div>
</div>`;

  currentWeather.append(currentWeatherCard);
};

const renderForecastData = (data) => {
  const forecastWeatherCard = `<div id="5-day-forecast">
 <h5 class="text-left pt-2">5-day Forecast</h5>
 <hr />
 <div class="d-flex flex-row justify-content-center flex-wrap">
   <!-- card 1 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/${
           data.weatherData.daily[0].weather[0].icon
         }.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">${moment()
         .add(1, "days")
         .format("ddd, MMMM Do")}</h6>
       <div class="text-center">
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Temp</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[0].temp.day
           } &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[0].humidity
           } &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[0].wind_speed
           } MPH</div>
         </div>
       </div>
     </div>
   </div>
   <!-- card 2 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/${
           data.weatherData.daily[0].weather[0].icon
         }.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">${moment()
         .add(2, "days")
         .format("ddd, MMMM Do")}</h6>
       <div class="text-center">
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Temp</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[1].temp.day
           } &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[1].humidity
           } &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[1].wind_speed
           } MPH</div>
         </div>
       </div>
     </div>
   </div>
   <!-- card 3 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/${
           data.weatherData.daily[0].weather[0].icon
         }.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">${moment()
         .add(3, "days")
         .format("ddd, MMMM Do")}</h6>
       <div class="text-center">
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Temp</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[2].temp.day
           } &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[2].humidity
           } &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[2].wind_speed
           } MPH</div>
         </div>
       </div>
     </div>
   </div>
   <!-- card 4 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/${
           data.weatherData.daily[0].weather[0].icon
         }.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">${moment()
         .add(4, "days")
         .format("ddd, MMMM Do")}</h6>
       <div class="text-center">
         <div class="row no-gutters border">
         <div class="col-sm-12 pl-1 border bg-light">Temp</div>
         <div class="col-sm-12 pl-1 border">${
           data.weatherData.daily[3].temp.day
         } &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[3].humidity
           } &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[3].wind_speed
           } MPH</div>
         </div>
       </div>
     </div>
   </div>
   <!-- card 5 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/${
           data.weatherData.daily[0].weather[0].icon
         }.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">${moment()
         .add(5, "days")
         .format("ddd, MMMM Do")}</h6>
       <div class="text-center">
         <div class="row no-gutters border">
         <div class="col-sm-12 pl-1 border bg-light">Temp</div>
         <div class="col-sm-12 pl-1 border">${
           data.weatherData.daily[4].temp.day
         } &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[4].humidity
           } &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">${
             data.weatherData.daily[4].wind_speed
           } MPH</div>
         </div>
       </div>
     </div>
   </div>
 </div>
</div>`;

  currentWeather.append(forecastWeatherCard);
};

const renderRecentSearches = () => {
  // get recent searches from LS
  const recentSearches = readFromLS("recentSearches", []);

  // ["Birmingham", "London"]
  if (recentSearches.length) {
    const createRecentCity = (city) => {
      return `<li class="list-group-item border-0" data-city="${city}">
      ${city}
    </li>`;
    };

    const recentCities = recentSearches.map(createRecentCity).join("");

    // if render recent searches
    const ul = `<ul class="list-group">
      ${recentCities}
    </ul>`;

    // append to parent
    recentSearchHistory.append(ul);
  } else {
    // else show alert
    const alert = `<div class="alert alert-info text-center" role="alert">
    No search history.
  </div>`;

    // append to parent
    recentSearchHistory.append(alert);
  }
};

const fetchWeatherData = async (cityName) => {
  // fetch data from API
  // current data url
  const currentDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: cityName,
      appid: "1c6283f007c531f7d629fe699300456e",
    }
  );

  const currentData = await fetchData(currentDataUrl);

  // get lat, lon and city name
  const lat = currentData?.coord?.lat;
  const lon = currentData?.coord?.lon;
  const displayCityName = currentData.name;

  // forecast data url
  const forecastDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/onecall",
    {
      lat: lat,
      lon: lon,
      exclude: "minutely,hourly",
      units: "metric",
      appid: "1c6283f007c531f7d629fe699300456e",
    }
  );

  const forecastData = await fetchData(forecastDataUrl);
  return {
    cityName: displayCityName,
    weatherData: forecastData,
  };
};

const handleRecentSearchClick = (event) => {
  const target = $(event.target);

  // restrict clicks only from li
  if (target.is("li")) {
    // get data city attribute
    const cityName = target.attr("data-city");

    renderWeatherInfo(cityName);
  }
};

const renderWeatherInfo = async (cityName) => {
  // fecth weather data
  const weatherData = await fetchWeatherData(cityName);

  // remove current weather info
  currentWeather.empty();

  // render current data
  renderCurrentData(weatherData);

  // render forecast data
  renderForecastData(weatherData);
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // get form input value
  const cityName = $("#search-input").val();

  // validate
  if (cityName) {
    // render weather info cards
    await renderWeatherInfo(cityName);

    // get recent searches from LS
    const recentSearches = readFromLS("recentSearches", []);

    if (!recentSearches.includes(cityName)) {
      // push city name to array
      recentSearches.push(cityName);

      // write recent searches to LS
      writeToLS("recentSearches", recentSearches);

      // remove previous items
      recentSearchHistory.children().last().remove();

      // re-render recent cities
      renderRecentSearches();
    }
  }
};

const onReady = () => {
  renderRecentSearches();
};

recentSearchHistory.click(handleRecentSearchClick);
searchForm.submit(handleFormSubmit);

$(document).ready(onReady);
