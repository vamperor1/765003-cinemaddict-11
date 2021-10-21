import {getFilmsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class Movies {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    // console.log(this._films);
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
}
