import {FilterType} from "../const.js";

export const getWatchlistFilms = (films) => {
  return films.filter((film) => film.user_details.watchlist);
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.user_details.already_watched);
};

export const getFavoritesFilms = (films) => {
  return films.filter((film) => film.user_details.favorite);
};

export const getFilmsByFilter = (films, filterType) => {
  // const nowDate = new Date();

  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getWatchedFilms(films);
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
  }
  return films;
};

// export const getFilmsByFilter = (films) => {
//   return films;
// };
