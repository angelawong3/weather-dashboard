// global declaration
const recentSearchHistory = $("#search-history");
const searchForm = $("#search-form");

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

const handleFormSubmit = (event) => {
  event.preventDefault();

  // get form input value
  const cityName = $("#search-input").val();

  // validate
  if (cityName) {
    console.log(cityName);

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
