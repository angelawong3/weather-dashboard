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
    // if render recent searches
  } else {
    // else show alert
    const alert = `<div class="alert alert-info text-center" role="alert">
    No search history!
  </div>`;

    // append to parent
    recentSearchHistory.append(alert);
  }
};

const handleRecentSearchClick = () => {
  console.log("Clicked");
};

const onReady = () => {
  renderRecentSearches();
};

recentSearchHistory.click(handleRecentSearchClick);

$(document).ready(onReady);
