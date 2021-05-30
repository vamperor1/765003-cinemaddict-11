import {getRandomInRange} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createFooterStatsTemplate = () => {
  const filmsAmount = getRandomInRange(1, 999) + 130000;
  const filmsAmountString = (filmsAmount + ``).replace(/\B(?=(\d{3})+(?!\d))/g, ` `);
  return (
    `<p>${filmsAmountString} movies inside</p>`
  );
};

export default class FooterStats extends AbstractComponent {
  getTemplate() {
    return createFooterStatsTemplate();
  }
}
