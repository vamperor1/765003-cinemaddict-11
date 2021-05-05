import {getRandomInRange} from "../utils.js";
import {createElement} from "../utils.js";

const createFooterStatsTemplate = () => {
  const filmsAmount = getRandomInRange(1, 999) + 130000;
  const filmsAmountString = (filmsAmount + ``).replace(/\B(?=(\d{3})+(?!\d))/g, ` `);
  return (
    `<p>${filmsAmountString} movies inside</p>`
  );
};

export default class FooterStats {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
