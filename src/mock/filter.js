import {getRandomInRange} from "../utils.js";

const filterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];
const filterLinks = [`#all`, `#watchlist`, `#history`, `#favorites`];

const generateFilters = () => {
  return new Array(filterNames.length).
  fill(``).
  map((it, i) => {
    return {
      name: filterNames[i],
      link: filterLinks[i],
      amount: getRandomInRange(0, 20),
    };
  });
};

export {generateFilters};
