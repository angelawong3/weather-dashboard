// global declaration
const recentSearchHistory = $("#search-history");

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
    No search history!
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

const onReady = () => {
  renderRecentSearches();
};

recentSearchHistory.click(handleRecentSearchClick);

$(document).ready(onReady);
