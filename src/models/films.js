import {getFilmsByFilter} from "../utils/filter.js";
import {FilterType, StatisticsFilter} from "../const.js";

const MINUTES_PER_HOUR = 60;

const sortData = (list) => {
  const resultData = {};

  Object.entries(list).sort((a, b) => b[1] - a[1]).forEach((item) => {
    resultData[item[0]] = item[1];
  });

  return resultData;
};

export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }
  /* Возвращает список фильмов, соответствующий названию фильтра */
  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }
  /* Возвращает список всех фильмов */
  getFilmsAll() {
    return this._films;
  }
  /* Записывает переданный в "main.js 21" список фильмов в свойство _films  */
  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);
    // console.log(index);
    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    // console.log(this._films);
    this._callHandlers(this._dataChangeHandlers);
    // console.log(this._callHandlers(this._dataChangeHandlers));

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getWatchedFilms(statPeriod = StatisticsFilter.ALL_TIME) {
    const filmsWatched = this._films.filter((film) => film.user_details.already_watched); // в оригинале film.watched

    if (statPeriod === StatisticsFilter.ALL_TIME) {
      return filmsWatched;
    }

    const date = new Date();

    switch (statPeriod) {
      case StatisticsFilter.YEAR:
        date.setFullYear(date.getFullYear() - 1);
        break;
      case StatisticsFilter.MONTH:
        date.setMonth(date.getMonth() - 1);
        break;
      case StatisticsFilter.WEEK:
        date.setDate(date.getDate() - 7);
        break;
      case StatisticsFilter.TODAY:
        date.setDate(date.getDate() - 1);
        break;
      default:
        return filmsWatched;
    }

    return filmsWatched.filter((item) => new Date(item.user_details.watching_date) > date);
  }

  getTotalDuration(filter) {
    const totalDuration = this.getWatchedFilms(filter).reduce((total, film) => {
      return total + film.film_info.runtime;
    }, 0);
    const hours = Math.floor(totalDuration / MINUTES_PER_HOUR);

    return {
      hours,
      minutes: totalDuration - hours * MINUTES_PER_HOUR,
    };
  }

  getGenresStatistics(filter) {
    const genres = {};

    this.getWatchedFilms(filter).forEach((film) => {
      film.film_info.genre.forEach((genre) => {
        genres[genre] = genres[genre] === undefined ? 1 : genres[genre] + 1;
      });
    });

    return sortData(genres);
  }

  getTopGenre(filter) {
    const genres = this.getGenresStatistics(filter);

    return Object.keys(genres).reduce((topGenre, genre) => {
      if (topGenre === ``) {
        return genre;
      }

      return genres[genre] > genres[topGenre] ? genre : topGenre;
    }, ``);
  }
}
