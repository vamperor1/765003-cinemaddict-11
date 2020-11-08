import {getRandomInRange} from "../utils.js";

export const createFooterStatsTemplate = () => {
  const filmsAmount = getRandomInRange(1, 999) + 130000;
  const filmsAmountString = (filmsAmount + ``).replace(/\B(?=(\d{3})+(?!\d))/g, ` `);
  return `
    <p>${filmsAmountString} movies inside</p>
  `;
};
