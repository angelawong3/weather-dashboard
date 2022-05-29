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

const renderCurrentData = (data) => {
  const currentWeatherCard = `<div id="city-current" class="weather-card">
  <div class="text-center">
    <h5 class="text-center p-2">${data}</h5>
    <h6 class="text-center">Thursday, 19th May, 2022</h6>
    <img
      src="http://openweathermap.org/img/w/04d.png"
      alt="weather icon"
    />
  </div>
  <!-- weather metric div -->
  <div>
    <div class="row no-gutters">
      <div class="col-sm-12 col-md-4 p-2">Temperature</div>
      <div class="col-sm-12 col-md-8 p-2">16 &deg; C</div>
    </div>
    <div class="row no-gutters">
      <div class="col-sm-12 col-md-4 p-2">Humidity</div>
      <div class="col-sm-12 col-md-8 p-2">20 &percnt;</div>
    </div>
    <div class="row no-gutters">
      <div class="col-sm-12 col-md-4 p-2">Wind Speed</div>
      <div class="col-sm-12 col-md-8 p-2">10 MPH</div>
    </div>
    <div class="row no-gutters">
      <div class="col-sm-12 col-md-4 p-2">UN Index</div>
      <div class="col-sm-12 col-md-8 p-2">
        <span class="bg-secondary text-white px-3 rounded-2"
          >1.5</span
        >
      </div>
    </div>
  </div>
</div>`;

  currentWeather.append(currentWeatherCard);
};

const renderForecastData = () => {
  const forecastWeatherCard = `<div id="5-day-forecast">
 <h5 class="text-left pt-2">5-day Forecast</h5>
 <hr />
 <div class="d-flex flex-row justify-content-center flex-wrap">
   <!-- card 1 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/04d.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">Tue, 20th May</h6>
       <div class="text-center">
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Temp</div>
           <div class="col-sm-12 pl-1 border">16 &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">20 &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">10 MPH</div>
         </div>
       </div>
     </div>
   </div>
   <!-- card 2 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/04d.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">Tue, 20th May</h6>
       <div class="text-center">
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Temp</div>
           <div class="col-sm-12 pl-1 border">16 &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">20 &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">10 MPH</div>
         </div>
       </div>
     </div>
   </div>
   <!-- card 3 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/04d.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">Tue, 20th May</h6>
       <div class="text-center">
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Temp</div>
           <div class="col-sm-12 pl-1 border">16 &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">20 &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">10 MPH</div>
         </div>
       </div>
     </div>
   </div>
   <!-- card 4 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/04d.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">Tue, 20th May</h6>
       <div class="text-center">
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Temp</div>
           <div class="col-sm-12 pl-1 border">16 &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">20 &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">10 MPH</div>
         </div>
       </div>
     </div>
   </div>
   <!-- card 5 -->
   <div class="card m-1 shadow forecast-card">
     <div class="d-flex justify-content-center">
       <img
         class="weather-icon"
         src="http://openweathermap.org/img/w/04d.png"
         alt="weather icon"
       />
     </div>
     <div class="card-body">
       <h6 class="card-title text-center">Tue, 20th May</h6>
       <div class="text-center">
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Temp</div>
           <div class="col-sm-12 pl-1 border">16 &deg; C</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Humidity</div>
           <div class="col-sm-12 pl-1 border">20 &percnt;</div>
         </div>
         <div class="row no-gutters border">
           <div class="col-sm-12 pl-1 border bg-light">Wind</div>
           <div class="col-sm-12 pl-1 border">10 MPH</div>
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

const handleRecentSearchClick = (event) => {
  const target = $(event.target);

  // restrict clicks only from li
  if (target.is("li")) {
    // get data city attribute
    const cityName = target.attr("data-city");
    console.log(cityName);
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // get form input value
  const cityName = $("#search-input").val();

  // validate
  if (cityName) {
    // fetch data from API
    // url
    const currentDataUrl = constructUrl(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        q: cityName,
        appid: "1c6283f007c531f7d629fe699300456e",
      }
    );

    const currentData = await fetchData(currentDataUrl);

    // render current data
    renderCurrentData(currentData);

    // render forecast data
    renderForecastData();

    // get recent searches from LS
    const recentSearches = readFromLS("recentSearches", []);

    // push city name to array
    recentSearches.push(cityName);

    // write recent searches to LS
    writeToLS("recentSearches", recentSearches);

    // remove previous items
    recentSearchHistory.children().last().remove();

    // re-render recent cities
    renderRecentSearches();
  }
};

const onReady = () => {
  renderRecentSearches();
};

recentSearchHistory.click(handleRecentSearchClick);
searchForm.submit(handleFormSubmit);

$(document).ready(onReady);
