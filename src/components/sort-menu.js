// import AbstractComponent from "./abstract-component.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

export const SortType = {
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
  DEFAULT: `default`,
};

const createSortMemuTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};
export default class SortMenu extends AbstractSmartComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortMemuTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      this._clearActiveState();

      evt.target.classList.add(`sort__button--active`);

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }

  setDefaultActiveState() {
    this._currenSortType = SortType.DEFAULT;
    this._clearActiveState();
    this.getElement().querySelector(`.sort__button`).classList.add(`sort__button--active`);
  }

  _clearActiveState() {
    this.getElement().querySelectorAll(`.sort__button`).forEach((button) => {
      button.classList.remove(`sort__button--active`);
    });
  }

  // sortTypeReset() {
  //   this._currenSortType = SortType.DEFAULT;
  // }
}
