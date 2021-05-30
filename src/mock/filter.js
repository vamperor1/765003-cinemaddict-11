import {getRandomInRange} from "../utils/common.js";

const filterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];
const filterLinks = [`#all`, `#watchlist`, `#history`, `#favorites`];

const generateFilters = () => {
  // return new Array(filterNames.length).
  // fill(``).
  // map((it, i) => {
  //   return {
  //     name: filterNames[i],
  //     link: filterLinks[i],
  //     amount: getRandomInRange(0, 20),
  //   };
  // });
  const filters = [];
  for (let i = 0; i < filterNames.length; i++) {
    filters.push({
      name: filterNames[i],
      link: filterLinks[i],
      amount: getRandomInRange(0, 20),
    });
  }
  return filters;
};

export {generateFilters};
