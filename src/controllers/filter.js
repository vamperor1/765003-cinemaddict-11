import FilterMenuComponent from "../components/filter-menu.js";
import {FilterType} from "../const.js";
import {render, replace, renderPosition} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";
// import { relativeTimeThreshold } from "moment";

export const ScreenType = {
  ACTIVE: `main-navigation__items`,
  FILMS: `main-navigation__items`,
  STATS: `main-navigation__additional`
};
export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;
    this._screenChangeHandler = null;
    this._sortMenuComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getFilmsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        active: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterMenuComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (this._screenChangeHandler) {
      this.setScreenChangeHandler(this._screenChangeHandler);
    }

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, renderPosition.BEFOREEND);
    }
  }

  setScreenChangeHandler(handler) {
    this._screenChangeHandler = handler;
    this._filterComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler(evt);
    });
  }

  setSortMenuComponent(component) {
    this._sortMenuComponent = component;
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
    // this._sortMenuComponent.sortTypeReset();
    this._sortMenuComponent.setDefaultActiveState();
  }

  _onDataChange() {
    this.render();
  }
}
